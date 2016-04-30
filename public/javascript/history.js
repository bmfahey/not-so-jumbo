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
		    	google.charts.load('current', {'packages':['line']});
	    		google.charts.setOnLoadCallback(function(){ drawChart(result) });
	    	}
	   	});
    });
}

function drawChart(result) {

      var dataFat = new google.visualization.DataTable();
      dataFat.addColumn('string', 'Day');
      dataFat.addColumn('number', 'Fat');

      dataFat.addRows([
        ["Sun", result[0].days[0].fat],
        ["Mon", result[0].days[1].fat],
        ["Tues", result[0].days[2].fat],
        ["Wed", result[0].days[3].fat],
        ["Thurs", result[0].days[4].fat],
        ["Fri", result[0].days[5].fat],
        ["Sat", result[0].days[6].fat]
      ]);

      var optionsFat = {
        chart: {
          title: 'Fat Consumed in this week',
          subtitle: 'in grams (g)'
        },
        series: {
          0: {axis: "Fat"},
        },
        axes: {
          y: {
            Fat: {label: "Fat (g)"},
          }
        },
      };

      var dataProtein = new google.visualization.DataTable();
      dataProtein.addColumn('string', 'Day');
      dataProtein.addColumn('number', 'Protein');

      dataProtein.addRows([
        ["Sun", result[0].days[0].protein],
        ["Mon", result[0].days[1].protein],
        ["Tues", result[0].days[2].protein],
        ["Wed", result[0].days[3].protein],
        ["Thurs", result[0].days[4].protein],
        ["Fri", result[0].days[5].protein],
        ["Sat", result[0].days[6].protein]
      ]);

      var optionsProtein = {
        chart: {
          title: 'Protein Consumed in this week',
          subtitle: 'in grams (g)'
        },
        series: {
          0: {axis: "Protein"},
        },
        axes: {
          y: {
            Protein: {label: "Protein (g)"},
          }
        },
      };

      var dataCal = new google.visualization.DataTable();
      dataCal.addColumn('string', 'Day');
      dataCal.addColumn('number', 'Calories');

      dataCal.addRows([
        ["Sun", result[0].days[0].calories],
        ["Mon", result[0].days[1].calories],
        ["Tues", result[0].days[2].calories],
        ["Wed", result[0].days[3].calories],
        ["Thurs", result[0].days[4].calories],
        ["Fri", result[0].days[5].calories],
        ["Sat", result[0].days[6].calories]
      ]);

      var optionsCal = {
        chart: {
          title: 'Calories Consumed in this week',
          subtitle: 'in Calorie (C)'
        },
        series: {
          0: {axis: "Calorie"},
        },
        axes: {
          y: {
            Calorie: {label: "Calorie(C)"},
          }
        },
      };

      var chart = new google.charts.Line(document.getElementById('fat_chart'));
	  chart.draw(dataFat, optionsFat);
	  var chart = new google.charts.Line(document.getElementById('prot_chart'));
	  chart.draw(dataProtein, optionsProtein);
	  var chart = new google.charts.Line(document.getElementById('cal_chart'));
	  chart.draw(dataCal, optionsCal);
}