import Notification from "rc-notification";
import "rc-notification/assets/index.css";
// import "../../assets/index.less";

export const notification = (type, message) => {

  const color = type === "sc" ? "green" : "red";

  Notification.newInstance({}, (notification) => {
    notification.notice({
      content: <span>{message}</span>,
      duration: 3,
      style: {
        background: color,
        color: 'white',
        right: "42vw",
        top: "80vh",
      },
      onClose() {
        console.log("simple close");
      },
    });
  });
};
