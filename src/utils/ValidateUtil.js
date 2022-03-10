export const isMobile = (mobile) => {
  const reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
  return reg.test(mobile)
}

export const isPassword = (password) => {
  return password.length > 6
}
