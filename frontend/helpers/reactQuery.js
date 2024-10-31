import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

import objectUtils from "./objectUtils";

const mutation = (
  createApi,
  queryKey,
  onSuccess,
  onError,
  shouldToast = true,
) => {
  const queryClient = useQueryClient();
  return useMutation((body) => createApi(body), {
    onError: (err) => {
      toast.error(err.response.data.message);
      if (onError) onError(err);
    },
    onSuccess: (res, body) => {
      queryClient.invalidateQueries(queryKey);
      if (shouldToast) toast.success("Successful");
      if (onSuccess) onSuccess(res, body);
    },
  });
};

const query = (queryKey, options, getApi, initialData, enabled = true) =>
  useQuery([queryKey, objectUtils.cleanEmpty(options)], () => getApi(options), {
    enabled,
    ...(initialData && { initialData }),
  });

const prefetchQuery = async (queryClient, queryKey, options, getApi) =>
  queryClient.prefetchQuery([queryKey, objectUtils.cleanEmpty(options)], () =>
    getApi(options),
  );

const prefetchOneQuery = async (queryClient, queryKey, id, getApi, subId) => {
  const result = { notFound: false, data: {} };
  await queryClient.prefetchQuery(
    [queryKey, { id, ...(subId && { subId }) }],
    () =>
      getApi(id, subId)
        .then((data) => {
          result.data = data;
          return data;
        })
        .catch((e) => {
          result.notFound = e.response.data.code === 404;
          return {};
        }),
  );
  return result;
};

const fetchQuery = async (queryClient, queryKey, options, getApi) =>
  queryClient.fetchQuery([queryKey, objectUtils.cleanEmpty(options)], () =>
    getApi(options),
  );

const infiniteQuery = (
  queryKey,
  options,
  getApi,
  initialData,
  enabled = true,
) =>
  useInfiniteQuery(
    [queryKey, objectUtils.cleanEmpty(options)],
    async ({ pageParam = 1 }) => {
      const res = await getApi({ page: pageParam, ...options });
      res.page = pageParam;
      return res;
    },
    {
      enabled,
      ...(initialData && { initialData }),
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.pages) return lastPage.page + 1;
        return undefined;
      },
    },
  );

const prefetchInfiniteQuery = async (queryClient, queryKey, options, getApi) =>
  queryClient.prefetchInfiniteQuery(
    [queryKey, objectUtils.cleanEmpty(options)],
    async ({ pageParam = 1 }) => {
      const res = await getApi({
        page: pageParam,
        ...objectUtils.cleanEmpty(options),
      });
      res.page = pageParam;
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.pages) return lastPage.page + 1;
        return undefined;
      },
    },
  );

export default {
  mutation,
  query,
  prefetchQuery,
  prefetchOneQuery,
  fetchQuery,
  infiniteQuery,
  prefetchInfiniteQuery,
};
