const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 添加全局配置文件
module.exports = {
  // 关闭eslint语法检测功能
  // lintOnSave: false,
  // 开发服务器相关的配置
  devServer: {
    port: 8081
  },
  configureWebpack: {
    // 解析
    resolve: {
      // 配置路径别名
      alias: {
        '@': resolve('src'),
        '@v': resolve('src/views'),
        '@c': resolve('src/components'),
        '@u': resolve('src/utils')
      }
    }
  }
}
