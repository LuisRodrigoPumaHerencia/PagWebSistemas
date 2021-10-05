function fadeInPage() {
    if (!window.AnimationEvent) {
        return;
    }
    var fader = document.getElementById('page-overlay');
    fader.classList.add('page-overlay--fade-out');
}

document.addEventListener('DOMContentLoaded', function() {
    if (!window.AnimationEvent) {
        return;
    }
    //var anchors = document.getElementsByTagName('a');
    var anchors = $('.internal, .page-navigation a');

    for (var idx = 0; idx < anchors.length; idx += 1) {
        if (anchors[idx].hostname !== window.location.hostname) {
            continue;
        }
        anchors[idx].addEventListener('click', function(event) {
            var fader = document.getElementById('page-overlay'),
                anchor = event.currentTarget;

            var listener = function() {
                window.location = anchor.href;
                fader.removeEventListener('animationend', listener);
            };
            fader.addEventListener('animationend', listener);

            event.preventDefault();
            fader.classList.add('page-overlay--fade-in');
        });
    }
});
window.addEventListener('pageshow', function(event) {
    if (!event.persisted) {
        return;
    }
    var fader = document.getElementById('page-overlay');
    fader.classList.remove('page-overlay--fade-in');
});

// jQuery('.page-overlay').addClass('page-overlay--fade-animate');