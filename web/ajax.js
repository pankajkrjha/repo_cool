
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
                        $("#panel-container").load(" #panel");
                    }
                }
        });
    });

    $("#question-container").on('click', '.option', function(){
        $.ajax({
                type: "POST",
                url: "/jeemain/save/",
                data: {'answer': $(".option:checked").val(), 'session_id': $('#session_id').val()},
                success: function(data){
                    if(data.success=="true"){
                        $("#panel-container").load(" #panel");
                    }
                }
        });
    });

    $('#save').click(function(){
        $.ajax({
                type: "POST",
                url: "/jeemain/save/",
                data: {'answer': $(".option:checked").val(), 'session_id': $('#session_id').val()},
                success: function(data){
                    if(data.success=="true"){
                        $("#panel-container").load(" #panel");
                    }
                }
        });
        $.ajax({
            type: "POST",
            url: "/jeemain/next/",
            data: {'session_id': $('#session_id').val()},
            success: function(data){
                if(data.success=="true"){
                    $("#question-container").load(" #question");
                    $("#panel-container").load(" #panel");
                }
            }
        });
    });

    $('#clear').click(function(){
        $.ajax({
                type: "POST",
                url: "/jeemain/clear/",
                data: {'session_id': $('#session_id').val()},
                success: function(data){
                    if(data.success=="true"){
                        if(data.success=="true"){
                            $("#question-container").load(" #question");
                            $("#panel-container").load(" #panel");
                        }
                    }
                }
        });
    });

    $('#mark').click(function(){
        $.ajax({
                type: "POST",
                url: "/jeemain/mark/",
                data: {'session_id': $('#session_id').val()},
                success: function(data){
                    if(data.success=="true"){
                        if(data.success=="true"){
                            $("#question-container").load(" #question");
                            $("#panel-container").load(" #panel");
                        }
                    }
                }
        });
        $.ajax({
            type: "POST",
            url: "/jeemain/next/",
            data: {'session_id': $('#session_id').val()},
            success: function(data){
                if(data.success=="true"){
                    $("#question-container").load(" #question");
                    $("#panel-container").load(" #panel");
                }
            }
        });
    });

    $('#skip').click(function(){
        $.ajax({
                type: "POST",
                url: "/jeemain/mark/",
                data: {'session_id': $('#session_id').val()},
                success: function(data){
                    if(data.success=="true"){
                        if(data.success=="true"){
                            $("#question-container").load(" #question");
                            $("#panel-container").load(" #panel");
                        }
                    }
                }
        });
        $.ajax({
            type: "POST",
            url: "/jeemain/next/",
            data: {'session_id': $('#session_id').val()},
            success: function(data){
                if(data.success=="true"){
                    $("#question-container").load(" #question");
                    $("#panel-container").load(" #panel");
                }
            }
        });
    });

     $("#submit").on("click", function(e) {
         var submit = confirm("Are you sure you want to submit?");
         if(submit){
            $.ajax({
                type: "POST",
                url: "/jeemain/submit/",
                data: {'session_id': $('#session_id').val()},
                success: function(data){
                    if(data.success=="true"){
                        window.location.replace('/jeemain/result/'+data.test_id);
                    }
                }
            });
        }
     });


});

    // setInterval(function(){
    //     var div=$('#time');
    //     var t = div.html().split(":");
    //     var seconds = ((parseInt(t[0][t[0].length-1])*3600+parseInt(t[1])*60+parseInt(t[2]))-1).toString();
    //     $.ajax({
    //             type: "POST",
    //             url: "/jeemain/update_time/",
    //             data: {'seconds': seconds},
    //             success: function(data){
    //                 if(data.success=="true")  div.load(" #time");
    //             }
    //     });
    // },10000);

