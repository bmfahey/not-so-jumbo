var id_number = -1;

function init(){
    $("#logout").hide();

    $("#logout").click(function() {
        FB.logout(function(response) {});
        id_number = -1;
        $("#logout").hide();
        $("#login").show();
        $("#name").html("");
    });

    $.ajax({
        type:"POST",
        data: "id=" + id_number,
        url: "/sendProgress",
        failure: function(result) {
            alert("Sorry, that didn't submit! Try again.");
        },
        success: function(response) {
            //var result = JSON.parse(response);
            var result = response;
            var fat = result.fat;
            var protein = result.protein;
            var calories = result.calories;
            $("#fatprog").progressbar({value:50});
            $("#fatprog").val(50);
            $("#fatprog").css('width',"50%");
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
