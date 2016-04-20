var id_number = -1;

function init() {
    $("#logout").hide();

    $("#amount").val(0);

    $("#logout").click(function() {
        FB.logout(function(response) {});
        id_number = -1;
        $("#logout").hide();
        $("#login").show();
        $("#name").html("");
    });

    $("#submit").click(function() {
        if (id_number == -1) {
            alert("Please Log In to Facebook");
        } else {
            protein = $("#protein").val();
            if (protein == NaN || protein < 0) {
                protein = 0;
            }
            fat = $("#fat").val();
            if (fat == NaN || fat < 0) {
                fat = 0;
            }
            calories = $("#calories").val();
            if (calories == NaN || calories < 0) {
                calories = 0;
            }
            email = $("#email").val()
            $.ajax({
                type:"POST",
                data: "fb_id=" + id +"&email="+email+"&protein="+protein+"&fat="+fat+"&calories=" +calories,
                url: "/submitGoal",
                failure: function(result) {
                    alert("Sorry, that didn't submit! Try again.");
                }
            });
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
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
