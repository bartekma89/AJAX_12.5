$(function () {

	getQuote();

	$('.trigger').click(function () {
		getQuote();
	});

	function getQuote() {

		var $quote = $('.text__quote');
		var $author = $('.text__author');

		var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
		var tweetLink = "https://twitter.com/intent/tweet?text=";

		$.ajax({
			type: 'GET',
			url: quoteUrl,
			dataType: 'json'
		}).done(function (jqXHR) {
			createTweet(jqXHR);
		});

		function createTweet(response) {
			var data = response[0];

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
			}

		}
	}

}());