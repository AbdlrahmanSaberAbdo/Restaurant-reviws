import http from "../httpCommon";

const getAll = (data = null) => {
  console.log(data)
  const limit   = data.limit !== undefined ? data.limit : 15;
  const offset  = data.offset !== undefined ? data.offset: 0;
  const order   = data.order !== undefined && data.order === "desc" ? "-id" : "id";
  const search  = data.search !== undefined ? data.search: "";
  return http.get(`/restaurants/?limit=${limit}&offset=${offset}&ordering=${order}&search=${search}`);
};

const get = id => {
  return http.get(`/restaurants/${id}/`);
};

const create = data => {
  return http.post("/restaurants/", data);
};

const update = (id, data) => {
  return http.put(`/restaurants/${id}`, data);
};

const remove = id => {
  return http.delete(`/restaurants/${id}`);
};

const removeAll = () => {
  return http.delete(`/restaurants`);
};

const findByTitle = title => {
  return http.get(`/restaurants?title=${title}`);
};

const getCount = () => {
  return http.get("/restaurants_count");
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
  getCount
};
