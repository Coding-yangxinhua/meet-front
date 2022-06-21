import router from '@/router'
import store from '@/store'
const LOGIN_PATH = '/login'
export const push = (path, checkLogin = true) => {
  const isLogin = store.getters.isLogin
  if (isLogin || !checkLogin) {
    router.push(path)
  } else {
    store.state.result = {
      code: 403
    }
  }
}

export const pushOrLogin = (path, checkLogin = true) => {
  const isLogin = store.getters.isLogin
  if (isLogin || !checkLogin) {
    router.push(path)
  } else {
    router.push(LOGIN_PATH)
  }
}
