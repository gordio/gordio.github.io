
var el = document.querySelector('#works');
var intro_el = document.querySelector('#intro');
var contact_wrap_el = document.querySelector('#contact .wrap');
var contact_el = document.querySelector('#contact');
function page_switch_onscroll(ev) {
  var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop; // IE 8+
    if (y >= el.offsetTop) {
        contact_wrap_el.style.position = 'fixed';
        contact_el.style.minHeight = contact_wrap_el.offsetHeight + "px";
    } else {
        contact_wrap_el.style.position = 'static';
    }
}


document.addEventListener('scroll', page_switch_onscroll);