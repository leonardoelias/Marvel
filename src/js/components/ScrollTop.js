export function ScrollTop(selector) {
  var speed = 10;
  window.scrollTo(0, 0);
  Array.prototype.slice
    .call(document.querySelectorAll(selector))
    .forEach(item => {
      var _interval = setInterval(() => {
        if (item.scrollTop <= 0) {
          clearInterval(_interval);
        } else {
          item.scrollTop -= speed;
          speed += 1;
        }
      }, 10);
    });
}
