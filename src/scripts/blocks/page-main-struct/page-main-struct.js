import {Header} from './../header/header'
import {Menu} from './../menu/menu'
import {Footer} from './../footer/footer'
import {ContentSlot} from './../content-slot/content-slot'

class PageMainStruct extends Block {
  _initBlock () {
    this.innerBlocks.header = new Header().createElement()
    this.innerBlocks.menu = new Menu().createElement()
    this.innerBlocks.footer = new Footer().createElement()
    this.innerBlocks.sideBarSlot = new ContentSlot().createElement(null, {id: 'side-bar'})
    this.innerBlocks.mainContentSlot = new ContentSlot().createElement(null, {id: 'main-content'})

    this.template = `
      <div>
        <div class="wrapper">
          <div data-slot="header"></div>
          <div data-slot="menu"></div>
          <div data-slot="sideBarSlot"></div>
          <div data-slot="mainContentSlot"></div>
        </div>
        <div data-slot="footer"></div>
      </div>
    `
  }
}
