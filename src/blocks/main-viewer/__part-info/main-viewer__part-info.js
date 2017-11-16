module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <header class="main-viewer__part-info">
    <span class="main-viewer__backBtn"><- Back</span>
    <span class="main-viewer__homeBtn">Home</span>
    <h1>{{bookName}}</h1>
    <span>
      {{issueName}} part
      <span class="main-viewer__part-number">{{partNumber}}</span>
    </span>
  </header>
  `
}
