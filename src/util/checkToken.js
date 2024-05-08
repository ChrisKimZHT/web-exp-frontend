import axios from "axios";
import service from "../service/service";

export const checkToken = () => {
  if (localStorage.getItem("token") !== null) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    service.user.check().then(() => {
      return true;
    }).catch((err) => {
      if (err?.response?.status === 401) {
        localStorage.clear();
        return false;
      }
    })
  } else {
    return false;
  }
}