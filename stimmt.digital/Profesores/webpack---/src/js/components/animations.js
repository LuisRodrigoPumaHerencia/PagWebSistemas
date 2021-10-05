import {
    gsap
} from "gsap";
import SplitText from "../gsap/SplitText.min";
import {
    ScrollTrigger
} from "gsap/ScrollTrigger";
//import DrawSVGPlugin from "../gsap/DrawSVGPlugin";

//gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(ScrollTrigger);




// var paragraphsIntro = gsap.utils.toArray('.page-intro p');
// paragraphsIntro.forEach((elem, i) => {
//
//     var paragraph               = elem;
//
//     var paragraph = new SplitText(paragraph, {type: 'lines'})
//     var title = paragraph.lines;
//
//     gsap.from(title, 1,{
//         scrollTrigger: {
//             trigger: pageIntroTitle,
//             start: 'top 75%',
//             //markers: true,
//         },
//         //onComplete: revertTitle,
//         stagger: .1,
//         delay: .4,
//         y: 32,
//         opacity: 0,
//         //skewX: '-15deg',
//     });
//
// });



// Page Intro Title
// var pageIntroTitle      = jQuery('.section--top h1');
// var SectionTitle        = new SplitText(pageIntroTitle, { type:'words, lines, chars' })
// var title               = SectionTitle.chars;
//
// gsap.from(title, .8,{
//     //scrollTrigger: title,
//     stagger: .02,
//     y:'101%',
//     //skewX: '-15deg',
//     ease: 'power1.inOut',
// });

// Paragraphs
// jQuery('.split-animate').each(function(){
//
//     var splitAnimate = this;
//     var pageIntroText = jQuery(this).find('p');
//     var SectionText  = new SplitText(pageIntroText, { type:'words, lines' })
//     var text         = SectionText.words;
//
//     gsap.from(text, .8,{
//         stagger: .007,
//         delay: .2,
//         scrollTrigger: text,
//         y:'100%'
//     });
//
// });

// Heading Lines
// jQuery('.fade-in-p p').each(function(){
//     var paragraph = this;
//     gsap.from(paragraph, 1.6,{
//         scrollTrigger: {
//             trigger: paragraph,
//             start: 'top 85%',
//             //markers: true,
//         },
//         opacity: 0,
//         delay: .4
//     });
// });


// gsap.to('.page-overlay__blinds span', .4,{
//     maxHeight: 0,
//     stagger: .1,
//     //ease: 'back.out(3.5)',
// });

////////////////
// Team Item //
///////////////
var teamItems = gsap.utils.toArray('.team-item');
teamItems.forEach((elem, i) => {

    var imageAnimate = elem;
    var imageBoxImage = elem.querySelector('img');
    var imageBoxImageWrapper = elem.querySelector('.team-item__image-inner');
    var emplyeeTile = elem.querySelector('.team-item__details h4');
    var emplyeeFunction = elem.querySelector('.team-item__details h5');

    var emplyeeName = new SplitText(emplyeeTile, {
        type: ' chars'
    })
    var title = emplyeeName.chars;

    gsap.from(title, .8, {
        scrollTrigger: {
            trigger: emplyeeTile,
            start: 'top 85%',
            //\markers: true,
        },
        //onComplete: revertTitle,
        stagger: .05,
        y: 24,
        opacity: 0,
        //skewX: '-15deg',
        ease: 'back.out(3.5)',
    });

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: elem,
            start: 'top 75%',
            // end: 'bottom 75%',
            // markers: true,
        }
    });
    timeline.to(imageBoxImageWrapper, 1, {
            height: '100%',
            ease: 'power3.inOut',
        }, 'initial')
        .from(imageBoxImage, 1.6, {
            scale: 1.2,
            ease: 'power2.inOut',
        }, 'initial')
        .from(emplyeeFunction, 1.6, {
            opacity: 0,
            ease: 'power2.inOut',
        }, 'initial');

});

if (jQuery('blockquote').length > 0) {
    var quoteTeam = jQuery('blockquote');
    var quoteTeamSlipt = new SplitText(quoteTeam, {
        type: 'lines'
    })
    var quoteTeamTitle = quoteTeamSlipt.lines;

    gsap.from(quoteTeamTitle, .6, {
        scrollTrigger: {
            trigger: quoteTeam,
            start: 'top 75%',
            //markers: true,
        },
        //onComplete: revertTitle,
        stagger: .2,
        y: 16,
        opacity: 0,
        ease: 'power2.inOut',
        //skewX: '-15deg',
        //ease: 'back.out(3)',
    });
}


