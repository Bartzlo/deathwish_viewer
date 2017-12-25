import Block from '../../parts/Block'

export default class Content extends Block {
  _initBlock () {
    this.template = `
      <section class="content">
        <article>
          <header>
            <h2>{{contentHeader}}</h2>
          </header>
          <section>
            {{contentText}}
          </section>
          <footer>
            {{contentDate}}
          </footer>
        </article>
      </section>
    `
  }
}
