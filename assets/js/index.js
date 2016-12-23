/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
    "use strict";

    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        $(".scroll-down").arctic_scroll();

        $(".menu-button, .nav-cover, .nav-close").on("click", function(e){
            e.preventDefault();
            $("body").toggleClass("nav-opened nav-closed");
        });

    });
//Function for Easter bug
console.log("Hi there! Welcome to BLUESCREEN.CLUB");
console.log("blscr\(\"Your query\"\)");

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery);



//BLUESCREEN CHAT AGENT RIGHT HERE

var accessToken = "373956f891b94397a092ee78dea46ff4",
    baseUrl = "https://api.api.ai/v1/",
    $speechInput,
    $recBtn,
    recognition,
    messageRecording = "Recording...",
    messageCouldntHear = "I couldn't hear you, could you say that again?",
    messageInternalError = "Oh no, there has been an internal server error",
    messageSorry = "I'm sorry, I don't have the answer to that yet.";
//BLUESCREEN CHAT AGENT RIGHT HERE
function blscr(text) {
  $.ajax({
    type: "POST",
    url: baseUrl + "query",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({query: text, lang: "en", sessionId: "runbarry"}),

    success: function(data) {
      prepareResponse(data);
    },
    error: function() {
      respond(messageInternalError);
    }
  });
}

function prepareResponse(val) {
  var debugJSON = JSON.stringify(val, undefined, 2),
      spokenResponse = val.result.speech;
      if(val.result["action"]=="input.unknown")
      {
      goToStack(val.result["resolvedQuery"]);
    }
      else if (val.result.metadata["intentName"]=="can you give me a programming question")
      {generateQuestion();}

    else{
    console.log(spokenResponse);
    if (val.result.metadata["intentName"]=="stackoverflow")
    {goToStack(val.result["resolvedQuery"]);}
      }
 }



function generateQuestion()
{ var theurl='http://codeforces.com/problemset/problem/';

   $.ajax({
    type: "GET",
    url: 'http://codeforces.com/api/problemset.recentStatus?count=1',

    dataType: "json",
    success: function(data) {
      theurl+=(data.result[0]["problem"]["contestId"])+"/"+data.result[0]["problem"]["index"];
      console.log(theurl);
    },
    error: function() {
      respond(messageInternalError);
    }
  });
}
function goToStack(query1)
{
  var baseurl='https://stackoverflow.com/search?q=';
  var res = query1.replace(/ /gi, "+");
  console.log(baseurl+res);
}
