var id_number = -1;
var value = "calories";

function init(){
    $("#logout").hide();

    $("#amount").val(0);

    $("#logout").click(function() {
        FB.logout(function(response) {});
        id_number = -1;
        $("#logout").hide();
        $("#login").show();
        $("#name").html("");
    });

    $("#submit").click(function () {
        if (id_number == -1) {
            alert("Please Log In to Facebook");
        } else {
            console.log(value);
            console.log($("#amount").val());
            window.location.href="/progress";
        }
    });
    
    $("#amount").keyup(function(event) {
        if (event.which == 13) {
            if (id_number == -1) {
                alert("Please Log In to Facebook");
            } else {
                console.log(value);
                console.log($("#amount").val());
                window.location.href="/progress";
            }
        }
    });
}

function statusChange(response) {
    if (response.status == 'connected') {
        login_success();
    } else if (response.status == 'not_authorized') {
        alert("Please authorize this website.");
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChange(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '1712697512306795',
        cookie: true,
        xfbml: true,
        version: 'v2.5'
    });

    FB.getLoginStatus(function(response) {
        statusChange(response);
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

function login_success() {
    FB.api('/me', function(response) {
        id_number = response.id;
        $("#name").html(response.name);
        $('#login').hide();
        $("#logout").show();
    });
} 

function set_value(v) {
    value = v;
}