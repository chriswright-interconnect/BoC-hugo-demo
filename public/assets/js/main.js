(() => {
  // ns-hugo:C:\Hugo\BoC-hugo-demo\assets\js\components\lazy-video.js
  var videoWrappers = document.querySelectorAll(".lazy-video");
  function placeholderImage(e) {
    e.classList.add("video--no-thumbnail");
  }
  function videoImage(e) {
    const videoEmbed = e.getAttribute("data-embed");
    if (videoEmbed.indexOf("vimeo") <= 0) {
      const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
      const videoId = videoEmbed.match(regExp);
      if (e.classList.contains("lazy-video--hd")) {
        e.style.backgroundImage = 'url( "https://img.youtube.com/vi/' + videoId[1] + '/maxresdefault.jpg")';
      } else {
        e.style.backgroundImage = 'url( "https://img.youtube.com/vi/' + videoId[1] + '/hqdefault.jpg")';
      }
    } else if (videoEmbed.indexOf("vimeo")) {
      const regExp = "([+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*))(?:[eE]([+-]?\\d+))?";
      const vimeoVideoID = videoEmbed.match(regExp)[1];
      const request = new XMLHttpRequest();
      request.open("GET", "//vimeo.com/api/oembed.json?url=https://vimeo.com/" + vimeoVideoID, true);
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          var data = JSON.parse(this.response);
          e.style.backgroundImage = 'url( "' + data.thumbnail_url + '")';
        } else {
          placeholderImage(e);
        }
      };
      request.onerror = function() {
        placeholderImage(e);
      };
      request.send();
    }
  }
  function lazyVideo(e) {
    const videoEmbed = e.getAttribute("data-embed");
    if (videoEmbed.indexOf("vimeo") <= 0) {
      const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
      const videoId = videoEmbed.match(regExp)[1];
      e.innerHTML = `
        <iframe
            style="position: absolute; top:0; left: 0; width: 100%; height: 100%;"
            src="https://www.youtube.com/embed/` + videoId + `?autoplay=1&modestbranding=1&rel=0"
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
    } else {
      const regExp = "([+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*))(?:[eE]([+-]?\\d+))?";
      const vimeoVideoID = videoEmbed.match(regExp)[1];
      e.innerHTML = `
        <div style="padding:56.25% 0 0 0;position:relative;">
            <iframe src="https://player.vimeo.com/video/` + vimeoVideoID + `?h=9eb9d8bfb7&autoplay=1"
                    style="position:absolute;top:0;left:0;width:100%;height:100%;" frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"><\/script>`;
    }
    e.classList.add("lazy-video--loaded");
  }
  if (videoWrappers.length) {
    document.addEventListener("DOMContentLoaded", () => {
      for (const videoWrapper of videoWrappers) {
        videoImage(videoWrapper);
      }
    });
  }
  if (videoWrappers.length) {
    for (const videoWrapper of videoWrappers) {
      videoWrapper.addEventListener("click", () => {
        lazyVideo(videoWrapper);
      });
    }
  }
})();
