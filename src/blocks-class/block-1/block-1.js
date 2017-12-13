class Block1 {
  constructor ({classModif = '', elemId = '', data = {}, inner = {}}) {
    this.data = data
    this.classModif = classModif
    this.elemId = elemId
    this.inner = inner

    this.template = `
      <div class="block-1 ${this.classModif}" id="${this.elemId}">
        <slot id="slot1">
        <h1>Block 1 header</h1>
        <slot id="slot2">
      </div>
    `
  }

  getElement ({classModif, elemId, data, inner}) {
    if (classModif) this.classModif = classModif
    if (elemId) this.elemId = elemId
    if (data) this.data = data
    if (inner) this.inner = inner

    let elementContainet = Handlebars.compile(this.template)(this.data)

    for (const key in inner) {
      if (inner.hasOwnProperty(key)) {
        const slotContent = inner[key]
        slotContent.forEach(block => {
          elementContainet.getElementById(key).appendChild(block)
        })
      }
    }
  }
}

let mainScreen = new MainScreenBlock()
let content = new ContentBlock()
let wrapper = new WrapperBlock
let header = new HeaderBlock()
let mainMenu = new MainMenuBlock()
let footer = new FooterBlock()

mainScreen.getElement({inner: {slot1: [
  wrapper.getElement({innerModules: [
    header.getElement(),
    mainMenu.getElement(),
    content.getElement({elemId: 'mainScreenContent'})
  ]}),
  footer.getElement()
]}})

document.getElementById('mainScreenContent').appendChild(mainMenu.getElement())