import Block from '../../parts/Block'

export default class Footer extends Block {
  _initBlock () {
    this.template = `
      <footer class="footer"><p>Footer text</p></footer>
    `
  }
}
