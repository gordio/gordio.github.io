var inputBaseFont = document.getElementById('id_baseSize');
var inputAutoCopy = document.getElementById('id_autoCopy');
var btn = document.getElementById('id_convert');
var source = document.getElementById('id_source');
var destination = document.getElementById('id_destination');

var baseFontSize = inputBaseFont.value;
var decimalPlaces = 3;

// TODO: Refactoring
var findPX = new RegExp('(\\d+)px','g');
var decPlaces = new RegExp('(\.\\d{' + decimalPlaces + '}\\d).*', '');
var last = new RegExp('(\\d$)', '');

btn.addEventListener('click', function () {
	// Skip action with empty source
	if (source.value.length <= 0) return;

	var css = source.value;
	var result;
	while ((result = findPX.exec(css)) !== null) {
		css = css.replace(result[1] + 'px', calcEm(result[1], baseFontSize) + 'em');
	}
	destination.value = css;
	destination.select();
	document.execCommand('copy');
});

function calcEm(px, baseFontSize) {
	var pixels = parseInt(px);
	var em = pixels / baseFontSize;
	//find decimal places defined in decimalPlaces variable
	//if there is more decimal places, round it
	result = decPlaces.exec(em);
	if (result !== null)
		em = round(em, px);
	return em;
}

// TODO: Refactoring...
function round(base, num) {
	var leadingZero = '';
	// base 1.2345 num .2345
	num = num.toString();
	// remove . from num, num 2345
	num = num.substring(1, num.length);
	// if first char is zero 0234, remember it and substring 0, because Math will ignore it when round
	if (num.charAt(0) == 0) {
		leadingZero = '0';
		num = num.substring(1, num.length);
	}
	// make last point as decimal places, so Math can round it, num 234.5
	num = num.replace(last, '.$1');
	// round num 234.5 -> 235
	num = Math.round(num);
	// take only base value, base 1
	base = base.toString().split('.')[0];
	// concanate base and rounded decimal, 1 . 235
	return base + '.' + leadingZero + num;
}
