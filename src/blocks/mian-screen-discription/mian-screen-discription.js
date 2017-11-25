module.exports.get = function (className = '', id = '', innerContent = '') {
  return `
  <section class="mian-screen-discription ${className}">
    <img class="mian-screen-discription__firts-img" src="./img/monitor.png" alt="img">
    <div class="mian-screen-discription__text">{{text}}</div>
    <img class="mian-screen-discription__second-img" src="./img/man.png" alt="img">
  </section>
  `
}
