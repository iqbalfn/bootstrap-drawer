'use strict'

const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Bootstrap v4.3.1-admin-ui (https://getbootstrap.com/)
  * Copyright 2011-${year} The Bootstrap Authors Author And MIM Dev
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */`
}

module.exports = getBanner
