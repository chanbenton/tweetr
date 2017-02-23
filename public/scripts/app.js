/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweet) => {
  let article = $("<article></article>");
  
  let header = $("<header></header>").addClass("tweeter-profile");

  let avatar = $("<img></img>").addClass("avatar").attr('src', tweet.user.avatars.small);
  let name = $("<span></span>").addClass("full-name").text(tweet.user.name);
  let alias = $("<span></span>").addClass("alias").text(tweet.user.handle);
  header.append(avatar,name,alias);

  let msg = $("<p></p>").addClass("msg").text(tweet.content.text);
  
  let footer = $("<footer></footer>").addClass("aux");
  
  let timestamp = $("<span></span>").addClass("timestamp").text(new Date(tweet.created_at).toDateString());
  footer.append(timestamp);
  //    <!-- border line, create icons. Use silk ones.-->

  return article.append(header,msg,footer);
}

const renderTweets = (arrTweets) => {
    $('#tweet-list').empty();
    for (let tweet of arrTweets){
      let $tweet = createTweetElement(tweet);
      $('#tweet-list').append($tweet);
    }
}

window.onload = function(){
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: "json",
      success: function(arrTweets){
        renderTweets(arrTweets.reverse());
      }
    });
  };
  loadTweets();
  $("#tweet-form").submit(ev => {
    ev.preventDefault();
  })
  $("#tweet-form input").click(ev => {
    let msg = $("#tweet-form textarea").val();
    $("#too-short, #too-long").removeClass("show");

    if (msg.length === 0) {
      $("#too-short").addClass("show");

    } else if (msg.length > 140) {
      $("#too-long").addClass("show");
      
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: {text:msg},
        success: function(){
          loadTweets();
        }
      });
      $("#tweet-form textarea").val("");
    }
  })
  $("#nav-bar .compose-btn").click(function(){
    $("section.new-tweet").slideToggle("slow");
    if ($("section.new-tweet").is(':visible')){
      $("section.new-tweet textarea").focus();
    }
  });
};