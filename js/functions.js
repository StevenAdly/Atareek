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

//======================================>>>>>>funciton optionSelect
function optionSelect() {

    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
}
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
function removeSmallReservationClassAndAdd() {

  if($(window).width()<768){
      $('.reservation-small').removeClass('reservation-small').addClass('reservation-small-holder');
  }else {
      $('.reservation-small-holder').addClass('reservation-small').removeClass('reservation-small-holder');
  }
}

function  megaMenuSize() {
    var screenSize= $(window).width();
    $('#mega-menu').css('width',screenSize+'px');
    var navContainerWidth =$('#nav-container').width();
    var rightPosition =(screenSize-navContainerWidth)/2;
    $('#mega-menu').css('right',-rightPosition+'px');
    // console.log('right pos '+rightPosition);
}


$('#nav-toggle-icon').on('click',function(){
    $(this).toggleClass('fa-bars fa-times');
});


function maxSize() {
    var total1Test= $('#total-1-test').height();
    var total2Test=$('#total-2-test').height();
    var max=0;
    if(total1Test>total2Test){
        max=total1Test;

    }else {
        max=total2Test;
    }

    console.log('max is'+max);
    $('#total-2-test').css('height',max+'px');
    $('#total-1-test').css('height',max+'px');



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

    maxSize();
    optionSelect();

    megaMenuSize();

    minMaxDivSize();

    makeSameAsWidth();

    TakePlaceFunction('takePlace1');
    TakePlaceFunction('takePlace');

    removeSmallReservationClassAndAdd();

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

    maxSize();

    optionSelect();
    megaMenuSize();

    minMaxDivSize();

    makeSameAsWidth();


    TakePlaceFunction('takePlace1');
    TakePlaceFunction('takePlace');

    removeSmallReservationClassAndAdd();



});
//===========================================================================
//---------------------end document ready------------------------------------------------
//===========================================================================
