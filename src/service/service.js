import axios from "axios"

const { baseURL } = window;

const user = {
  register: (email, password, avatar) => {
    return axios({
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
    return axios({
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
    return axios({
      baseURL,
      method: 'POST',
      url: '/user/check'
    })
  }
}

const note = {
  create: (title, content) => {
    return axios({
      baseURL,
      method: 'POST',
      url: '/note/create',
      data: {
        title,
        content
      }
    })
  },
  delete: (noteId) => {
    return axios({
      baseURL,
      method: 'DELETE',
      url: '/note/delete',
      params: {
        noteId
      }
    })
  },
  update: (noteId, title, content, date, isStared) => {
    return axios({
      baseURL,
      method: 'POST',
      url: '/note/update',
      data: {
        noteId,
        title,
        content,
        date,
        isStared
      }
    })
  },
  list: () => {
    return axios({
      baseURL,
      method: 'GET',
      url: '/note/list'
    })
  },
  get: (noteId) => {
    return axios({
      baseURL,
      method: 'GET',
      url: '/note/get',
      params: {
        noteId
      }
    })
  },
  toggleStar: (noteId) => {
    return axios({
      baseURL,
      method: 'GET',
      url: '/note/toggleStar',
      params: {
        noteId
      }
    })
  }
}

const todo = {
  create: (title, detail, begin, end, isFinished = false) => {
    return axios({
      baseURL,
      method: 'POST',
      url: '/todo/create',
      data: {
        title,
        detail,
        begin,
        end,
        isFinished
      }
    })
  },
  delete: (todoId) => {
    return axios({
      baseURL,
      method: 'DELETE',
      url: '/todo/delete',
      params: {
        todoId
      }
    })
  },
  update: (todoId, title, detail, begin, end, isFinished) => {
    return axios({
      baseURL,
      method: 'POST',
      url: '/todo/update',
      data: {
        todoId,
        title,
        detail,
        begin,
        end,
        isFinished
      }
    })
  },
  list: () => {
    return axios({
      baseURL,
      method: 'GET',
      url: '/todo/list'
    })
  },
  get: (todoId) => {
    return axios({
      baseURL,
      method: 'GET',
      url: '/todo/get',
      params: {
        todoId
      }
    })
  },
  getToday: (year, month, day) => {
    return axios({
      baseURL,
      method: 'GET',
      url: '/todo/getToday',
      params: {
        year,
        month,
        day
      }
    })
  },
  toggleFinish: (todoId) => {
    return axios({
      baseURL,
      method: 'GET',
      url: '/todo/toggleFinish',
      params: {
        todoId
      }
    })
  }
}

const service = { user, note, todo };

export default service;