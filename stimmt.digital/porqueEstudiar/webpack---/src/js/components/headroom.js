import Headroom from 'headroom.js';

// select your header or whatever element you wish
const header = document.querySelector('.header');

const headroom = new Headroom(header, {
    "offset": 40,
    "classes": {
        "initial": "header--animated",
        "pinned": "header--slidedown",
        "unpinned": "header--slideup"
    }
});
headroom.init();