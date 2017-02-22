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
    for (let tweet of arrTweets){
      let $tweet = createTweetElement(tweet);
      $('#tweet-list').append($tweet);
    }
}

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

window.onload = function(){renderTweets(data)};
// $(() => {
//  // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// 	renderTweets(data);
// });


// Define another function renderTweets in the same file. This function can be responsible for taking in an array of tweet objects
// and then appending each one to the #tweets-container. In order to do this, the renderTweets will need to leverage the 
// createTweetElement function you wrote earlier by passing to it the tweet object, using the returned jQuery object by appending it 
// to the #tweets-container section.

// By the end of this task, your app.js will look something like this:


// Test / driver code (temporary). Eventually will get this from the server.

// $(() => {
//     var $tweet = createTweetElement(tweetData);
//     // to add it to the page so we can make sure it's got all the right elements, classes, etc.
// 	$('#tweet-list').append($tweet);
// });