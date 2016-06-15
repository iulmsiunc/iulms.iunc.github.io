$(function() {
	function ViewStudentAttendance(courseInfo) {
		$.post("../sic/SICDataService.php", {action: "GetStudentAttendaceDetails", secCourseCode: $('#course').val()},
		function (data) {
			var serialno = 1;
			var present = 0;
			var absent = 0;
			for (var i = 0; i < data.length; i++) {
				if (data[i] == "P") {
					present++;
				} else {
					absent++;
				}
			}
			if(absent > 7) {
				$("textarea#application").attr("disabled", true).val("You have "+absent+" absents in this course. You cannot withdraw courses with more than 7 absents. Please contact student affairs for more information.");
				$("#newapplication form input[type=submit]").attr('disabled', true);
			}
			/* $('#nofabsense').html("Note: Number of absences in course = <b>" + absent + "</b> ");
			$('#absences').val(absent); */
		}
		, "json");
	}
	function GetCourseInfo() {
		if ($('#course').val() != -1 && $("select#subject").val() == '16') {
			$.post("../sic/SICDataService.php", {action: "GetCourseInfo", secCourseCode: $('#course').val()
		}, function (data) {
				ViewStudentAttendance(data);
			}, "json");
		}
	}
	$(".application.new select#subject").change(function() {
		if($(this).val() == 15) {
			$.featherlight("#coursedrop");
		}
		if($(this).val() == 16) {
			$.featherlight("#coursewithdrawal");
		}
		if($(this).val() == 15 || $(this).val() == 16) {
			$(".application.new #courselist").slideDown();
			$(".application.new #courselist select").prop('disabled', false);
			$(".application.new #semesterlist").slideUp();
			$(".application.new #semesterlist select").prop('disabled', true);
		} else if($(this).val() == 17) {
			$(".application.new #semesterlist").slideDown();
			$(".application.new #semesterlist select").prop('disabled', false);
			$(".application.new #courselist").slideUp();
			$(".application.new #courselist select").prop('disabled', true);
			$.featherlight("#semesterwithdrawal");
		} else {
			$(".application.new #courselist, .application.new #semesterlist").slideUp();
			$(".application.new #courselist select, .application.new #semesterlist select").prop('disabled', true);
		}
	});
	$("select#course").change(function() {
		GetCourseInfo();
	});
});