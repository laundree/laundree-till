const defaultConfig = require('./default.json')
let localConfig
try {
  localConfig = require('./local.json')
} catch (err) {
  localConfig = {}
}

module.exports = Object.assign(defaultConfig, localConfig)
