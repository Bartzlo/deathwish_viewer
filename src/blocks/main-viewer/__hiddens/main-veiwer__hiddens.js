// Block of background images
//
// Data structure
// {
//   "parts": [
//     {
//       "url": "",
//       "partNumber": ""
//     }
//   ]
// }

module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <div class="main-veiwer__hiddens">
    {{#parts}}
      <img hidden src="{{url}}" data-number="{{partNumber}}">
    {{/parts}}
  </div>
  `
}
