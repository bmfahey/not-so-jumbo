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
            $("#search-input").val("");
            if (search_string.toUpperCase().replace(/ /g, "") == "COMMONMEALS") {
                $.ajax({url: "/tuftsSuggestions" , success: function(res) {
                    result = JSON.parse(res);
                    window.location.hash = "#results";
                    all_results_str = "";
                    for (key in result) {
                        name = key;
                        calories = result[key].calories;
                        fat = result[key].fat;
                        protein = result[key].protein;
                        serv = result[key].serving_size;
                        all_results_str += "<a onclick = populate_info_dining("+name+","+calories+","+fat+","+protein+","+serv+") class='list-group-item'>" + name + "</a>";
                    }
                    $("#results").html(all_results_str);
                }});
            }
            else {
                search_string = search_string.replace("%","%25");
                $.ajax({url: "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search_string + "&sort=r&max=250&offset=0&api_key=F3tkXI4IvcYIxiwOZMqUq0VK4ezF5FCaW7L2vWLU", success: function(result) {
                    display_search_results(result);
                }
                });
            }
        }});

    $("#search-input").keyup(function(event) {
        if (event.which == 13) {
            numbers = {};
            if (id_number == -1) {
                $("#results").html("Please Log In to Facebook");
            } else {
                search_string = $("#search-input").val();
                $("#search-input").val("");
                if (search_string.toUpperCase().replace(/ /g, "") == "COMMONMEALS") {
                    $.get("/tuftsSuggestions" , function(result) {
                        result = JSON.parse(result);
                        window.location.hash = "#results";
                        all_results_str = "";
                        for (key in result) {
                            console.log("entered for loop");
                            name = "'" + key.toString().replace(/ /g,'_') + "'";
                            calories = result[key].calories;
                            fat = result[key].fat;
                            protein = result[key].protein;
                            serv = "'" + (result[key].serving_size).toString().replace(/ /g,'_') + "'";
                            console.log("name: "+name);
                            console.log("calories: "+calories);

                            console.log("serv: "+serv);
                            console.log("result: " + result);
                            console.log("should be the correct string:" + name.toString().replace(/_/g, ' ') + "," + calories + "," + fat + "," + protein + "," + serv.toString());
                            string_to_input = name +","+ calories.toString() + "," + fat.toString() + "," + protein.toString() + "," + serv;
                            all_results_str += "<a onclick = populate_info_dining("+string_to_input+") class='list-group-item'>" + name.replace(/'/g, '').replace(/_/g, ' ') + "</a>";
                        }
                      window.location.hash = "#results";
                      //all_results_str = "";
                      /*for (key in result) {
                          console.log("entered for loop");
                          name = "'" + key.toString().replace(/ /g,'_') + "'";
                          calories = result[key].calories;
                          fat = result[key].fat;
                          protein = result[key].protein;
                          serv = "'" + (result[key].serving_size).toString().replace(/ /g,'_') + "'";
                          console.log("name: "+name);
                          console.log("calories: "+calories);

                          console.log("serv: "+serv);
                          console.log("result: " + result);
                          console.log("should be the correct string:" + name.toString().replace(/_/g, ' ') + "," + calories + "," + fat + "," + protein + "," + serv.toString());
                          string_to_input = name +","+ calories.toString() + "," + fat.toString() + "," + protein.toString() + "," + serv;
                          all_results_str += "<a onclick = populate_info_dining("+string_to_input+") class='list-group-item'>" + name.replace(/'/g, '').replace(/_/g, ' ') + "</a>";*/

                        $("#results").html(all_results_str);
                    //}
                });
                else {
                    search_string = search_string.replace("%","%25");
                    $.ajax({url: "http://api.nal.usda.gov/ndb/search/?format=json&q=" + search_string + "&sort=r&max=250&offset=0&api_key=F3tkXI4IvcYIxiwOZMqUq0VK4ezF5FCaW7L2vWLU", success: function(result) {
                        display_search_results(result);
                    }
                });
            }
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
          numstring = (numbers[number]).toString();
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

        function populate_info_dining(name, calories, fat, protein, serv) {
        console.log("getting into populate info");
          calories = parseFloat(calories);
          fat = parseFloat(fat);
          protein = parseFloat(protein);
          name = name.toString().replace(/_/g, ' ');
          serv = serv.toString().replace(/_/g, ' ');

          window.location.hash = "#food-input-manual";
            $("#food_name").val(name);
            $("#protein").val(protein);
            $("#calories").val(calories);
            $("#fat").val(fat);
            $("#serving-size").html("Serving size: " + serv);
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
