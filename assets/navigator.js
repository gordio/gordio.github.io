var Navigator = function(links_selector) {
    // user config
    var links_list = document.querySelectorAll(links_selector),
        links = {},
        pages = {};

    for (var i = links_list.length; --i >= 0;) {
        pages[links_list[i].hash] = document.querySelector(links_list[i].hash);
        links[links_list[i].hash] = links_list[i];
    }

    var cur_active = -1;

    function check_anchors(ev) {
        var y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        for (var page in pages) {
            if (y >= pages[page].offsetTop - window.innerHeight / 2) {
                // change .active
                if (cur_active !== page) {
                    if (cur_active != -1 && links[cur_active].classList.contains('active')) {
                        links[cur_active].classList.remove("active");
                    }
                    cur_active = page;
                    links[cur_active].classList.add("active");
                }
                break;
            }
        }
    }

    document.addEventListener('scroll', check_anchors);
    check_anchors(); // fix clean load
}


Navigator('.pages-navigation a');
