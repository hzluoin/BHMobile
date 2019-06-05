module.exports = {
  transpileDependencies: [
    'vue-qr'
  ],
  devServer: {
    proxy: {
      '/api/sso/*': {
        target: 'http://192.168.1.223:8761',
        changeOrigin: true,
        pathRewrite: {
          '^/api/sso/': ''
        }
      },
      '/api/feisuo/*': {
        target: 'http://192.168.1.223:8089',
        changeOrigin: true,
        pathRewrite: {
          '^/api/feisuo/': ''
        }
      },
      '/api/*': {
        target: 'http://192.168.1.223:8766/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
