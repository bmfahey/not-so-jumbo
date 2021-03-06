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

        $.ajax({
            type:"POST",
            data: "id=" + id_number,
            url: "/sendProgress",
            failure: function(result) {
                alert("Sorry, that didn't submit! Try again.");
            },
            success: function(result) {
                if (result == {} || result.fat_goal == "") {
                    if (id_number == -1) {
                        $("#goal-display").val("Please login to Facebook.");
                    }
                    else {
                        $("#goal-display").val("Please make sure you have set a goal.");
                    }
                    return;
                }
                var fat = parseInt(parseFloat(result.fat) * 100);
                var protein = parseInt(parseFloat(result.protein) * 100);
                var calories = parseInt(parseFloat(result.calories) * 100);
                $("#fatprog").html(fat+"%");
                if (fat > 100) {
                    fat = 100;
                }
                $("#fatprog").css('width',fat+"%");
                $("#proprog").html(protein+"%");
                if (protein > 100) {
                    protein = 100;
                }
                $("#proprog").css('width',protein+"%");
                $("#calprog").html(calories+"%");
                if (calories > 100) {
                    calories = 100;
                }
                $("#calprog").css('width',calories+"%");
                var fat_goal = result.fat_goal;
                var protein_goal = result.pro_goal;
                var calories_goal = result.cal_goal;
                $("#goal-display").val("Calories: " + calories_goal + "C     Protein: " + protein_goal + "g     Fat: " + fat_goal + "g");
            }
        });
    });
}
