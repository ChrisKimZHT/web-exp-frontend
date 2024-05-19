import axios from "axios";
import service from "../service/service";

export const checkToken = () => {
  return new Promise((resolve, _) => {
    if (localStorage.getItem("token") !== null) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
      service.user.check().then(() => {
        resolve(true);
      }).catch(() => {
        resolve(false);
      })
    } else {
      resolve(false);
    }
  });
}