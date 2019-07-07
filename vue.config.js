const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.entry('app')
      .clear()
      .add('./example/main.js')
      .end()

    if (!process.env.IS_LIB) {
      config.plugin('monaco-editor')
      .use(MonacoEditorWebpackPlugin, [{
        languages: ['javascript', 'css', 'html', 'typescript']
      }])
    }
  }
}