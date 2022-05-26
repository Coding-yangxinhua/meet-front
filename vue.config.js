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
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://162.14.101.164:9420', // 接口地址
        ws: true, // 是否启用websockets
        changOrigin: true, // 允许跨域  Origin源127.0.0.1:9000
        pathRewrite: {
          '^/api': '' // 请求的时候使用这个/api前缀就可以
        }
      }
    }
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
