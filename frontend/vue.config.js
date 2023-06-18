const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
      proxy: {
          '^/api': {
              target: 'http://localhost:8081',
              changeOrigin: true
          },
      }
  },
  pages: {
    'index': {
      entry: './src/pages/Index/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'index' ]
    },
    'user': {
      entry: './src/pages/User/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: [ 'chunk-vendors', 'chunk-common', 'user' ]
    },
    'admin': {
      entry: './src/pages/Admin/main.js',
      template: 'public/admin.html',
      title: 'Admin',
      chunks: [ 'chunk-vendors', 'chunk-common', 'admin' ]
    },
    'display': {
      entry: './src/pages/Display/main.js',
      template: 'public/display.html',
      title: 'Display',
      chunks: [ 'chunk-vendors', 'chunk-common', 'display' ]
    }
  }
}