$(function() {
	$("table tr").each(function() {
		if($(this).is("[href]")) {
			$(this).find("td:not(.nolink)").wrapInner(function() {
				$padding = $(this).css('padding-top') + ' ' + $(this).css('padding-right') + ' ' + $(this).css('padding-bottom') + ' ' + $(this).css('padding-left');
				return "<a style='padding: " + $padding + "' href='" + $(this).parent().attr("href") + "'></a>";
			});
			$(this).find("td").css("padding", 0);
		}
		if($(this).is("[data-featherlight]")) {
			$(this).find("a").attr({"data-featherlight": $(this).attr("data-featherlight")});
		}
		$(this).removeAttr("data-featherlight href");
	});
	function tickOut() {
		$('#newsticker ul li:first').animate({'opacity': 0}, 1000, function() {
			$(this).appendTo($('#newsticker ul')).css('opacity', 1);
		});
	}
	
	$.fn.textWidth = function(text, font) {
		if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
		$.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
		return $.fn.textWidth.fakeEl.width();
	};
	
	if($("#leftmenu p.name").textWidth() > 270) {
		$("#leftmenu p.name").addClass("long")
	}
	
	setInterval(function() {
		tickOut()
	}, 5000);
	$('a[href="#"]').click(function(e){
		e.preventDefault();
	});
	// #leftmenu's dropdown. LI must have .submenu to work
	$("#notifications .submenu a:first-child").click(function() {
		$(this).parent().find(">:first-child").toggleClass("open");
		$("#notifications ul.opened").parent().find("a.open").toggleClass("open");
		$("#notifications ul.opened").not($(this).parent().find("ul")).stop().toggleClass("opened").hide();
		$(this).parent().find("ul").stop().toggleClass("opened").fadeToggle(250);
	});
	$("#leftmenu .submenu a:first-child").click(function() {
		$(this).parent().find(">:first-child").toggleClass("open");
		$(this).parent().find("ul").stop().slideToggle(300);
	});
	$("#leftmenu .submenu a.active").parent().find("ul").show();
	
	
	$("a#studentinfo").click(function() {
		$(this).toggleClass("open");
		$("#studentdetails").slideToggle(500);
	});
	
	
	// Left menu input corresponds with sub items with same class
	function menuInputAppend() {
		$(".menu ul li input[type=text]").keyup(function() {
			$menuVal = $(this).val();
			$menuName = "?"+$(this).attr("name")+"=";
			$(".menu a[href*='"+$menuName+"']").each(function() {
				$fullLink = $(this).attr('href');
				$partialLink = $fullLink.substring(0, $fullLink.indexOf('?'));
				$newLink = $partialLink + $menuName + $menuVal;
				$(this).attr('href', $newLink);
			});
		});
	}
	menuInputAppend();
	var today = new Date().getDay() - 1;
	$(".table-tabs").tabs({active: today});
	$(".warning").click(function() {
		$(this).parent().find(".red").stop().css({"background-color": "#EAA297"}).animate({backgroundColor: "#FAE8E4"}, 300);
		$(this).parent().find(".yellow").stop().css({"background-color": "#FFD595"}).animate({backgroundColor: "#FFF0D9"}, 300);
	});
	$(".notification").prepend("<img class='noti-close' src='../images/noti-close.png' alt='Dismiss' />");
	$(".notification .noti-close").click(function() {
		$(this).parent().fadeTo(200, 0.0, function() {
			$(this).slideUp( function() {
				$(this).remove();
			});
		});
	});
	$(".notification.gray").delay(700).animate({backgroundColor: "#C1C1C1"}, 100).animate({backgroundColor: "#F3F3F3"}, 200);
	$(".notification.red").delay(700).animate({backgroundColor: "#EAA297"}, 100).animate({backgroundColor: "#FAE8E4"}, 200);
	$(".notification.blue").delay(700).animate({backgroundColor: "#A6CEF7"}, 100).animate({backgroundColor: "#ECF5FD"}, 200);
	$(".notification.green").delay(700).animate({backgroundColor: "#89EFC1"}, 100).animate({backgroundColor: "#E2FCF0"}, 200);
	$(".notification.yellow").delay(700).animate({backgroundColor: "#FFD595"}, 100).animate({backgroundColor: "#FFF0D9"}, 200);
	
	
	
	$('.slideshow img:gt(0)').hide();
	setInterval(function(){
		$('.slideshow :first-child').fadeOut(500, function() {
			$(this).appendTo('.slideshow');
			$('.slideshow :first-child').fadeIn();
		});
	}, 5000);
	
	/* $( ".slideshow" )
  .mouseover(function() {
 
  })
  .mouseout(function() {
    	
  }); */
	
	function tickerHeight() {
		if ($(window).width() > 1800) {
			var tickerItems = 5;
		}
		else if ($(window).width() > 1500) {
			var tickerItems = 4;
		}
		else if ($(window).width() > 1100) {
			var tickerItems = 2;
		}
		else {
			var tickerItems = 3;
		}
		if ($(".vticker").length>0) {
		$('.vticker').vTicker('init', {
			speed: 1000, 
			pause: 3000,
			showItems: tickerItems,
			padding:4
		});
		return false;
		}
	}
	tickerHeight();
	if ($("textarea").length>0) {
		$("textarea:not(.simple)").jqte({
			"source": false,
			"indent": false,
			"outdent": false,
			"sub": false,
			"sup": false,
			"strike": false,
			"rule": false
		});
	}
	$(window).resize(function() {
		tickerHeight();
	});
	$('.box:not(.slideshow)').matchHeight();
	$(".collapsed").hide();
	$(".boxpad.collapse").parent().addClass("open");
	$(".collapse").find("h3").click(function() {
		$(this).parent().find(".collapsed").stop().slideToggle();
		$(this).toggleClass("open");
		$(this).parent().parent().toggleClass("open");
	})
	$("a.collapse").click(function() {
		var coltab = $(this).attr("id");
		$("div#"+coltab).slideToggle().parent().parent().toggleClass("open");
	})
	if(window.location.hash) {
		var hash = window.location.hash.substring(1);
		$("div#"+hash).slideDown().parent().parent().toggleClass("open");
	}
	function expandall() {
		$(this).toggleClass("plus").toggleClass("minus");
		$(".collapsed").stop().slideDown();
		$(".collapse h3").addClass("open").parent().parent().removeClass("open");
		$(this).one("click", collapseall);
	}
	function collapseall() {
		$(this).toggleClass("plus").toggleClass("minus");
		$(".collapsed").stop().slideUp();
		$(".collapse h3").removeClass("open").parent().parent().addClass("open");
		$(this).one("click", expandall);
	}
	$(".expand-all.plus").one("click", expandall);
	$("#notifications li:has('span.notis') a:first-child").css("padding-right", 15);
	$(".circledp img").error(function () {
		$(this).hide();
	});
	$('table.directory, table.wholly, table.whollyh').wholly({
		highlightHorizontal: 'hover'
	});
	$('table.whollyv').wholly({
		highlightVertical: 'hover'
	});
	$('input#find').keyup(function(){
		$findval = $(this).val();
		$('.boxpad').find
	})
	$(".hide-on-click").click(function() {
		$(this).hide();
	});
	function star() {
		$('input.star:checked').closest("td").addClass("checked");
		$('input.star:not(:checked)').closest("td").removeClass("checked");
	}
	star();
	$('input.star').change(function(){
		star();
	});
	$('table.evalfi input').change(function(){
		$('table.evalfi input:checked').closest("td").addClass("checked");
		$('table.evalfi input:not(:checked)').closest("td").removeClass("checked");
	});
	$('label.button input').change(function() {
		$('label.button input:checked').closest("label").addClass("checked");
		$('label.button input:not(:checked)').closest("label").removeClass("checked");
	});
	$dpWidth = $(".circledp img").width();
	$dpHeight = $(".circledp img").height();
	if($dpWidth > $dpHeight) {
		$(".circledp img").css({"height": "100%", "width": "auto"});
	}
});