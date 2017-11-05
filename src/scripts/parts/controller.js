let screenBuilder = require('./screenBuilder.js')

document.addEventListener('callPartsVeiwerScreen', e => {
  screenBuilder.buildPartsViewer(e.detail.bookName, e.detail.issueName)
})

document.addEventListener('callMainScreen', e => {
  screenBuilder.buildMainScreen()
})

document.addEventListener('callMainVeiwer', e => {
  screenBuilder.buildMainVeiwer(e.detail.bookName, e.detail.issueName, e.detail.number)
})
