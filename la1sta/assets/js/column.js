var $co = jQuery.noConflict();
$co(function(){
    // facebook
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v3.1';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $co(".sideMenu .column_side_ttl").on("click", function() {
        $co(this).next().slideToggle();
    });

    // style削除
    var timer = false;
    var prewidth = $co(window).width()
    $co(window).resize(function() {
      if (timer !== false) {
        clearTimeout(timer);
      }
      timer = setTimeout(function() {
        var nowWidth = $co(window).width()
        if (prewidth !== nowWidth) {
          $co('.sideMenu ul').removeAttr('style');
        }
        prewidth = nowWidth;
      }, 200);
    });
});
