$(function () {

	getQuote();

	$('.trigger').click(function () {
		getQuote();
	});

	function getQuote() {

		var $quote = $('.quote');
		var $author = $('.author');

		var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
		var tweetLink = "https://twitter.com/intent/tweet?text=";

		$.ajax({
				type: "GET",
				dataType: "json",
				url: quoteUrl
			})
			.done(function (jqXHR) {
				createTweet(jqXHR);
			});


		function createTweet(response) {

			var data = response[0];

			var quoteText = $(data.content).text().trim();
			var quoteAuthor = data.title;

			if (!quoteAuthor.length) {
				quoteAuthor = "Unkhnow author";
			}

			var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

			if (tweetText.length > 140) {
				getQuote();
			} else {
				var tweet = tweetLink + encodeURIComponent(tweetText);
				$('.tweet').attr('href', tweet);
				$quote.text(quoteText);
				$author.text(quoteAuthor);
			}

		}
	}

}());
