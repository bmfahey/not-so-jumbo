# comp20-s2016-team2
## Not so Jumbo
## Donna Chen, Brendan Fahey, Harrison Kaiser, Jordan Nagy

### Problem Statement

	For when you need to lose some pounds (or a lot) from all your late night pizza runs and mounds of snacks.

### Solution

	A application that will allow you to set goals to stay healty and lose weight (be jumbo no more!).

### Features

	1. Server-side data persistence: This allows the user to log in and keep track of their goals. Any foods that they have eaten lately can be inputted and stored to their account. Recent data will be translated into user-understandable graphs.

	2. Front-end Framework Using Bootstrap: provides template for us to work on.

	3. Sends SMS: notifies the user to complete certain goals.

	4. Charts and Graphs: will display the progress for the week (i.e. how many calories, protein, carbs, etc. you have consumed)

### Data Collected and Used

	1. The dining hall menus (ingredients and nutritional information).

	2. The nutrition database from the USDA.

### APIs

	1. USDA food database: contains a nutrition database for foods not in the dining hall. Users can search for foods and calories,
	proteins, sugar, etc, can be added to their progress.

	2. Google Charts API: displays charts for your progress in completing goals.

### Algorithms
	We will need to calculate total nutritional information for the week in terms of calories, fat, and protein. We will need to use the Document Object Model to parse through the HTML of the Tufts Dining website to get nutritional information for each food.

### Mockups
![Home Page](/mockups/home.png)
![Food Entry Page](/mockups/input_food.png)
![Progress Display for the Week](/mockups/progress.png)
![Allows User to Update Goal](/mockups/update_goal.png)
![User's Home Page](/mockups/user_home.png)

#Comments by Ming
* Generally a good idea.  Scraping menus from the Tufts Dining website can be a challenge.  I never heard of FatSecret but cool that it exists!
* 15 / 15

##NOTE:
The amount of pushes does not reflect relative work! Brendan pushed a lot early on and then he became the only
one that could push to both GitHub and Heroku. We passed a lot of code around on Google Docs and one person
would copy-paste it into a file before pushing it, and that person was usually Donna or Brendan. Most of
the code that we wrote was done together in Halligan and discussed between everyone.
