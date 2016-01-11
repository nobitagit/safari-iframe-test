(function () {
  // the url of the actual page with the video (the one that will be seen inside the iframe)
  // see: http://stackoverflow.com/a/9851769/1446845
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

  var utils = {
    createCookie : function(name, value, days) {
      var expires;
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
      }
      else {
          expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    getCookie: function(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
  }

  var hasSafariCookie = utils.getCookie('safarihack');

  if (isSafari) {

      if(!hasSafariCookie) {
        console.log('safari has no cookie set')
        var iframeEl = document.getElementById('iframeEl')
        if (!iframeEl) { return; }
        console.log('setting cookie for safari')
        //utils.getCookie('safarihack')
        utils.createCookie('safarihack', 'true')
        //utils.getCookie('safarihack')
        console.log('redirecting')
        setTimeout(function () {
          window.location = iframeEl.getAttribute('src') + '?redirectToIframe=' + document.location.href
        },1)
      }
  }
})()