import { Axios } from "axios"

const { baseURL } = window;

const user = {
  register: (email, password, avatar) => {
    return Axios({
      baseURL,
      method: 'POST',
      url: '/user/register',
      data: {
        email,
        password,
        avatar
      }
    })
  },
  login: (email, password) => {
    return Axios({
      baseURL,
      method: 'POST',
      url: '/user/login',
      data: {
        email,
        password
      }
    })
  },
  check: () => {
    return Axios({
      baseURL,
      method: 'POST',
      url: '/user/check'
    })
  }
}

const service = { user };

export default service;