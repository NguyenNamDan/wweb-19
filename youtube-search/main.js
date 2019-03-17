window.onload = () => {
  document.getElementById("search").addEventListener("submit", e => {
    e.preventDefault();
    const form = document.getElementById("search");
    const keyword = form.keyword.value;
    $.ajax({
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
      type: "GET",
      success: data => {
        console.log(data);
        nextPageToken = data.nextPageToken;
        $("#result-list").html("");
        data.items.forEach(item => {
          const itemLink = `
                <a class="result col-md-12" href="https://www.youtube.com/watch?v=${
                  item.id.videoId
                }?autoplay=true" target="_blank">
                    <img src="${item.snippet.thumbnails.medium.url}" alt="">
                    <div>
                        <h2 class="title">>${item.snippet.title}</h2>
                        <p class="description">>${item.snippet.description}</p>
                        <span> >> </span>
                    </div>
                </a>
                `;
          $("#result-list").append(itemLink);
        });
      },
      error: error => {}
    });
    $(window).scroll(function() {
      if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        $.ajax({
          url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nextPageToken}`,
          type: "GET",
          success: data => {
            console.log(data);
            nextPageToken = data.nextPageToken;
            $("#result-list").html("");
            data.items.forEach(item => {
              const itemLink = `
                    <a class="result col-md-12" href="https://www.youtube.com/watch?v=${
                      item.id.videoId
                    }?autoplay=true" target="_blank">
                        <img src="${item.snippet.thumbnails.medium.url}" alt="">
                        <div>
                            <h2 class="title">>${item.snippet.title}</h2>
                            <p class="description">>${
                              item.snippet.description
                            }</p>
                            <span> >> </span>
                        </div>
                    </a>
                    `;
              $("#result-list").append(itemLink);
            });
          },
          error: error => {}
        });
      }
    });
  });
};
