import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  if (pageProps.statusCode === 404)
    return <ErrorPage statusCode={pageProps.statusCode} />;
  const [queryClient] = useState(() => new QueryClient());
  const { locale } = useRouter();
  useEffect(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    const lang = locale === "ar" ? "ar" : "en";
    document.querySelector("html").setAttribute("dir", dir);
    document.querySelector("html").setAttribute("lang", lang);
  }, [locale]);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="normal-case"
          theme="dark"
        />
        <Component {...pageProps} />
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
