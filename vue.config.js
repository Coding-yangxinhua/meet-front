const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
// 添加全局配置文件
module.exports = {
  // 关闭eslint语法检测功能
  // lintOnSave: false,
  // 开发服务器相关的配置
  // devServer: {
  // 配置静态资源目录
  // contentBase: path.join(__dirname, 'public'),
  // 设置开发服务器端口号
  // port: 8080
  // },
  configureWebpack: {
    // 解析
    resolve: {
      // 配置路径别名
      alias: {
        '@': resolve('src'),
        '@v': resolve('src/views'),
        '@c': resolve('src/components')
      }
    }
  }
}