////////////////
// Paragraphs //
////////////////
var paragraphs = gsap.utils.toArray('.fade-in-p p, .fade-in-p img, .fade-in-p ul, .fade-in-p ol, .button:not(.button--intro):not(.button--no-fade), .contact-box, .hubspot');
paragraphs.forEach((elem, i) => {

    gsap.from(elem, 1.2, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            //markers: true,
        },
        // x: -24,
        opacity: 0,
        delay: .4
    });

});

var headings = gsap.utils.toArray('.animate-heading h2, .animate-heading h3, .animate-heading h4');
headings.forEach((elem, i) => {

    gsap.from(elem, 1.2, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            //markers: true,
        },
        // x: -24,
        opacity: 0,
        delay: .4
    });

});

var imageFadeUp = gsap.utils.toArray('.image-animate--fade-up');
imageFadeUp.forEach((elem, i) => {

    gsap.from(elem, 1.2, {
        scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            //markers: true,
        },
        y: 32,
        opacity: 0
    });

});




///////////////////
// Heading Lines //
///////////////////
// if (jQuery('.animate-heading').length > 0) {
//     var headings = gsap.utils.toArray('.animate-heading');
//     headings.forEach((elem, i) => {
//
//         var splitAnimate = elem;
//         var heading = elem.querySelector('h2, h3');
//         var SectionText = new SplitText(heading, {type: 'words, lines'})
//         var text = SectionText.words;
//
//         gsap.from(text, 1, {
//             scrollTrigger: {
//                 trigger: heading,
//                 start: 'top 85%',
//                 //markers: true,
//             },
//             opacity: 0,
//             stagger: .15,
//             y: 32
//         });
//
//     });
// }

//////////////////////
// Navigation Items //
//////////////////////
jQuery('.page-navigation__nav li a').each(function() {
    jQuery(this)
        .mouseenter(function() {
            jQuery('body').addClass('hover-page-navigation');
            jQuery(this).addClass('page-navigation__item--hover');
        })
        .mouseleave(function() {
            jQuery('body').removeClass('hover-page-navigation');
            jQuery(this).removeClass('page-navigation__item--hover');
        });

    var tl = gsap.timeline({
        paused: true
    });
    tl.to(jQuery(this).siblings('img'), {
        duration: 0.6,
        scale: 1,
        opacity: .6,
        ease: 'back.out(1.2)'
    });

    jQuery(this).mouseenter(function() {
        tl.play();
    }).mouseleave(function() {
        tl.reverse();
    })
});

////////////////
// Navigation //
////////////////
var navSplitText = new SplitText('.page-navigation__nav > ul > li', {
    type: 'words, chars'
});
var navSplitTextWords = navSplitText.words;
var navDetailSplitText = new SplitText('.page-navigation__details', {
    type: 'words'
});
var navDetailSplitTextWords = navDetailSplitText.words;

var navigationAnimation = gsap.timeline({
    paused: true,
    reversed: true
});
navigationAnimation.to('.page-navigation__blind', .8, {
        stagger: .1,
        height: '100%'
    })
    .set('.page-navigation__inner', {
        css: {
            pointerEvents: 'all'
        }
    }, '-=1')
    .to('.page-navigation__inner', .5, {
        opacity: 1,
    }, '-=1')
    .from(navSplitTextWords, 1, {
        y: '100%',
        ease: 'power2.inOut',
        stagger: .1,
    }, '-=1')
    .from(navDetailSplitTextWords, 1, {
        y: 16,
        opacity: 0,
        ease: 'power2.inOut',
        stagger: .02,
    }, '-=1');

/////////////////
// Nav Trigger //
/////////////////
jQuery('.nav-trigger').click(function(e) {
    e.preventDefault();
    $('body').toggleClass('nav-open');
    //navigationAnimation.reversed()?navigationAnimation.play().timeScale(1.2):navigationAnimation.reverse().timeScale(1.8);
    //navigationAnimation.play( !navigationAnimation.reversed() );
    navigationAnimation.reversed() ? navigationAnimation.play().timeScale(1.2) : navigationAnimation.reverse()
});

