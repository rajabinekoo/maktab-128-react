import { showToast } from "./toast";

const systemMessages = {
  403: "Forbidden access. You should login again.",
};

export const errorHandler = (error) => {
  const serverMsg = error.response?.data?.message;
  const msg = systemMessages[error.status] || serverMsg;
  if (Array.isArray(msg)) {
    showToast(msg.join(", "));
  } else if (typeof msg === "string") {
    showToast(msg);
  }
  if (error.status === 403) {
    setTimeout(() => {
      location.href = "/login";
    }, 3000);
  }
  if (!!serverMsg) return serverMsg;
};
