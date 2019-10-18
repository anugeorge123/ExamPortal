$(document).ready(function() {
   // alert("Doc Ready");
    $("#panel-admin").css("display", "none");

    $('.open').click(function() {
        $("#panel-admin").animate({ width: 'toggle' }, 100);
    });

    if (!document.getElementById('wrapper').className && !localStorage.getItem("selectedColor")) {
        console.log('in if');
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

$("#btn_start").click(function(e){
	e.preventDefault();
	
	//alert("haiiii");
	$.ajax({
		url:"viewfn/",
		type:"post",
		datatype:"json",
		data:$("#formid").serialize(),	
		success:function(data)
		{
		//alert("inside view");

		if(data.status)
			{
				//$("#div").val(data.val1);
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


$("#btn_submit").click(function(e){
	alert("btn submit");
	e.preventDefault();
	$.ajax({
		url:"check/",
		type:"post",
		datatype:"json",
		data:$("#div").serialize(),	
		success:function(data)
		{
			if(data.status)
			{
				alert("Are you sure you want to submit the Test now?");
				if(data.val)
				{
					alert("Exam Completed");
					window.location.replace("result/")
				}
			}
			else
			{
				if(data.val1)
				{	
					alert(data.val1);
				}
				else
				{
					alert("Failed to receive");
				}
			}
		},
		error:function()
		{
			alert("Connection Failed");
		}
	});
});

