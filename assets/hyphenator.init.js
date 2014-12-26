window.addEventListener('DOMContentLoaded', function() {
        Hyphenator.config({
            'defaultlanguage': 'en',
            'classname': 'page',
            'donthyphenateclassname': 'header',
            'intermediatestate': 'visible',
            'displaytogglebox': true,
            'minwordlength': 4,
            'useCSS3hyphenation': true
        });
        // Hyphenator.run();
        var blocks = document.getElementsByTagName('p');
        for (var i = blocks.length; --i >= 0; ) {
            blocks[i].style.textAlign = 'justify';
            Hyphenator.hyphenate(blocks[i], 'en');
        }
    }
);
