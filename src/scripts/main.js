const screenBuilder = require('./parts/screenBuilder')
const controller = require('./parts/controller')

screenBuilder.builder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')
