// 转换为文章中的时间格式
export const articleDateStyle = articleTime => {
  const nowTime = new Date().getTime()
  let dateText = null
  const articleDate = timeToDateObj(articleTime)
  const nowDate = timeToDateObj(nowTime)
  const subDate = newDateSubOld(articleDate, nowDate)
  if (subDate.year > 0) {
    dateText = `${articleDate.year}-${articleDate.month}-${articleDate.day}`
  } else if (subDate.month > 0 || subDate.day > 0) {
    dateText = `${articleDate.month}-${articleDate.day}`
  } else if (subDate.hour > 0) {
    dateText = `${subDate.hour}小时前`
  } else if (subDate.minute > 0) {
    dateText = `${subDate.minute}分钟前`
  } else {
    dateText = '刚刚'
  }
  return dateText
}
export const normalDate = timestamp => {
  if (timestamp === undefined || timestamp === null) {
    return
  }
  const dateObj = timeToDateObj(timestamp)
  return `${dateObj.year}-${dateObj.month}-${dateObj.day}`
}
// 时间戳转换为 年月日 时:分:秒
export const timeToDate = timestamp => {
  const dateObj = this.timeToDateObj(timestamp)
  return `${dateObj.year}年${dateObj.month}月${dateObj.day}日 ${dateObj.hour}:${dateObj.minute}:${dateObj.second}`
}
// 时间戳转换为 年月日
export const timeToYear = timestamp => {
  const dateObj = this.timeToDateObj(timestamp)
  return `${dateObj.year}年${dateObj.month}月${dateObj.day}日`
}

// 时间戳转换为date对象
export const timeToDateObj = timestamp => {
  // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const date = new Date(parseInt(timestamp))
  return {
    year: date.getFullYear(),
    month: (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    day: date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1,
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
}

// 新日期 - 老日期
export const newDateSubOld = (oldDate, newDate) => {
  return {
    year: newDate.year - oldDate.year,
    month: newDate.month - oldDate.month,
    day: newDate.day - oldDate.day,
    hour: newDate.hour - oldDate.hour,
    minute: newDate.minute - oldDate.minute,
    second: newDate.second - oldDate.second
  }
}

// 手机格式转换
export const toMobile = (mobile) => {
  return `${mobile.slice(0, 3)} ${mobile.slice(3, 7)} ${mobile.slice(7, 11)}`
}
