// 配置参考 https://segmentfault.com/a/1190000012515648
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'waterfall.js',
  output: {
    file: 'waterfall.min.js',
    format: 'iife'
  },
  plugins: [
    uglify()
  ]
}