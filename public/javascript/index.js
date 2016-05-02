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
                    console.log("recognized as common meals");
                    /*$.get("http://not-so-jumbo.herokuapp.com/tuftsSuggestions" , function(result) {
                        console.log("got a response: " + result);
                        //result = JSON.parse(result);
                        console.log("response is parsed: " + result);
                        window.location.hash = "#results";
                        all_results_str = "";
                        for (key in result) {
                            console.log("entered for loop");
                            name = key;
                            calories = result[key].calories;
                            fat = result[key].fat;
                            protein = result[key].protein;
                            serv = result[key].serving_size;
                            console.log(serv);
                            console.log("result: " + result);
                            all_results_str += "<a onclick = populate_info_dining("+name+","+calories+","+fat+","+protein+","+serv+") class='list-group-item'>" + name + "</a>";
                        }*/
                        var result =
                        {
                          "Cream Cheese": {
                            serving_size: "1 OZ",
                            protein: 1.7,
                            calories: 97,
                            fat: 9.7
                          },
                          "Blueberry Yogurt": {
                            serving_size: "1 OZ",
                            protein: 1.2,
                            calories: 20,
                            fat: 0
                          },
                          "Assorted Bagels": {
                            serving_size:"1 EACH",
                            protein: 10.7,
                            calories: 264,
                            fat: 1
                          },
                          "1% Milk": {
                            serving_size:"1 OZ",
                            protein: 1,
                            calories: 13,
                            fat: 0.3
                          },
                          "Chocolate Low Fat Soft Serve Ice Cream": {
                            serving_size:"1 OZ",
                            protein: 1.3,
                            calories: 39,
                            fat: 1.1
                          },
                          "Hot Chocolate": {
                            serving_size:"1 OZ",
                            protein: 1,
                            calories: 122,
                            fat: 2
                          },
                          "Macintosh Apples": {
                            serving_size:"1 EACH",
                            protein: 0.3,
                            calories: 62,
                            fat: 0.2
                          },
                          "Apple Sauce": {
                            serving_size:"1 OZ",
                            protein: 0,
                            calories: 12,
                            fat: 0
                          },
                          "Cheese Pizza":{
                            serving_size: "1/8 of Pizza",
                            protein: 13.7,
                            calories: 281,
                            fat: 10.5
                          },
                          "Whole Eggs":{
                            serving_size: "1 EACH",
                            protein: 3.6,
                            calories: 44,
                            fat: 3
                          },
                          "The Charles/MGH": {
                              calories: 738,
                              protein: 83.1,
                              fat: 31.8,
                              serving_size: "1"
                          },
                          "The Davis Square": {
                            calories: 619,
                            protein: 72.3,
                            fat: 23.4,
                            serving_size: "1"
                          },
                          "The Harvard Square": {
                            calories: 547,
                            protein: 42.3,
                            fat: 15.4,
                            serving_size: "1"
                          },
                          "Chicken Parmesan Sub": {
                            calories: 604,
                            protein: 36.3,
                            fat: 17.7,
                            serving_size: "1"
                          },
                          "Steak & Cheese Sub": {
                            calories: 484,
                            protein: 34.2,
                            fat: 28.1,
                            serving_size: "1"
                          },
                          "Beef Burrito Caliente": {
                            calories: 720,
                            protein: 35,
                            fat: 32.4,
                            serving_size: "1"
                          },
                          "Chicken Quesadilla": {
                            calories: 577,
                            protein: 37.2,
                            fat: 20.8,
                            serving_size: "1"
                          },
                          "Pork Carnitas Burrito Caliente": {
                            calories: 657,
                            protein: 41,
                            fat: 24.1,
                            serving_size: "1"
                          },
                          "Roasted Veggie Quesadilla": {
                            calories: 503,
                            protein: 22.9,
                            fat: 19.5,
                            serving_size: "1"
                          },
                          "Chicken Stir Fry for Pan Asia": {
                            calories: 165,
                            protein: 20.5,
                            fat: 5.3,
                            serving_size: "1"
                          },
                          "Stir Fry Tofu for Pan Asia": {
                            calories: 90,
                            protein: 11.8,
                            fat: 5.5,
                            serving_size: "1"
                          },
                          "Egg Noodles for Pan Asia": {
                            calories: 168,
                            protein: 5.4,
                            fat: 3.5,
                            serving_size: "1"
                          },
                          "Sticky Rice for Pan Asia": {
                            calories: 396,
                            protein: 6.6,
                            fat: 4.8,
                            serving_size: "1"
                          },
                          "Grilled Chicken Sandwich": {
                            calories: 322,
                            protein: 37.3,
                            fat: 4.8,
                            serving_size: "1"
                          },
                          "Honey Garlic Chicken Wings": {
                            calories: 307,
                            protein: 19.1,
                            fat: 17.1,
                            serving_size: "7 wings"
                          }
                      };
                      window.location.hash = "#results";
                      all_results_str = "";
                      for (key in result) {
                          console.log("entered for loop");
                          name = key;
                          calories = result[key].calories;
                          fat = result[key].fat;
                          protein = result[key].protein;
                          serv = result[key].serving_size;
                          console.log("name: "+name);
                          console.log("calories: "+calories);

                          console.log("serv: "+serv);
                          console.log("result: " + result);
                          console.log("should be the correct string:" + name.toString() + "," + calories + "," + fat + "," + protein + "," + serv.toString());
                          string_to_input = name.toString() + "," + calories + "," + fat + "," + protein + "," + serv.toString();
                          all_results_str += "<a onclick = populate_info_dining("+string_to_input+") class='list-group-item'>" + name + "</a>";

                        $("#results").html(all_results_str);
                    }
                }
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
          calories = parseFloat(calories);
          fat = parseFloat(fat);
          protein = parseFloat(protein);
          name = name.toString();
          serv = serv.toString();

          window.location.hash = "#food-input-manual";
            $("#food_name").val(name);
            $("#protein").val(protein);
            $("#calories").val(calories);
            $("#fat").val(fat);
            $("#serving-size").html(serv);
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
