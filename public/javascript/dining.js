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
    }
    else if (response.status == 'not_authorized') {
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
} (document, 'script', 'facebook-jssdk'));

function login_success() {
    FB.api('/me', function(response) {
        id_number = response.id;
        $("#name").html(response.name);
        $('#login').hide();
        $("#logout").show();
    });

    display_dining();
}

function display_dining()
{
    var time = new Date();
    var day = time.getDate(); 
    var month = time.getMonth()+1;
    output = '';
    //Dewick
    $.get("https://tuftsdiningdata.herokuapp.com/menus/dewick/"+day+"/"+month+"/"+2016, function(data){
                for (key in data.data.Breakfast)
                {
                    output += "<h3>"+key+"</h3><ul>";
                    for(j=0; j<data["data"]["Breakfast"][key].length; j++)
                    {
                        output += "<li>"+data["data"]["Breakfast"][key][j]+"</li>";
                    }
                    output += "</ul>";
                }
                for (key in data.data.Lunch)
                {
                    output += "<h3>"+key+"</h3><ul>";
                    for(j=0; j<data["data"]["Lunch"][key].length; j++)
                    {
                        output += "<li>"+data["data"]["Lunch"][key][j]+"</li>";
                    }
                    output += "</ul>";
                }
                for (key in data.data.Dinner)
                {
                    output += "<h3>"+key+"</h3><ul>";
                    for(j=0; j<data["data"]["Dinner"][key].length; j++)
                    {
                        output += "<li>"+data["data"]["Dinner"][key][j]+"</li>";
                    }
                    output += "</ul>";
                }
                $('#dewick_box').html(output);

    })
}