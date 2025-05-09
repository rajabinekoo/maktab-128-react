export const baseUrl = "http://localhost:3000";

export const urls = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
  },
  task: {
    list: "/task",
    new: "/task",
    delete: (id) => `/task/${id}`,
    done: (id) => `/task/done/${id}`,
    inprogress: (id) => `/task/inprogress/${id}`,
  },
  user: {
    info: "/user",
  },
};
