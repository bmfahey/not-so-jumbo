# STATUS REPORT

## April 6, 5015

1. We serpated the javascript from the HTML files for a cleaner look.
Futhermore, we implemented the POST functions on the server side so that
when the user submits the food, a POST request is sent to the server. We 
also implemented the client side of the POST request and implemented data
sanitization so that blanks and negative numbers can not be input. We prevented 
against XSS against by using the regular expression method shown in class. 
Finally, we developed a theoretical plan for how we will store the persistant
data in Mongo when we get that part running.

2. Because we are still in the process of completing Assignment 3, we do
not yet have the skills necessary to complete the data storage portion of 
our website with Mongo. We are also having some issues with the USDA Food
Database API; it sometimes returns a 400 when it does not seem that it 
should be.

3. Our goals for next week are to start to implement the back end
and the server side of the web application. We want to be able to accomplish 
data persistence and be able to send data back and forth between the client
and the server. 

Also, we updated README file as we are no longer using FatSecret but the 
USDA food database as one of our API's. 