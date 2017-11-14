module.exports.get = function (structName, screenName) {
  return `
      <div id="screen-container" data-struct="${structName || ''}" data-screen="${screenName || ''}">
        <div class="screen-container__wrapper"></div>
      </div>
    `
}
