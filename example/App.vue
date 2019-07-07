<template>
  <div id="app">
    <div class="control-bar">
      <span>
        <label class="control-label" for="theme">Theme</label>
        <select name="theme" v-model="theme">
          <option v-for="item in themeList" :value="item" :key="item">{{ item }}</option>
        </select>
      </span>

      <span>
        <label class="control-label" for="language">Language</label>
        <select name="language" v-model="language">
          <option v-for="item in languageList" :value="item" :key="item">{{ item }}</option>
        </select>
      </span>
    </div>

    <monaco-editor
      v-model="code"
      :theme="theme"
      :height="600"
      auto-focus
    />

  </div>
</template>

<script>
import MonacoEditor from '../src'

export default {
  name: 'app',
  components: {
    MonacoEditor
  },
  data() {
    return {
      code: 'function fn () {\n\tconsole.log(\'Hello World\')\n}',
      theme: 'vs',
      language: 'javascript',
      themeList: [
        'vs',
        'vs-dark',
        'hc-black'
      ],
      languageList: [
        'javascript',
        'typescript'
      ]
    }
  }
}
</script>

<style scoped>
.control-bar {
  margin-bottom: 10px;
}

.control-label {
  display: inline-block;
  margin: 0 10px 0 20px;
}

.control-bar  select {
  width: 180px
}
</style>
