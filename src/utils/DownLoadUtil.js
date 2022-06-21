
export const downloadImage = (url) => {
  if (url instanceof Array) {
    downloadMulti(url)
  } else {
    downloadSingle(url)
  }
}

export const downloadSingle = (url) => {
  const splits = url.split('/')
  const filename = splits[splits.length - 1]
  const href = url.replace('https://meet-1302770283.cos.ap-chengdu.myqcloud.com', process.env.VUE_APP_COS_URL)
  const a = document.createElement('a') // 生成一个a元素
  a.href = href
  a.download = filename
  a.click()
  a.remove()
}

export const downloadMulti = (urls) => {
  const a = document.createElement('a') // 生成一个a元素
  for (const url of urls) {
    // 替换地址
    const splits = url.split('/')
    const filename = splits[splits.length - 1]
    const href = url.replace('https://meet-1302770283.cos.ap-chengdu.myqcloud.com', process.env.VUE_APP_COS_URL)
    a.href = href
    a.download = filename
    a.click()
  }
  a.remove()
}
