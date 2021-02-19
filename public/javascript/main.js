// Scrolling animation
$(document).on('click', '.menu-items a, .scrollto', function(e) {
    var target = $(this.hash);
    var scrollto = target.offset().top;
    $('html,body').animate({

            scrollTop: scrollto
        },
        'slow');
});

$(function() {
    $('.menu-items a').filter(function() { return this.href == location.href }).parent().addClass('active').siblings().removeClass('active')
    $('.menu-items a').click(function() {
        $(this).parent().addClass('active').siblings().removeClass('active')
    })
})

//section menu active on scroll

$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
    $('section').each(function(i) {
        if ($(this).position().top <= scrollDistance + 20) {
            $('.menu-items .active').removeClass('active');
            $('.menu-items a').eq(i).addClass('active');
        }
    });
}).scroll();

//active-menu

// TypeWrite Script
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};



var modal_body = document.getElementsByClassName("modal-body");

// Get the button that opens the modal

var modal_button = document.getElementsByClassName("button-trigger");

// Get the <span> element that closes the modal
var modal_close = document.getElementsByClassName("modal-close");

// When the user clicks the button, open the modal
function setDataIndex() {

    for (i = 0; i < modal_button.length; i++) {
        modal_button[i].setAttribute('data-index', i);
        modal_body[i].setAttribute('data-index', i);
        modal_close[i].setAttribute('data-index', i);
    }
}



for (i = 0; i < modal_button.length; i++) {
    modal_button[i].onclick = function() {
        var ElementIndex = this.getAttribute('data-index');
        modal_body[ElementIndex].style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    modal_close[i].onclick = function() {
        var ElementIndex = this.getAttribute('data-index');
        modal_body[ElementIndex].style.display = "none";
    };

}

window.onload = function() {

    setDataIndex();
};

window.onclick = function(event) {
    if (event.target === modal_body[event.target.getAttribute('data-index')]) {
        modal_body[event.target.getAttribute('data-index')].style.display = "none";
    }


};