const MonacoEditorWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.entry('app')
      .clear()
      .add('./example/main.js')
      .end()

    config.plugin('monaco-editor')
      .use(MonacoEditorWebpackPlugin, [{
        languages: ['javascript', 'css', 'html', 'typescript']
      }])
  }
}