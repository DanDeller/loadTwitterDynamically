    var grabStars = '';

    $('.slides li img').on('click', function() {

      var deviceID   = $(this).attr('data-id'),
          dataSlug   = $(this).parents('li').find('.get-slug').attr('data-slug'),
          twitterURL = $(this).attr('data-url');
          grabStars  = $(this).parents('li').find('.grab-stars').text().length;

      $('.twitter-timeline').attr('href', twitterURL);

      $('.load-wrap').fadeIn(500);

      $('.info-blurb').fadeOut(500);

      $('.fade-it').fadeOut(500, function() {

        $.ajax({
          url: '/api/device/' + deviceID
        }).done(function(data) {
          $('.company-image').attr('src', 'https://s3-us-west-1.amazonaws.com/wearablezone/uploads/' + data.company.logo);

          $('.company-name').text(data.name);

          $('.company-info').html(data.company.body);

          $('.quick-excerpt').text(data.company.short_description);
          
          $('.full-story a').attr('href', 'https://wearablezone.com/device/' + dataSlug);

          $('.stock-name').text(data.company.name);

          loadScripts(setTwitterHandle,"//platform.twitter.com/widgets.js");
          setTwitterHandle(data.company.twitter_name);

          $('.up-top, .full-story, up-top, .full-story-rate, .company-image').removeClass('hide');

          $('.fade-it').fadeIn(500);

          $('.load-wrap').fadeOut(500);
        }); // end ajax call

      }); // end fadeOut/In

    }); // end on click

    function loadScripts(callback, src) {
      var head = document.getElementsByTagName('head')[0],
          script = document.createElement('script');

      script.type = 'text/javascript';
      script.src = src;
      
      // bind the event to the callback function
      script.onreadystatechange = callback;
      script.onload = callback;

      $('.load-twitter-here').append(script);
    }

    function setTwitterHandle(handle) {
      var handleBox = $('.twitter-hold');
      $('.load-twitter-here').html(
        '<a id="twitter-feed" class="twitter-timeline" data-tweet-limit=3 href="' + handle + '"></a> '
        );
    }
