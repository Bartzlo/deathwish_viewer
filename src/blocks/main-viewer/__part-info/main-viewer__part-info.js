module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <header class="main-viewer__part-info">
    <div class="main-viewer__backBtn">&#129092;</div>
    <div class="main-viewer__homeBtn">&#8962;</div>
    <h1>{{bookName}}</h1>
    <span>
      {{issueName}} part
      <span class="main-viewer__part-number">{{partNumber}}</span>
    </span>
  </header>
  `
}
