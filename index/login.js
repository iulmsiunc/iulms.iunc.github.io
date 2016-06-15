$(function() {
	$("#username").focus();
	$("a#forgot").click(function(e) {
		e.preventDefault()
		$("#signinbox").fadeOut(300).promise().done(function() {
			$("#forgotbox").fadeIn(500);
		});
	})
	$("a#signin").click(function(e) {
		e.preventDefault()
		$("#forgotbox").fadeOut(300).promise().done(function() {
			$("#signinbox").fadeIn(500);
		});
	});
});