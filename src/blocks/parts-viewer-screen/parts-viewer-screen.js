let logo = require('../logo/logo.js')
let mainFooter = require('../main-footer/main-footer.js')
let partsViewer = require('../parts-viewer/parts-viewer.js')

module.exports =
`
<div class="content parts-viewer-screen">
  <div class="wrapper">
    ${logo}
    ${partsViewer}
  </div>
  ${mainFooter}
</div>
`
