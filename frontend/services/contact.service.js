import axios from "../helpers/axios";

const route = "contacts";
const create = async (createBody) => axios.post(`v1/${route}`, createBody);
export default {
  create,
};
