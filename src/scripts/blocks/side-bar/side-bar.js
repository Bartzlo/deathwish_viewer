import {Info} from './info/info'

class SideBar extends Block {
  _initBlock () {
    this.innerBlocks.info = new Info().createElement(this.data)

    this.template = `
      <aside class="side-bar ${this.options.className}">
        <section>
          <ul>
            {{#sideBarItems}}
            <li>.</li>
            {{/sideBarItems}}
          </ul>
        </section>
        <section>
          <div data-slot="info">
        </section>
      </aside>
    `
  }
}
