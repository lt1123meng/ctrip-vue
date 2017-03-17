var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// merge方法后者会覆盖前者
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
