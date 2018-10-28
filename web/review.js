
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (settings.type == 'POST' || settings.type == 'PUT' || settings.type == 'DELETE') {
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
            }
        }
    }
});

$(document).ready(function(){

    $('#previous').click(function(){
    $.ajax({
            type: "POST",
            url: "/jeemain/previous/",
            data: {'session_id': $('#session_id').val()},
            success: function(data){
                if(data.success=="true"){
                    $("#question-container").load(" #question");
                    $("#answer-container").load(" #answer");
                    $("#panel-container").load(" #panel");
                }
            }
        });
    });

    $('#next').click(function(){
        $.ajax({
                type: "POST",
                url: "/jeemain/next/",
                data: {'session_id': $('#session_id').val()},             
                success: function(data){
                    if(data.success=="true"){
                        $("#question-container").load(" #question");
                        $("#answer-container").load(" #answer");
                        $("#panel-container").load(" #panel");
                    }
                }
        });
    });

    $("#panel-container").on('click', '.change', function(e){
        var div = $(e.target);
        $.ajax({
                type: "POST",
                url: "/jeemain/change/",
                data: {'question_position': div.html(), 'session_id': $('#session_id').val()},
                success: function(data){
                    if(data.success=="true"){
                        $("#question-container").load(" #question");
                        $("#answer-container").load(" #answer");
                        $("#panel-container").load(" #panel");
                    }
                }
        });

    });

});

