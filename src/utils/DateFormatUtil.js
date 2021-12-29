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
  timestamp = timestamp.toString().substr(0, 10)
  // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const date = new Date(timestamp * 1000)
  return {
    year: date.getFullYear(),
    month: (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    day: date.getDay() + 1 < 10 ? '0' + (date.getDay() + 1) : date.getDay() + 1,
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
