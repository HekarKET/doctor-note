import { notification } from "antd";

export const openNotification = (type, message, description) => {
  if (type === "success") {
    notification.success({
      message: message,
      description: description,
      placement: "bottomLeft",
    });
  }
  if (type === "error") {
    notification.error({
      message: message,
      description: description,
      placement: "bottomLeft",
    });
  }
  if (type === "Network") {
    notification.error({
      message: "Network Issues",
      description: "Please check your internet connection.",
      placement: "bottomLeft",
    });
  }
  if (type === "auth-error") {
    notification.error({
      message: "Authorization Error",
      description: "",
      placement: "bottomLeft",
    });
  }
};
