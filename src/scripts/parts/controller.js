// All pages can be called by dispatched one of the next events

let screenBuilder = require('./screenBuilder.js').builder

document.addEventListener('callPartsVeiwerScreen', e => {
  screenBuilder.buildPartsViewer([e.detail.bookName, e.detail.issueName])
})

document.addEventListener('callMainScreen', e => {
  screenBuilder.buildMainScreen()
})

document.addEventListener('callMainVeiwer', e => {
  screenBuilder.buildMainVeiwer([e.detail.bookName, e.detail.issueName, e.detail.number])
})

document.addEventListener('callBlogScreen', e => {
  screenBuilder.buildBlogPage()
})

document.addEventListener('callWikiScreen', e => {
  screenBuilder.buildWikiPage()
})

document.addEventListener('callError404', e => {
  screenBuilder.buildError404()
})

window.addEventListener('popstate', e => {
  screenBuilder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')
})
