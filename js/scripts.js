$(function ($) {

	getQuote();

	var $loader = $('#loader').hide();

	$(document).ajaxStart(function () {
			if ($('.text h2').hasClass('text__quote')) {
				$('.text__quote').remove();
			}
			if ($('.text h3').hasClass('text__author')) {
				$('.text__author').remove();
			}
			$loader.show();
		})
		.ajaxStop(function () {
			$loader.hide();
		});

	$('.trigger').click(function () {
		getQuote();
		$('#loader__icon').addClass('loader');
	});

	function getQuote() {

		var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
		var tweetLink = "https://twitter.com/intent/tweet?text=";
		var prefix = "https://cors-anywhere.herokuapp.com/";

		$.ajaxSetup({
			cache: false
		});
		
		$.ajax({
			type: 'GET',
			url: prefix + quoteUrl,
			dataType: 'json'
		}).done(function (jqXHR) {
			createTweet(jqXHR);
		}).fail(function() {
			var errorInfo = "Sorry, we can't load quote";
			$('#error').remove();
			$('.text').append('<div id="error">' + errorInfo + '</div>');
		});

		function createTweet(response) {
			var data = response[0];

			var $quote = $('<h2 class="text__quote"></h2>');
			var $author = $('<h3 class="text__author"></h3>');

			var quoteText = $(data.content).text().trim();
			var authorText = data.title;

			if (!authorText.length) authorText = "Unknow author";

			var authorTweet = " Author: " + authorText;
			var tweetText = "Quote of the day: " + quoteText + authorTweet;

			if (tweetText.length > 140) {
				getQuote();
			} else {
				var tweet = tweetLink + encodeURIComponent(tweetText);
				$quote.text(quoteText);
				$author.text(authorTweet);
				$('.tweet').attr('href', tweet);
				$('.text').append($quote).append($author);
			}

		}
	}

}(jQuery));
