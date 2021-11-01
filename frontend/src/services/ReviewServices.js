import http from "../httpCommon";

const getAll = () => {
  return http.get("/reviews/");
};

const get = id => {
  return http.get(`/reviews/${id}`);
};

const create = data => {
  return http.post("/reviews/", data);
};

const update = (id, data) => {
  return http.put(`/reviews/${id}`, data);
};

const remove = id => {
  return http.delete(`/reviews/${id}`);
};

const removeAll = () => {
  return http.delete("/reviews");
};

const findByTitle = title => {
  return http.get(`/reviews?title=${title}`);
};
const getCount = () => {
  return http.get("/reviews_count");
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
