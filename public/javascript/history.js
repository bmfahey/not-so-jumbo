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

    //google api

    //google.charts.load('current', {'packages':['line']});
    //google.charts.setOnLoadCallback(drawChart);
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

        $.ajax({
	    	type: "POST",
	    	data: "fb_id=" + id_number,
	    	url: "/submitHistory",
	    	dataType: "json",
	    	failure: function(result) {
	    		alert("Sorry, this did not process!");
	    	},
	    	success: function(result) {
	    		alert(result);
	    		//if (result) {
		    		//requestData = JSON.parse(result);
		    		console.log(result);
		    		//console.log(requestData);
		    		google.charts.load('current', {'packages':['line']});
	    			google.charts.setOnLoadCallback(function(){ drawChart(result) });
	    		//}
	    	}
	   	});
    });
}

function drawChart(result) {

      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Day');
      data.addColumn('number', 'Fat');

      data.addRows([
        ["Sun", result["days"][0].fat],
        ["Mon", result["days"][1].fat],
        ["Tues", result["days"][2].fat],
        ["Wed", result["days"][3].fat],
        ["Thurs", result["days"][4].fat],
        ["Fri", result["days"][5].fat],
        ["Sat", result["days"][6].fat]
      ]);

      var options = {
        chart: {
          title: 'Fat Consumed in this week',
          subtitle: 'in grams (g)'
        },
        width: 900,
        height: 500,
        series: {
          0: {axis: "Fat"},
        },
        axes: {
          y: {
            Fat: {label: "Fat (g)"},
          }
        },
      };

      var chart = new google.charts.Line(document.getElementById('fat_chart'));

      chart.draw(data, options);
}