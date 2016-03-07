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

	2. The nutrition database from FatSecret. 

### APIs
	
	1. FatSecret API: contains a nutrition database for foods not in the dining hall. Users can search for foods and calories,
	proteins, sugar, etc, can be added to their progress.

	2. Google Charts API: displays charts for your progress in completing goals. 

### Algorithms
	We will need to calculate total nutritional information for the week in terms of calories, fat, and protein. We will need to use the Document Object Model to parse through the HTML of the Tufts Dining website to get nutritional information for each food. 

### Mockups
	See folder entitled "mockups". All PNG images are mockups of website pages.