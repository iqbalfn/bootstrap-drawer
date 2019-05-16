'use strict'

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Bootstrap Drawer v4.0.0 (https://iqbalfn.github.io/bootstrap-drawer/)
  * Copyright 2019 Iqbal Fauzi
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */`
}

module.exports = getBanner
