import { privateList } from './privateData'

export const albumList = [
  {
    albumId: 1324,
    albumTitle: '随便看',
    cover: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F1.jpg',
    photoSum: 1,
    privateInfo: privateList[0],
    gmt_create: '2020-01-03'
  },
  {
    albumId: 3142,
    albumTitle: '测试哈哈哈',
    cover: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F2.jpg',
    photoSum: 1,
    privateInfo: privateList[1],
    gmt_create: '2020-01-03'
  },
  {
    albumId: 4231,
    albumTitle: '隐私相簿',
    cover: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F3.jpg',
    privateInfo: privateList[2],
    gmt_create: '2020-01-03'
  }
]
export const photoList = [
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F1.jpg'
  },
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F2.jpg'
  },
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F3.jpg'
  },
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F4.jpg'
  },
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F5.jpg'
  },
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F1.jpg'
  },
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F2.jpg'
  },
  {
    photoId: parseInt(Math.random() * 1000),
    url: 'https://meet-1302770283.cos.ap-chengdu.myqcloud.com/album%2F3.jpg'
  }
]
