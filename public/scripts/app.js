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
  let icons = $("<span></span>").addClass("icons").text('⚑ 🔁 ❤');
  footer.append(timestamp, icons);
  
  return article.append(header,msg,footer);
}

const renderTweets = (arrTweets) => {
    $('#tweet-list').empty();
    
    // Tweets rendered one by one
    for (let tweet of arrTweets){
      let $tweet = createTweetElement(tweet);
      $('#tweet-list').append($tweet);
    }
}

window.onload = function(){

  // Tweets loaded via this function
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
  });
        
  // Posts tweet based on input if 
  $("#tweet-form input").click(ev => {
    let msg = $("#tweet-form textarea").val();
    //let trimMsg = msg.trim();
    $("#too-short, #too-long, #all-spaces").removeClass("show");

    // Verifies that the field
    if (msg.length === 0) {
      $("#too-short").addClass("show");
    } else if (msg.trim().length === 0){
      $("#all-spaces").addClass("show");
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