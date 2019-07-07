import ResizeObserver from 'resize-observer-polyfill'

export default {
  data() {
    return {
      _waiting: false,
      _observer: null
    }
  },

  mounted () {
    this._observer = new ResizeObserver(this._resize)
    this._observer.observe(this.$el)
  },

  beforeDestroy () {
    if(this.observer) {
      this._observer.unobserve(this.$el)
      this._observer.disconnect()
      this._observer = null
    }
  },

  methods: {
    _resize (entries) {
      const [{ contentRect: { width, height } }] = entries
      this.$emit('resize', {
        width,
        height
      })
    }
  }
}