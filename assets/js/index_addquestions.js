$(document).ready(function() {
    $("#panel-admin").css("display", "none");

    $('.open').click(function() {
        $("#panel-admin").animate({ width: 'toggle' }, 100);
    });

    if (!document.getElementById('wrapper').className && !localStorage.getItem("selectedColor")) {
        console.log('in if');
        document.getElementById('wrapper').classList.add('blue');
    } else {
        console.log('else');
        var colorClass = localStorage.getItem("selectedColor");
        document.getElementById('wrapper').classList.add(colorClass);
    }


    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);

});


$(window).scroll(function() {

    if ($(this).scrollTop() > 50) {
        $('header').addClass("sticky");
    } else {
        $('header').removeClass("sticky");
    }
});


function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('fa-plus fa-minus');
}

function mytheme(index) {
    switch (index) {
        case 0:
            changeColor('cyan');
            break;
        case 1:
            changeColor('orange');
            break;
        case 2:
            changeColor('lightgreen');
            break;
        case 3:
            changeColor('red');
            break;
        case 4:
            changeColor('green');
            break;
        case 5:
            changeColor('blue');
            break;
        default:
            changeColor('blue');
    }
    var selectedClass = document.getElementById('wrapper').className;
    localStorage.setItem("selectedColor", selectedClass);
}

function changeColor(color) {
    $('#wrapper').removeClass();
    $('#wrapper').addClass(color);
}

$.ajaxSetup({
     beforeSend: function(xhr, settings) {
         function getCookie(name) {
             var cookieValue = null;
             if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                     var cookie = jQuery.trim(cookies[i]);
                     // Does this cookie string begin with the name we want?
                     if (cookie.substring(0, name.length + 1) == (name +'=')) {
                         cookieValue =decodeURIComponent(cookie.substring(name.length + 1));
                         break;
                     }
                 }
             }
             return cookieValue;
         }
         if (!(/^http:.*/.test(settings.url) ||
/^https:.*/.test(settings.url))) {
             // Only send the token to relative URLs i.e. locally.
             xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
         }
     }
});

$("#btn_submit").click(function(e){
//alert("ajax");
e.preventDefault();
$.ajax({
	url:"addfn/",
	type:"post",
	datatype:"json",
	data:$("#formid1").serialize(),
	
	success:function(data)
	{	

		$("#txt_qstn").val("");
		$("#txt_opt1").val("");
		$("#txt_opt2").val("");
		$("#txt_opt3").val("");
		$("#txt_opt4").val("");
		$("#txt_ans").val("");	

		if(data.status)
		{
			//alert(data.val2)
			if(data.val1)
			{
			alert(data.val1);
			}
			if(data.val2)
			{
			alert(data.val2);
			}
			if(data.val3)
			{			
			alert(data.val3);
			}
			
		}
		else
		{
		alert("Please Input Some Values!");
		//window.location.replace("currentleave");	
	
		}
	},
	error:function()
	{
	alert("Connection Failed");
	}
	});
});

$("#btn_exit").click(function(e){
e.preventDefault();
window.location.replace("../../Home/");
});


$("#btn_edit").click(function(e){
e.preventDefault();
window.location.replace("edit questions/");
});

$("#btn_view").click(function(e){
e.preventDefault();
window.location.replace("view total/");
});
