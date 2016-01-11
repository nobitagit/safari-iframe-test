(function () {
  // the url of the actual page with the video (the one that will be seen inside the iframe)
  // see: http://stackoverflow.com/a/9851769/1446845
  var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;

  var utils = {
    getQueryString: function(field, url) {
      var href = url ? url : window.location.href;
      var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
      var string = reg.exec(href);
      return string ? string[1] : null;
    }
  };

  if (isSafari) {
    var hasRedirect = utils.getQueryString('redirectToIframe')
    console.log(hasRedirect)
    if (hasRedirect) {
      console.log('redirecting')
      setTimeout(function () {
        window.location.href = hasRedirect
      },1)
    }
  }

  // only for demo, to be removed, only emulates real world usage

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
  var privateArea = document.getElementById('private-area')
  var publicArea = document.getElementById('public-area')

  if (top.location === self.location) { // if outside an iframe
    utils.createCookie('cache-is-primed');
  }

  if (utils.getCookie('cache-is-primed')) {
    privateArea.classList.remove('hide');
    publicArea.classList.add('hide');
  }





})()