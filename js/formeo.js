/* fix vertical when not overflow
 * call fullscreenFix() if .fullscreen content changes */
function fullscreenFix() {
    var h = $('body').height();

    //set .fullscreen height
    $(".content-b").each(function(i) {
        if ($(this).innerHeight() <= h) {
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}

$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize() {
    var windowH = $(window).height();

    $(".background").each(function(i) {
        var path = $(this);
        
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;

        if (path.hasClass("parallax")) {
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }

        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;

        // fix when too large
        if (contW > imgW) {
            imgW = contW;
            imgH = imgW / ratio;
        }

        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
        path.css("height", imgH + "px ");
    });
}

$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

$(".PageIntro-arrowDown").click(function() {
    $('html, body').animate({
        scrollTop: $(".Cornerstones").offset().top
    }, 1000);
});
;// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.StickyHeader').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.StickyHeader').removeClass('is-scrollingDown').addClass('is-scrollingUp');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.StickyHeader').removeClass('is-scrollingUp').addClass('is-scrollingDown');
        }
    }
    
    lastScrollTop = st;
}
;jQuery(document).ready(function($){
	var $timeline_block = $('.cd-timeline-block');

	//hide timeline blocks which are outside the viewport
	$timeline_block.each(function(){
		if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
			$(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		}
	});

	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		$timeline_block.each(function(){
			if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.85 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
				$(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
			}
		});
	});
});
