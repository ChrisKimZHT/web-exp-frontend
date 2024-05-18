import axios from "axios";
import service from "../service/service";

export const checkToken = () => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem("token") !== null) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      service.user.check().then(() => {
        resolve();
      }).catch(() => {
        reject();
      })
    } else {
      reject();
    }
  });
}