// jQuery('.animate-heading').each(function(){
//
//     var splitAnimate    = this;
//     var heading         = jQuery(this).find('h2, h3');
//     var SectionText     = new SplitText(heading, { type:'words, lines' })
//     var text            = SectionText.words;
//
//     gsap.from(text, 1,{
//         scrollTrigger: {
//             trigger: heading,
//             start: 'top 85%',
//             //markers: true,
//         },
//         stagger: .15,
//         y:'120%'
//     });
//
//     // var timeline = gsap.timeline({
//     //     scrollTrigger: {
//     //         trigger: heading,
//     //         start: 'center 75%',
//     //     }
//     // });
//     // timeline.from(text, 1,{
//     //     scrollTrigger: {
//     //         trigger: heading,
//     //         start: 'center 75%',
//     //         //markers: true,
//     //     },
//     //     stagger: .1,
//     //     y:'120%'
//     // }, 'initial')
//     //     .fromTo(text, 1,1,{
//     //         color: 'black',
//     //         ease: 'power1.inOut',
//     //         stagger: .1,
//     //     }, 'initial')
//     // ;
//
// });


// jQuery('.image-animate--slide').each(function(){
//
//     var imageAnimate    = this;
//
//     var heightImage     = jQuery(this).find('img').outerHeight();
//     jQuery(this).css('height', heightImage);
//
//     var imageWrapper    = jQuery(this).find('.image-animate__wrapper');
//     var imageInner      = jQuery(this).find('.image-animate__inner');
//     var image           = jQuery(this).find('img');
//
//     var timeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: imageAnimate,
//             start: 'top 75%',
//            // markers: true,
//         },
//     });
//     timeline
//         // .set(imageAnimate, {
//         //     height: heightImage
//         // })
//         .from(imageWrapper, 1.4,{
//             height: 0,
//             ease: 'power3.inOut',
//         }, 'initial')
//         .from(image, 1.8,{
//             scale: 1.4,
//             ease: 'power1.inOut',
//            // onComplete: complete,
//         }, 'initial')
//     ;
//
//
// });


////////////////
// Team Item //
///////////////
// jQuery('.image-animate--slide').each(function(){
//     var imageHeight = $(this).outerHeight();
//     $(this).css('height' ,imageHeight);
//     console.log("height: " + imageHeight);
// });

var imageSlide = gsap.utils.toArray('.image-animate--slide');
imageSlide.forEach((elem, i) => {

    var imageAnimate = this;
    var imageAnimate = elem;
    var imageSlideImage = elem.querySelector('img');
    var imageBoxSlideWrapper = elem.querySelector('.image-animate__inner');

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: elem,
            start: 'top 75%',
            // end: 'bottom 75%',
            //markers: true,
        }
    });
    timeline.to(imageBoxSlideWrapper, 1, {
        //height: '100%',
        webkitClipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
        clipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'power2.inOut',
    }, 'initial')
    // .from(imageSlideImage, 1.6,{
    //     scale: 1.2,
    //     ease: 'power2.inOut',
    // }, 'initial')
    ;
})


var imageSlide = gsap.utils.toArray('.portfolio__item');
imageSlide.forEach((elem, i) => {

    var imageAnimate = this;
    var imageAnimate = elem;
    var emplyeeTile = elem.querySelector('.portfolio__title');
    var emplyeeSubTile = elem.querySelector('.portfolio__type');
    var imageSlideImage = elem.querySelector('img');
    var imageBoxSlideWrapper = elem.querySelector('.image-animate__inner');

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: elem,
            start: 'top 75%',
            // end: 'bottom 75%',
            //markers: true,
        }
    });
    timeline.to(imageBoxSlideWrapper, 1, {
            //height: '100%',
            webkitClipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
            clipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power2.inOut',
        }, 'initial')
        .from(imageSlideImage, 1.6, {
            scale: 1.2,
            ease: 'power2.inOut',
        }, 'initial')
        .from(emplyeeTile, 1.6, {
            y: 24,
            opacity: 0,
            ease: 'power2.inOut',
        }, 'initial')
        .from(emplyeeSubTile, 1.6, {
            y: 24,
            opacity: 0,
            delay: .2,
            ease: 'power2.inOut',
        }, 'initial');
})

