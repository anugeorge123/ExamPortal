$(document).ready(function() {
    alert("Doc Ready");
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



$("#btn_start").click(function(e){
	e.preventDefault();
	alert("haiiii");
	for(i=1; i <=4; i++) 
	{			
		for(j=1;j<=10;j++)
		{		
			document.getElementById("opt"+j+"."+i).innerHTML = "<input type=\"radio\" name=\"option"+j+"\" value=\"option"+i+"\" id=\"option"+j+"."+i+"\">";

		}

	}
	$.ajax({
		url:"viewfn/",
		type:"post",
		datatype:"json",
		data:$("#formid").serialize(),	
		success:function(data)
		{
			if(data.status)
			{
				$("#textarea1").val("1. "+data.val[0]);
				$("#textarea2").val("2. "+data.val[1]);
				$("#textarea3").val("3. "+data.val[2]);
				$("#textarea4").val("4. "+data.val[3]);
				$("#textarea5").val("5. "+data.val[4]);
				$("#textarea6").val("6. "+data.val[5]);
				$("#textarea7").val("7. "+data.val[6]);
				$("#textarea8").val("8. "+data.val[7]);
				$("#textarea9").val("9. "+data.val[8]);
				$("#textarea10").val("10. "+data.val[9]);
				
				str="opt";
				for(i=1; i <=10; i++) 
				{			
					document.getElementById(str+i+".1").append(data.val1[i-1].opt1);
					document.getElementById(str+i+".2").append(data.val1[i-1].opt2);
					document.getElementById(str+i+".3").append(data.val1[i-1].opt3);
					document.getElementById(str+i+".4").append(data.val1[i-1].opt4);
		
				}	
		
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
