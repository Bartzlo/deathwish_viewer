const screenBuilder = require('./parts/screenBuilder.js')
const controller = require('./parts/controller.js')

const DataController = require('./parts/dataController.js')
let bookDbController = new DataController('./data/books.json')

bookDbController.loadBase()
  .then(db => {
    screenBuilder.setDbController(bookDbController)
    screenBuilder.builder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')
  })
  .catch(rej => console.error(rej))
