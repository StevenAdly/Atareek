(function($) {
    if ($.fn.style) {
        return;
    }

    // Escape regex chars with \
    var escape = function(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

    // For those who need them (< IE 9), add support for CSS functions
    var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
    if (!isStyleFuncSupported) {
        CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
            return this.getAttribute(a);
        };
        CSSStyleDeclaration.prototype.setProperty = function(styleName, value, priority) {
            this.setAttribute(styleName, value);
            var priority = typeof priority != 'undefined' ? priority : '';
            if (priority != '') {
                // Add priority manually
                var rule = new RegExp(escape(styleName) + '\\s*:\\s*' + escape(value) +
                    '(\\s*;)?', 'gmi');
                this.cssText =
                    this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
            }
        };
        CSSStyleDeclaration.prototype.removeProperty = function(a) {
            return this.removeAttribute(a);
        };
        CSSStyleDeclaration.prototype.getPropertyPriority = function(styleName) {
            var rule = new RegExp(escape(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?',
                'gmi');
            return rule.test(this.cssText) ? 'important' : '';
        }
    }

    // The style function
    $.fn.style = function(styleName, value, priority) {
        // DOM node
        var node = this.get(0);
        // Ensure we have a DOM node
        if (typeof node == 'undefined') {
            return this;
        }
        // CSSStyleDeclaration
        var style = this.get(0).style;
        // Getter/Setter
        if (typeof styleName != 'undefined') {
            if (typeof value != 'undefined') {
                // Set style property
                priority = typeof priority != 'undefined' ? priority : '';
                style.setProperty(styleName, value, priority);
                return this;
            } else {
                // Get style property
                return style.getPropertyValue(styleName);
            }
        } else {
            // Get CSSStyleDeclaration
            return style;
        }
    };
})(jQuery);


//=======================================>>> sidebar
function sideBarFun() {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        // hide sidebar
        $('#sidebar').removeClass('active');
        // hide overlay
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        // open sidebar
        $('#sidebar').addClass('active');
        // fade in the overlay
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
}





// $('.arrow-parrernt').on("hover",function (){
//     var theChild = $(this).child();
// });

var placeId;
function TakePlaceFunction(placeId) {
    var ReservationHeight = $('.reservation').height();
    if(placeId=='takePlace1'){
        var TakePlaceHeight = ReservationHeight;
    }else {
        var TakePlaceHeight = ReservationHeight+80;
    }
    console.log(TakePlaceHeight);
    $('#'+placeId).css('height',TakePlaceHeight+'px');

}


var a,b;
function periodSize(a,b) {
var periodHeight= $(a).height();
$(b).css('height',periodHeight+60+'px');
}



// var number = document.getElementById('guestsNumber');
//
// // Listen for input event on numInput.
// number.onchange = function(e) {
//     if(number.value<0){
//         number.value=0 ;
//     }
// }

//min and max div heights at booking num 3
function minMaxDivSize(){
  var layer2Height= $('#layer2').height();
    $('#layer3').css('height',layer2Height+'px');
    // $('#firstlayer').height($('#secondlayer').height());

}


function makeSameAsWidth() {

    var sameDimentionsClass = $('.same-dimentions');
    var width;
    for (var i = 0; i < sameDimentionsClass.length ; i++)
    {
        width =$(sameDimentionsClass[i]).css('width');
        $(sameDimentionsClass[i]).css('height', width);
    }
}

//===========================================================================
//---------------------resize------------------------------------------------
//===========================================================================
$(window).on("resize",function () {
    // sideBarFun();
    periodSize('#fromTo1','#period1');
    periodSize('#fromTo2','#period2');
    periodSize('#fromTo3','#period3');
    periodSize('#fromTo4','#period4');

    minMaxDivSize();

    makeSameAsWidth();

    TakePlaceFunction('takePlace1');
    TakePlaceFunction('takePlace');


});

//===========================================================================
//---------------------End resize--------------------------------------------
//===========================================================================

$(window).on("load",function () {
    // sideBarFun();
});
//===========================================================================
//---------------------document ready----------------------------------------
//===========================================================================
$(document).ready(function (){
    // sideBarFun();

    periodSize('#fromTo1','#period1');
    periodSize('#fromTo2','#period2');
    periodSize('#fromTo3','#period3');
    periodSize('#fromTo4','#period4');

    minMaxDivSize();

    makeSameAsWidth();


    TakePlaceFunction('takePlace1');
    TakePlaceFunction('takePlace');



});
//===========================================================================
//---------------------end document ready------------------------------------------------
//===========================================================================
