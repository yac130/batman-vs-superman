///////////////////////////
//funciones jqueryMobile
///////////////////////////

$(document).on('swipeleft', '.ui-page', function(event){    
    if(event.handled !== true) // This will prevent event triggering more then once
    {    
        var nextpage = $.mobile.activePage.next('[data-role="page"]');
        // swipe using id of next page if exists
        if (nextpage.length > 0) {
            $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, true, true);
        }
        event.handled = true;
    }
    return false;         
});

$(document).on('swiperight', '.ui-page', function(event){     
    if(event.handled !== true) // This will prevent event triggering more then once
    {      
        var prevpage = $(this).prev('[data-role="page"]');
        if (prevpage.length > 0) {
            $.mobile.changePage(prevpage, {transition: "slide", reverse: true}, true, true);
        }
        event.handled = true;
    }
    return false;            
}); 

// swipe up and down

// jQueryMobile-SwipeUpDown
// ----------------------------------
//
// Copyright (c)2012 Donnovan Lewis
// Distributed under MIT license
//
// https://github.com/blackdynamo/jquerymobile-swipeupdown

(function () {
// initializes touch and scroll events
    var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

    // handles swipeup and swipedown
    $.event.special.swipeupdown = {
        setup: function () {
            var thisObject = this;
            var $this = $(thisObject);

            $this.bind(touchStartEvent, function (event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }

                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }

                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function (event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
            });
        }
    };

//Adds the events to the jQuery events special collection
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function (event, sourceEvent) {
        $.event.special[event] = {
            setup: function () {
                $(this).bind(sourceEvent, $.noop);
            }
        };
        //Adds new events shortcuts
        $.fn[ event ] = function( fn ) {
            return fn ? this.bind( event, fn ) : this.trigger( event );
        };
        // jQuery < 1.8
        if ( $.attrFn ) {
            $.attrFn[ event ] = true;
        }
    });

})(); 

// menu accordion

(function($){
$( document ).ready(function() {
    $('#menu > ul > li > a').click(function() {
        $('#menu li').removeClass('active');
            $(this).closest('li').addClass('active'); 
            var checkElement = $(this).next();
            if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
                $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }
            if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
                $('#menu ul ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
        }
            if($(this).closest('li').find('ul').children().length == 0) {
            return true;
        } else {
            return false;   
        }     
    });
});
} )( jQuery );



//intro portada

$(document).ready(function() {   


    // menú
    $(".hamburger").click(function() {
        $(".main-menu").animate({
            top: "0"
            }, 500, function() {
        // Animation complete.
      });
    });

    // cerrar menú
    $(".cerrar-icon").click(function() {
        $(".main-menu").animate({
            top: "-150%"
            }, 500, function() {
        // Animation complete.
      });
    });

    $("#menu ul li").click(function() {
        $(".main-menu").animate({
            top: "-150%"
            }, 500, function() {
        // Animation complete.
      });
    });

    //portada
    
    $(".portada h4").delay(2800).animate({
        left: "0"
        }, 1500, function() {    
    });

    $(".portada-1").on('swipeup',function() {
        $(".portada-1").animate({
            top: "-100%"
            }, 500, function() {
        });
    });

    $(".portada-2").on('swipeup',function() {
        $(".portada-2").animate({
            top: "-100%"
            }, 500, function() {
        });
    });

    $(".portada-2").on('swipedown',function() {
        $(".portada-1").animate({
            top: "0"
            }, 500, function() {
        });
    });

    $(".portada-11").on('swipedown',function() {
        $(".portada-2").animate({
            top: "0"
            }, 500, function() {
        });
    });

    $(".portada-11").on('swipeup',function() {
        $(".portada-11").animate({
            top: "-100%"
            }, 500, function() {
        });
    });

    $(".portada-12").on('swipedown',function() {
        $(".portada-11").animate({
            top: "0"
            }, 500, function() {
        });
    });

    //trivia      

    /*$("#submitbutton").click(function () {
        $("img.question-image").each(function() {
            displaying = $(this).css("display");
            if(displaying == "block") {
              $(this).fadeOut('slow',function() {
               $(this).css("display","none");
              });
            } else {
              $(this).fadeIn('slow',function() {
                $(this).css("display","block");
              });
            }
        });
    });*/


    /*$(".ocultar").click(function() {
        $(".question-image").hide();   
    });*/

    /*$
    ('#ver-bestia-2').click(function() {
        $('#bestia-2').fadeIn('slow');
    });
    */
  

});






