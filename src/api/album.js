import request from '@/utils/request'

export const getAlbumsByUid = userId => {
  return request({
    url: 'album/list',
    params: {
      userId
    }
  })
}

export const getPhotoListByAlbumId = params => {
  return request({
    url: 'albumPhoto/list',
    params
  })
}

export const uploadPhotoListByAlbumId = (albumId, files) => {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i].file)
  }
  formData.append('albumId', albumId)
  return request({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: 'albumPhoto/uploadBatch',
    data: formData
  })
}

export const createAlbum = (album) => {
  return request({
    method: 'POST',
    url: 'album/create',
    data: album
  })
}
