$(document).ready(function() {
    $("#panel-admin").css("display", "none");

    $('.open').click(function() {
        $("#panel-admin").animate({ width: 'toggle' }, 100);
    });

    if (!document.getElementById('wrapper').className && !localStorage.getItem("selectedColor")) {
      //console.log('in if');
        document.getElementById('wrapper').classList.add('blue');
    } else {
        //console.log('else');
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
e.preventDefault();
$.ajax({
	url:"resultfinal/",
	type:"post",
	datatype:"json",
	data:$("#formid").serialize(),
	success:function(data)
	{
		
		
		if(data.status)
		{
			
			$("#txt_mark").val(data.val);
		}
		else
		{
		
			alert("Failed to receive");
		}
	},
	error:function()
	{
	alert("Connection Failed");
	}
	});
});

$("#btn_check").click(function(e){
e.preventDefault();

$.ajax({
	url:"result/viewfn/",
	type:"post",
	datatype:"json",
	data:$("#formid").serialize(),
	
	success:function(data)
	{
		if(data.status)
		{
			document.getElementById('div').innerHTML=data.val1;
		
		}
		else
		{
			alert("Failed to receive");
		}
	},
	error:function()
	{
	alert("Connection Failed");
	}
	});
});

