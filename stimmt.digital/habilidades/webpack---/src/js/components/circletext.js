import CircleType from 'circletype';

if (jQuery('#circle-text').length > 0) {
    //new CircleType(document.getElementById('circle-text'));
    const circleType = new CircleType(document.getElementById('circle-text'));
    circleType.forceWidth(true);
}