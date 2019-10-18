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


$("#btn_search").click(function(e){
e.preventDefault();
$.ajax({
	url:"search/",
	type:"post",
	datatype:"json",
	data:$("#formid2").serialize(),
	
	success:function(data)
	{
		//$('#txt_cname').val("");		
		if(data.status)
		{
			
			$("#txt_qstn").val(data.val1);
			$("#txt_opt1").val(data.val2);
			$("#txt_opt2").val(data.val3);
			$("#txt_opt3").val(data.val4);
			$("#txt_opt4").val(data.val5);
			$("#txt_ans").val(data.val6);			
		}
		else
		{
			alert("Please enter Question number!");
		}
	},
	error:function()
	{
		alert("Connection Failed");
	}
	});
});


$("#btn_update").click(function(e){
e.preventDefault();
$.ajax({
	url:"editfn/",
	type:"post",
	datatype:"json",
	data:$("#formid2").serialize(),
	
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
			if(data.vall)
			{
			alert(data.val);
			}
			else
			{
			alert(" Data Updated Successfully");
			}	
			
		
		}
		else
		{
			alert("Please Input Some Values!");
		}
	},
	error:function()
	{
		alert("Connection Failed");
	}
	});
});

$("#btn_back").click(function(e){
e.preventDefault();
window.location.replace("../");
});


function changeColor(color) {
    $('#wrapper').removeClass();
    $('#wrapper').addClass(color);
}
