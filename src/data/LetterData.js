import { userList } from './UsersData'

export const chatList = [
  {
    chatId: 1,
    roomId: 1,
    userId: 1,
    parentId: 1,
    name: '',
    cover: '',
    type: 0,
    status: 0,
    isTop: 1,
    isHide: 0,
    content: '我们已经是好友了，快来找我聊天吧',
    contentTime: 1640352664,
    topTime: 0,
    isDelete: 0,
    user: userList[1]
  },
  {
    chatId: 2,
    isMute: true,
    isTop: true,
    topModified: 1641452663,
    upToDateMessage: {
      gmtCreate: 1640352663,
      content: '欢迎收听你的月亮我的心，好男人就是我，我就是，曾小贤[挑眉]'
    },
    user: userList[2]
  },
  {
    chatId: 3,
    isMute: false,
    isTop: false,
    topModified: 1641452662,
    upToDateMessage: {
      gmtCreate: 1640352662,
      content: '我知道，那些夏天，就像青春一样回不来'
    },
    user: userList[3]
  },
  {
    chatId: 4,
    isMute: false,
    isTop: false,
    topModified: 1641452661,
    upToDateMessage: {
      gmtCreate: 1640352661,
      content: '迷路的鸽子啊，我在双手合适的晚上，渴望一双翅膀'
    },
    user: userList[0]
  },
  {
    chatId: 5,
    isMute: false,
    isTop: false,
    topModified: 1641452660,
    upToDateMessage: {
      gmtCreate: 1640352660,
      content: '爱岗敬业诚信友善'
    },
    user: userList[1]
  }
]
