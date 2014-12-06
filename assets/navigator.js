var Navigator = function (links_selector) {
  // user config
  var links = document.querySelectorAll(links_selector);
  var anchors = [], anchors_el = [];

  for (var i = links.length; --i >= 0; ) {
    anchors += links[i].hash;
    anchors_el[i] = document.querySelector(links[i].hash);
  }

  var cur_active = -1;
  function check_anchors(ev) {
    var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop; // IE 8+
    for (var i = anchors_el.length; --i >= 0; ) {
      if (y >= anchors_el[i].offsetTop - window.innerHeight/2) {
        // change .active
        if (cur_active != i) {
          if (cur_active != -1 && links[cur_active].classList.contains('active')) {
            links[cur_active].classList.remove("active");
          }
          cur_active = i;
          links[cur_active].classList.add("active");
        }
        break;
      }
    }
  }

  document.addEventListener('scroll', check_anchors);
  check_anchors(); // fix clean load
}