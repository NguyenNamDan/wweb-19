window.onload = () => {
  let isLoading = false;
  let timeOutId = undefined;

  document.getElementById("keyword").addEventListener("input", event => {
    const searchKeyword = document.getElementById("keyword").value;
    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      // call Youtube API
      $.ajax({
        type: "GET",
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchKeyword}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
        success: data => {
          document.getElementById("result-list").innerText = "";
          data.items.forEach(item => {
            const itemLink = `
              <a class='result col-md-12' href='https://www.youtube.com/watch?v=${
                item.id.videoId
              }' target='_blank'>
                <div class='row'>
                  <div class='col-4'>
                    <img src='${item.snippet.thumbnails.medium.url}' />
                  </div>
                  <div class='col-8'>
                    <div class='video-info'>
                      <h2 class='title'>${item.snippet.title}</h2>
                      <p class='description'>${item.snippet.description}</p>
                      <span>View >></span>
                    </div>
                  </div>
                </div>
              </a>
            `;
            $("#result-list").append(itemLink);
          });

          // listen scroll event
          window.addEventListener("scroll", () => {
            if (
              document.documentElement.offsetHeight -
                window.innerHeight -
                window.scrollY <=
              200
            ) {
              if (!isLoading) {
                isLoading = true;

                $.ajax({
                  type: "GET",
                  url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${
                    data.nextPageToken
                  }`,
                  success: data2 => {
                    data.items.forEach(item => {
                      const itemLink = `
                        <a class='result col-md-12' href='https://www.youtube.com/watch?v=${
                          item.id.videoId
                        }' target='_blank'>
                          <div class='row'>
                            <div class='col-4'>
                              <img src='${
                                item.snippet.thumbnails.medium.url
                              }' />
                            </div>
                            <div class='col-8'>
                              <div class='video-info'>
                                <h2 class='title'>${item.snippet.title}</h2>
                                <p class='description'>${
                                  item.snippet.description
                                }</p>
                                <span>View >></span>
                              </div>
                            </div>
                          </div>
                        </a>
                      `;
                      $("#result-list").append(itemLink);
                    });

                    isLoading = false;
                  },
                  error: error2 => {
                    console.log(error);
                  }
                });
              }
            }
          });
        },
        error: error => {
          console.log(error);
        }
      });
    }, 1000);
  });
};
