import * as monaco from 'monaco-editor';
import resize from './resize'

export default {
  name: 'MonacoEditor',

  mixins: [resize],

  props: {
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    value: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'vs-dark'
    },
    language: {
      type: String,
      default: 'javascript'
    },
    options: {
      type: Object,
      default: () => ({})
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      editor: null
    }
  },

  computed: {
    style() {
      const { width, height } = this
      const fixLength = val =>
        typeof val === 'number' ? `${val}px` : val
      return {
        width: fixLength(width),
        height: fixLength(height)
      }
    }
  },

  watch: {
    value(newVal) {
      const { editor } = this
      if (editor && newVal !== editor.getValue()) {
        editor.setValue(newVal)
      }
    },

    theme(newVal) {
      const { editor } = this
      if (editor) {
        monaco.editor.setTheme(newVal)
      }
    },

    language(newVal) {
      const { editor } = this
      if (editor) {
        monaco.editor.setModelLanguage(editor.getModel(), newVal)
      }
    },

    options: {
      deep: true,
      handler(newVal) {
        const { editor } = this
        if (editor) {
          editor.updateOptions(newVal)
        }
      }
    }
  },

  mounted () {
    this.init()
    this.$on('resize', this.handleResize)
  },

  beforeDestroy() {
    this.editor && this.editor.dispose()
  },

  methods: {
    init () {
      const options = this.getOptions()
      this.editor = monaco.editor.create(this.$el, options)

      this.editor.onDidChangeModelContent(event => {
        const value = this.editor.getValue()
        if (this.value !== value) {
          this.$emit('input', value, event)
        }
      })

      this.autoFocus && this.focus()
    },

    getOptions () {
      const { options, value, theme, language } = this
      return {
        ...options,
        value,
        theme,
        language
      }
    },

    handleResize() {
      const { editor } = this
      if (editor) {
        editor.layout()
      }
    },

    getEditor() {
      return this.editor
    },

    focus() {
      this.editor && this.editor.focus()
    }
  },

  render (h) {
    return h('div', {
      style: {
        ...this.style
      }
    })
  }
}