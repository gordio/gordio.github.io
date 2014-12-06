// Add EMail to link
var em = document.getElementById('js-email');
em.href = "mailto:admin@g";
em.href += "ordio.pp.ua";

// helper
function serialize(form) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var q = [];
    for (var i = form.elements.length ; --i >= 0; ) {
        console.log(i);
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                case 'text':
                case 'email':
                case 'hidden':
                    q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                    break;
                }
                break;
            case 'TEXTAREA':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
        }
    }
    console.log(q.join("&"));
    return q.join("&");
}

// Ajax form
var form = document.querySelector(".js-contact-form");
var submit = document.querySelector('.js-contact-form input[type~=submit]');
var submit_text = submit.value;
var status_el = document.querySelector('.js-contact-status');

submit.addEventListener('click', function(ev) {
    ev.preventDefault();

    submit.disabled = true;
    submit.value = 'Sending...';
    status_el.classList.remove('error');

    var oReq = new XMLHttpRequest();

    if (oReq != null) {
        oReq.open(form.method, form.action, true);
        oReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oReq.onreadystatechange = function () {
            if (oReq.readyState == 4) {
                switch (oReq.status) {
                case 200:
                    status_el.innerHTML = oReq.responseText;
                    status_el.classList.add('success');
                    submit.disabled = false;
                    form.style.display = 'none';
                    break;
                case 400:
                    status_el.innerHTML = oReq.responseText;
                    status_el.classList.add('error');
                    submit.disabled = false;
                    submit.value = submit_text;
                    break;
                default:
                    window.alert(oReq.status);
                }
            }
        };
        oReq.send(serialize(form));
    }

}, true);