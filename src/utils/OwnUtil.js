export const statusChange = value => {
  let change = value === null ? 1 : value
  if (change === 1) {
    change = 0
  } else {
    change = 1
  }
  return change
}

export const getPosition = () => {
  const href = window.location.href
  const current = href.split('#')[1]
  if (current.includes('home')) {
    return 0
  } else if (current.includes('wish')) {
    return 1
  } else if (current.includes('me')) {
    return 2
  }
}

export const file2Base64 = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = (e) => {
      resolve(e.target?.result ? e.target.result : '')
    }
    fileReader.onerror = (e) => {
      reject(e)
    }
  })

export const base64ToFile = (urlData, fileName) => {
  const arr = urlData.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bytes = atob(arr[1]) // 解码base64
  let n = bytes.length
  const ia = new Uint8Array(n)
  while (n--) {
    ia[n] = bytes.charCodeAt(n)
  }
  return new File([ia], fileName, { type: mime })
}

export const getBase64Type = (data, op) => {
  let type = ''
  if (op == null) {
    op = ''
  }
  try {
    type = data.split(';')[0].split(':')[1].split('/')[1]
  } catch (e) {

  }
  console.log(type)
  return op + type
}
