import Block from '../../parts/Block'

export default class ContentSlot extends Block {
  _initBlock () {
    this.template = `
      <div calss="slot" id="${this.options.id}">
      </div>
    `
  }
}
