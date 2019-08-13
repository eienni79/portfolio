var $js = jQuery.noConflict();
$js(document).ready(function() {
  // header
  $js(".navi_p").flexNav();

  // style削除
  var timer = false;
  var prewidth = $js(window).width()
  $js(window).resize(function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      var nowWidth = $js(window).width()
      if (prewidth !== nowWidth) {
        $js('#js-header_nav_list').removeAttr('style');
      }
      prewidth = nowWidth;
    }, 200);
  });

  //footerCv
  $js(window).on("scroll touchmove", function() {
    $js("#footerCv").stop();
    $js("#footerCv").css('display', 'none').delay(300).fadeIn(500);
  });

     $js('a[href^="#"]').click(function() {
        var speed = 400;
        var href= $js(this).attr("href");
        var target = $js(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $js('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
     });
});


  // $(function(){
  // });
