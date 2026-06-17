var flickr = (function(){

  function render(target, item, c){

    if (c == 1 || c == 4)
    {
      c = "left";
    } else if (c == 2 || c == 5) {
      c = "center";
    } else {
      c = "right";
    }

    max = 6;
    min = -6;
    rot = Math.floor(Math.random() * (max - min + 1) + min);

    $(target)[0].innerHTML += '<div style="-webkit-transform: rotate('+rot+'deg); -moz-transform: rotate('+rot+'deg)" class="single-item '+c+'"> <a href="'+item.link+'" title="'+item.title+'"> <img src="'+item.media.m+'" /> </a> </div>';

  }
  return {
    showImages: function(options){
      $.ajax({
          url: "http://api.flickr.com/services/feeds/photos_public.gne?id=" + options.user + "&lang=en-us&format=json&jsoncallback=?",
          type: 'jsonp',
          dataType: 'jsonp',
          error: function (err) { $(options.target + ' li.loading').addClass('error').text("Error loading feed"); },
          success: function(data) {

            $(options.target + " > div").remove();
            var c = 1;
            $(data.items.splice(0,options.count)).each(function(index, item){
              render(options.target, item, c);
              c++;
            });

        }
      });
    }
  };
})();
