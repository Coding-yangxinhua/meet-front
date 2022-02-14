// 将图片转换为Base64编码
export const url2Base64 = (url) => {
  const image = new Image()
  image.crossOrigin = 'Anonymous'
  image.src = 'url'
  image.onload = function () {
    return getBase64Image(image)
  }
}
function getBase64Image (img) {
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(img, 0, 0, img.width, img.height)
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
  return canvas.toDataURL('image/' + ext)
}
