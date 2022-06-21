/**
 * 本地存储方法封装
 */

export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}

export const getItemOrDefault = (name, value) => {
  const data = window.localStorage.getItem(name)
  try {
    const jsonData = JSON.parse(data)
    if (jsonData == null) {
      return value
    }
    return jsonData
  } catch (err) {
    return data
  }
}
