<template>
  <div id="app">
    <monaco-editor
      v-model="code"
      :height="600"
      :width="800"
    />
  </div>
</template>

<script>
import MonacoEditor from './components/MonacoEditor'

export default {
  name: 'app',
  components: {
    MonacoEditor
  },
  data() {
    return {
      code: 'function fn () {\n\tconsole.log(\'Hello World\')\n}'
    }
  }
}
</script>