// ScrollTrigger.batch('.ticker', {
//     toggleClass: 'ticker--play'
// });


// jQuery('.image-animate--fade').each(function(){
//
//     var imageAnimate    = this;
//     var imageWrapper    = jQuery(this).find('.image-animate__wrapper');
//     var imageInner      = jQuery(this).find('.image-animate__inner');
//     var image           = jQuery(this).find('img');
//
//     var timeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: imageAnimate,
//             start: 'top 75%',
//             //markers: true,
//         },
//         onComplete: () => { timeline.clear(); }
//     });
//     timeline.from(imageWrapper, 1.8,{
//         y: 80,
//         opacity: 0,
//         ease: 'power3.inOut',
//     }, 'initial')
//         .from(image, 3,{
//             scale: 1.4,
//             ease: 'power3.inOut',
//         }, 'initial')
//     ;
//
// });



installMediaQueryWatcher("(min-width: 767px)", function(matches) {

    if (matches) {

        var pageIntro = jQuery('.page-intro');
        var pageIntroTitle = jQuery('.page-intro h1');
        var pageIntroSubTitle = jQuery('.page-intro h4');
        var pageIntroText = jQuery('.page-intro p, .page-intro h2, .page-intro h3');
        var pageIntroButton = jQuery('.page-intro .button');
        var pageIntroImage = jQuery('.image-animate--intro');
        var pageIntroCircle = jQuery('.circle-text');
        var pageIntroTitleSplit = new SplitText(pageIntroTitle, {
            type: 'words, lines'
        })
        var title = pageIntroTitleSplit.words;

        gsap.set(pageIntro, {
            opacity: 1,
        });
        gsap.set(pageIntroImage, {
            opacity: 1,
        });
        gsap.from(title, 1, {
            stagger: .05,
            y: 32,
            delay: .6,
            opacity: 0,
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroSubTitle, 1.2, {
            x: -24,
            opacity: 0,
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroText, 1.2, {
            delay: .8,
            opacity: 0,
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroButton, 1.2, {
            delay: 1,
            opacity: 0,
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroImage, 1.2, {
            delay: 1.6,
            opacity: 0,
            y: 160,
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroCircle, 1.2, {
            delay: 1.8,
            //rotation: 90,
            opacity: 0,
            ease: 'power2.inOut',
        });

        if (jQuery('.logos--animate-vertical').length > 0) {

            var logos = jQuery('.logos--animate-vertical');
            var logo = jQuery('.logos--animate-vertical').find('.logo');

            gsap.set(logos, {
                opacity: 1,
            });
            var timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: logos,
                    start: 'top 75%',
                    //markers: true,
                }
            });
            timeline.from(logo, .5, {
                y: 16,
                delay: 1.4,
                opacity: 0,
                stagger: .1,
                ease: 'power1.inOut',
            });

        }

        /////////////////
        // Image Blind //
        /////////////////
        var blinds = gsap.utils.toArray('.image-animate .blind');
        blinds.forEach((elem, i) => {

            gsap.to(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 75%',
                    end: 'top',
                    //markers: true,
                    scrub: true,
                },
                width: 0
            });

        });

        /////////////////
        // Case Details //
        /////////////////
        if (jQuery('.case-details-top').length > 0) {

            var services = jQuery('.case-details-top');
            var service = jQuery('.case-details-top').find('.col-1-4');

            var timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: services,
                    start: 'top 85%',
                    //markers: true,
                }
            });
            timeline.from(service, .5, {
                y: 32,
                opacity: 0,
                stagger: 5,
                ease: 'power1.inOut',
            });

        }


        /////////////////
        // Portfolio Hover //
        /////////////////
        jQuery('.portfolio__item').each(function() {

            var portfolioItemType = jQuery(this).find('.portfolio__type');
            var portfolioItemTitle = jQuery(this).find('.portfolio__title');
            var portfolioItemImageHover = jQuery(this).find('img:nth-child(2)');
            var portfolioItemTitleSplit = new SplitText(portfolioItemTitle, {
                type: 'chars'
            })
            var title = portfolioItemTitleSplit.chars;

            var portfolioItemTitleHover = jQuery(this).find('.portfolio__hover span');
            var portfolioItemTitleSplitHover = new SplitText(portfolioItemTitleHover, {
                type: 'chars'
            })
            var titleHover = portfolioItemTitleSplitHover.chars;

            var tlHoverPortfolio = gsap.timeline({
                paused: true
            });

            tlHoverPortfolio.to(title, 1.2, {
                    stagger: .05,
                    y: -16,
                    opacity: 0,
                    ease: 'back.out(3.5)',
                }, 'initial')
                .to(portfolioItemImageHover, 1, {
                    //height: '100%',
                    //webkitClipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
                    //clipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
                    ease: 'power2.inOut',
                    opacity: 1,
                    scale: 1.1,
                }, 'initial')
                .from(titleHover, 1.2, {
                    stagger: .05,
                    y: -16,
                    opacity: 0,
                    ease: 'back.out(3.5)',
                }, 'initial')
                .to(portfolioItemType, 1.4, {
                    // y: -16,
                    opacity: 0,
                    ease: 'back.out(3.5)',
                }, 'initial');

            jQuery(this).mouseenter(function() {
                tlHoverPortfolio.play().timeScale(1.5);
            }).mouseleave(function() {
                tlHoverPortfolio.reversed() ? tlHoverPortfolio.play() : tlHoverPortfolio.reverse();
            })

        });

        /////////////////
        // CTA Footer //
        /////////////////
        if (jQuery('.cta-footer').length > 0) {
            var ctaFooter = jQuery('.cta-footer');
            var ctaFooterTitle = jQuery('.cta-footer__title');
            var imageBoxImage = jQuery('.cta-footer__image');
            var imageBoxImageImage = jQuery('.cta-footer__image img');
            var imageBoxImageWrapper = jQuery('.cta-footer__image-inner');

            var ctaFooterTitleSplit = new SplitText(ctaFooterTitle, {
                type: 'words, lines, chars'
            })
            var title = ctaFooterTitleSplit.chars;

            gsap.from(title, .8, {
                scrollTrigger: {
                    trigger: ctaFooter,
                    start: 'top 75%',

                    //markers: true,
                },
                //onComplete: revertTitle,
                stagger: .05,
                y: 40,
                opacity: 0,
                toggleClass: {
                    targets: ctaFooterTitle,
                    className: "active"
                },
                //skewX: '-15deg',
                ease: 'back.out(3.5)',
            });

            // function revertTitle(){
            //     ctaFooterTitleSplit.revert();
            // }

            var timeline = gsap.timeline({
                paused: true
            });
            timeline.from(imageBoxImage, .6, {
                    height: 0,
                }, 'initial')
                .from(imageBoxImageImage, 1.4, {
                    scale: 1.2,
                    ease: 'power1.inOut',
                }, 'initial');

            ctaFooterTitle.hover(function() {
                timeline.play().timeScale(1.5);
            }, function() {
                timeline.reversed() ? timeline.play() : timeline.reverse();
            });
        }

        ////////////////
        // Contact //
        ////////////////
        var contacts = gsap.utils.toArray('.fade-in-contact');
        contacts.forEach((elem, i) => {

            gsap.to(elem, 1.6, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    //markers: true,
                },
                // x: -24,
                opacity: 1,
                delay: 1.8
            });

        });

    } else {

        var pageIntro = jQuery('.page-intro');
        var pageIntroTitle = jQuery('.page-intro h1');
        var pageIntroSubTitle = jQuery('.page-intro h4');
        var pageIntroText = jQuery('.page-intro p');
        var pageIntroButton = jQuery('.page-intro .button');
        var pageIntroImageAni = jQuery('.image-animate--intro');
        var pageIntroImage = jQuery('.image-animate--intro .image-animate__inner');
        var pageIntroCircle = jQuery('.circle-text');
        var pageIntroTitleSplit = new SplitText(pageIntroTitle, {
            type: 'words, lines, chars'
        })
        var title = pageIntroTitleSplit.chars;

        gsap.set(pageIntro, {
            opacity: 1,
        });
        gsap.set(pageIntroImageAni, {
            opacity: 1,
        });
        gsap.from(title, .8, {
            stagger: .05,
            y: 16,
            delay: .6,
            opacity: 0,
            ease: 'back.out(3)',
        });
        gsap.from(pageIntroSubTitle, 1.2, {
            x: -24,
            opacity: 0,
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroText, 1.2, {
            delay: .8,
            opacity: 0,
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroButton, 1.2, {
            delay: 1,
            opacity: 0,
            ease: 'power2.inOut',
        });
        gsap.to(pageIntroImage, 1.2, {
            scrollTrigger: {
                trigger: pageIntroImage,
                start: 'top 85%',
                //markers: true,
            },
            webkitClipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
            clipPath: 'polygon(0px 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: 'power2.inOut',
        });
        gsap.from(pageIntroCircle, 1.2, {
            scrollTrigger: {
                trigger: pageIntroCircle,
                start: 'top 85%',
                //markers: true,
            },
            //rotation: 90,
            opacity: 0,
            ease: 'power2.inOut',
        });

        if (jQuery('.logos--animate-vertical').length > 0) {

            var logos = jQuery('.logos--animate-vertical');
            var logo = jQuery('.logos--animate-vertical').find('.logo');

            gsap.set(logos, {
                opacity: 1,
            });
            var timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: logos,
                    start: 'top 75%',
                    //markers: true,
                }
            });
            timeline.from(logo, .5, {
                y: 16,
                opacity: 0,
                stagger: .1,
                ease: 'power1.inOut',
            });

        }

        if (jQuery('.cta-footer').length > 0) {

            var ctaFooter = jQuery('.cta-footer');
            var ctaFooterTitle = jQuery('.cta-footer__title');
            var imageBoxImage = jQuery('.cta-footer__image');
            var imageBoxImageImage = jQuery('.cta-footer__image img');
            var imageBoxImageWrapper = jQuery('.cta-footer__image-inner');

            var ctaFooterTitleSplit = new SplitText(ctaFooterTitle, {
                type: 'words, lines, chars'
            })
            var title = ctaFooterTitleSplit.chars;

            gsap.from(title, .8, {
                scrollTrigger: {
                    trigger: ctaFooter,
                    start: 'top 75%',
                    //markers: true,
                },
                //onComplete: revertTitle,
                stagger: .05,
                y: 40,
                opacity: 0,
                //skewX: '-15deg',
                ease: 'back.out(3.5)',
            });

            // function revertTitle(){
            //     ctaFooterTitleSplit.revert();
            // }

            var timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: imageBoxImage,
                    start: 'top 75%',
                    //markers: true,
                }
            });
            timeline.from(imageBoxImage, .6, {
                    height: 0,
                }, 'initial')
                .from(imageBoxImageImage, 1.4, {
                    scale: 1.2,
                    ease: 'power1.inOut',
                }, 'initial');
        }


        ////////////////
        // Contact //
        ////////////////
        var contacts = gsap.utils.toArray('.contact-stimmt');
        contacts.forEach((elem, i) => {

            gsap.to(elem, 1.6, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    //markers: true,
                },
                // x: -24,
                opacity: 1,
                delay: 1.8
            });

        });

        var locations = gsap.utils.toArray('.stimmt-enschede, .stimmt-amsterdam');
        locations.forEach((elem, i) => {

            gsap.to(elem, 1.6, {
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 85%',
                    //markers: true,
                },
                // x: -24,
                opacity: 1,
                delay: .4
            });

        });

    }
});


if (jQuery('.jobs').length > 0) {

    var jobs = jQuery('.jobs');
    var job = jQuery('.jobs').find('.job');

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: jobs,
            start: 'top 75%',
            //markers: true,
        }
    });
    timeline.from(job, .6, {
        y: -24,
        opacity: 0,
        delay: 1.2,
        stagger: .2,
        ease: 'power1.inOut',
    });

}

if (jQuery('.logos--animate').length > 0) {

    var logos = jQuery('.logos--animate');
    var logo = jQuery('.logos--animate').find('.logo');

    var timeline = gsap.timeline({
        scrollTrigger: {
            trigger: logos,
            start: 'top 75%',
            //markers: true,
        }
    });
    timeline.from(logo, .5, {
        y: 16,
        opacity: 0,
        stagger: .1,
        ease: 'power1.inOut',
    });

}

function installMediaQueryWatcher(mediaQuery, layoutChangedCallback) {
    var mql = window.matchMedia(mediaQuery);
    mql.addListener(function(e) {
        return layoutChangedCallback(e.matches);
    });
    layoutChangedCallback(mql.matches);
}