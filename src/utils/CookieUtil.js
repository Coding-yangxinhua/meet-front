import VueCookies from 'vue-cookies'

export const getCookie = (name) => {
  return VueCookies.get(name)
}

export const setCookie = (name, value, expireTime) => {
  VueCookies.set(name, value, expireTime)
}

export const removeCookie = (name) => {
  VueCookies.remove(name)
}
