import http from "../httpCommon";

const getAll = (data = null) => {
  // eslint-disable-next-line no-undef
  const limit   = data.limit !== undefined ? data.limit : 15;
  const offset  = data.offset !== undefined ? data.offset: 0;
  const order   = data.order !== undefined ? (data.order === "desc" ? "id" : "-id")  : "-id";

  return http.get(`/cities/?limit=${limit}&offset=${offset}&ordering=${order}`);
};

const get = id => {
  return http.get(`/cities/${id}`);
};

const create = data => {
  return http.post("/cities/", data);
};

const update = (id, data) => {
  return http.put(`/cities/${id}`, data);
};

const remove = id => {
  return http.delete(`/cities/${id}`);
};

const removeAll = () => {
  return http.delete("/cities");
};

const findByTitle = title => {
  return http.get(`/cities?title=${title}`);
};
const getCount = () => {
  return http.get("/cities_count");
};

const paginate = (url) => {
  return http.get(url);
};
export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  getCount,
  paginate
};
