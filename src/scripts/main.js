// const screenBuilder = require('./parts/screenBuilder')
// const controller = require('./parts/controller')

// // Get data base for emulated server side
// screenBuilder.builder.getScreen(window.location.hash ? window.location.hash.substring(1) : 'buildMainScreen')

class Block1 {
  constructor ({classModif = '', elemId = '', data = {}, inner = {}} = {}) {
    this.data = data
    this.classModif = classModif
    this.elemId = elemId
    this.inner = inner

    this.template = `
      <div class="block-1 ${this.classModif}" id="${this.elemId}">
        <slot class="slot1"></slot>
        <h1>Block 1 header</h1>
        <slot class="slot2"></slot>
      </div>
    `
  }

  getElement ({classModif, elemId, data, inner} = {}) {
    if (classModif) this.classModif = classModif
    if (elemId) this.elemId = elemId
    if (data) this.data = data
    if (inner) this.inner = inner

    let elementContainet = document.createElement('div')
    elementContainet.innerHTML = Handlebars.compile(this.template)(this.data)

    console.log(inner);
    for (const key in inner) {
      if (inner.hasOwnProperty(key)) {
        const slotContent = inner[key]
        slotContent.forEach(block => {
          console.log(block);
          elementContainet.getElementsByClassName(key)[0].appendChild(block)
        })
      }
    }

    return elementContainet.firstElementChild
  }
}

class Block2 {
  constructor ({classModif = '', elemId = '', data = {}, inner = {}} = {}) {
    this.data = data
    this.classModif = classModif
    this.elemId = elemId
    this.inner = inner

    this.template = `
      <div class="block-2 ${this.classModif}" id="${this.elemId}">
        <h2>Block 2 header</h2>
        {{text}}
      </div>
    `
  }

  getElement ({classModif, elemId, data, inner} = {}) {
    if (classModif) this.classModif = classModif
    if (elemId) this.elemId = elemId
    if (data) this.data = data
    if (inner) this.inner = inner

    let elementContainet = document.createElement('div')
    elementContainet.innerHTML = Handlebars.compile(this.template)(this.data)

    for (const key in inner) {
      if (inner.hasOwnProperty(key)) {
        const slotContent = inner[key]
        slotContent.forEach(block => {
          elementContainet.getElementsByClassName(key)[0].appendChild(block)
        })
      }
    }

    return elementContainet.firstElementChild
  }
}

let block1 = new Block1()
let block0 = new Block1()
let block2 = new Block2()


let element = block1.getElement({inner: {
  slot1: [
    block2.getElement({data: {text: 'First before block 2'}}),
    block2.getElement({data: {text: 'Second before block 2'}})
  ],
  slot2: [
    block2.getElement({data: {text: 'First after block 2'}}),
    block2.getElement({data: {text: 'Second after block 2'}})
  ]
}})

document.getElementById('screen-container').appendChild(element)

// mainScreen.getElement({inner: {slot1: [
//   wrapper.getElement({innerModules: [
//     header.getElement(),
//     mainMenu.getElement(),
//     content.getElement({elemId: 'mainScreenContent'})
//   ]}),
//   footer.getElement()
// ]}})
