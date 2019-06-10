import * as monaco from 'monaco-editor'

export default {
  name: 'MonacoEditor',
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
      default: ''
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
    }
  },
  model: {
    event: 'change'
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
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const options = this.getOptions()
      this.editor = monaco.editor.create(this.$el, options)
      this.editor.onDidChangeModelContent(event => {
        const value = this.editor.getValue()
        if (this.value !== value) {
          this.$emit('change', value, event)
        }
      })
    },
    getOptions () {
      const { options, value, theme, language } = this
      return {
        ...options,
        value,
        theme,
        language
      }
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