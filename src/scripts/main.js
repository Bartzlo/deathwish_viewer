const polifills = require('./parts/polyfills')
const screenBuilder = require('./parts/screenBuilder')
const controller = require('./parts/controller')

const DataController = require('./parts/dataController')
let bookDbController = new DataController('./data/books.json')

bookDbController.loadBase()
  .then(db => {
    screenBuilder.setDbController(bookDbController)
    screenBuilder.builder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')
  })
  .catch(rej => console.error(rej))
