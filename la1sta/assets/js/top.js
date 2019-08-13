var $top = jQuery.noConflict();
$top(document).ready(function() {
  // facebook
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v3.0';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  var windowWidth = $top(window).width();
  var htmlStr = $top('#pageplugin').html();
  var timer = null;
  $top(window).on('resize', function() {
    var resizedWidth = $top(window).width();
    if (windowWidth != resizedWidth && resizedWidth < 1000) {
      clearTimeout(timer);
      timer = setTimeout(function() {
        $top('#pageplugin').html(htmlStr);
        window.FB.XFBML.parse();
        var windowWidth = $top(window).width();
      }, 1000);
    }
  });

  // Swiper
  var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 600,
    slidesPerView: 2,
    spaceBetween: 0,
    centeredSlides: true,
    pagination: '.swiper-pagination',
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    autoplay: {
      delay: 3000,
      stopOnLast: false,
      disableOnInteraction: true
    },
    breakpoints: {
      1000: {
        slidesPerView: 1,
        spaceBetween: 0
      }
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

});
