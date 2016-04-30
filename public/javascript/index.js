var id_number = -1;
var numbers = {};

function buttonListen(){
    $("#logout").hide();
    $("#servings").val(1);

    $("#logout").click(function() {
        FB.logout(function(response) {});
        id_number = -1;
        $("#logout").hide();
        $("#login").show();
        $("#name").html("");
    });

    $("#food_search").click(function() {
        numbers = {};
        if (id_number == -1) {
            $("#results").html("Please Log In to Facebook!");
        } else {
            search_string = $("#search-input").val();
            search_string = search_string.replace("%","%25");
        $.ajax({url: "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search_string + "&sort=r&max=250&offset=0&api_key=F3tkXI4IvcYIxiwOZMqUq0VK4ezF5FCaW7L2vWLU", success: function(result) {
              display_search_results(result);
        }});
    }});

    $("#search-input").keyup(function(event) {
        if (event.which == 13) {
            numbers = {};
            if (id_number == -1) {
                $("#results").html("Please Log In to Facebook");
            } else {
                search_string = $("#search-input").val();
                search_string = search_string.replace("%","%25");
                $.ajax({url: "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search_string + "&sort=r&max=250&offset=0&api_key=F3tkXI4IvcYIxiwOZMqUq0VK4ezF5FCaW7L2vWLU", statusCode: {0: function() {
                    $("#results").html("Sorry, no results. Please widen your search!");
                }, 404: function() {
                    $("#results").html("Sorry, no results. Please widen your search!");
                }},
                    success: function(result) {
                        display_search_results(result);
                    }
                });
            }
        }
    });

        $("#food-input").click(function() {
            if ($("#servings").val() < 0 || $("#servings").val() == "") {
                $("#servings").val() = 1;
            }
            if ($("#protein").val() < 0 || $("#protein").val() == "") {
                $("#protein").val() = 0;
            }
            if ($("#calories").val() < 0 || $("#calories").val() == "") {
                $("#calories").val() = 0;
            }
            if ($("#fat").val() < 0 || $("#fat").val() == "") {
                $("#fat").val() = 0;
            }
            if (id_number == -1) {
                $("#results").html("Please Log In to Facebook");
            }
            else {
                now = new Date();
                now = now.toString();
                protein = $("#protein").val() * $("#servings").val();
                fat = $("#fat").val() * $("#servings").val();
                calories = $("#calories").val() * $("#servings").val();
                $.ajax({type:"POST",url: "/submitFood",
                    failure: function (result) {
                        alert("Sorry, that didn't submit! Try again.");
                    },
                    data: "id=" + id_number+"&protein="+protein+"&fat="+fat+"&calories="+calories+""
                });
                window.location.href="/progress";
            }
        });
    }

       function display_search_results(result) {
          $("#search-input").val("");
          window.location.hash = "#results";
          all_results_str = "";
          for (i = 0; i < result.list.item.length; i++) {
              num = (result.list.item[i].ndbno).toString();
              numbers[i] = (num);
              all_results_str += "<a onclick = populate_info(" + i +") class='list-group-item'>" + result.list.item[i].name + "</a>";
          }
          $("#results").html(all_results_str);
          }

          function statusChange(response) {
          if (response.status == 'connected') {
              login_success();
          }
          else if (response.status == 'not_authorized') {
              $("#results").html("Please Log In to Facebook!");
          }
        }

        function checkLoginState() {
          FB.getLoginStatus(function(response) {
            statusChange(response);
          });
        }

        function populate_info(number) {
        console.log(number);
          numstring = (numbers[i]).toString();
          while (numstring.length < 5) {
              numstring = "0" + numstring;
          }
          window.location.hash = "#food-input-manual";
          $.ajax({url: "http://api.nal.usda.gov/ndb/reports/?ndbno=" + numstring + "&type=f&format=json&api_key=F3tkXI4IvcYIxiwOZMqUq0VK4ezF5FCaW7L2vWLU", success: function(result) {
                $("#food_name").val(result.report.food.name);
                $("#protein").val(result.report.food.nutrients[3].value);
                $("#calories").val(result.report.food.nutrients[1].value);
                $("#fat").val(result.report.food.nutrients[4].value);
                $("#serving-size").html("Serving Size: 100 g");
          }});
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
