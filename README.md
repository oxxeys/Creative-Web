# Outline Of Application

## About My App
My web app concept is called Boxy! The web app will be based around a physical box which would have a qr code on it. Upon the qr code being scanned, the user would be taken to a map which would showcase where boxy has been before. They would be given the option to make a post about boxy. This post would contain the location boxy is in along with the potential for some text and an image. There would be a couple filters on the map that would show data in different ways (ie: where boxy was this time last year, where boxy was the most). The user would also be able to scroll through the posts/logs from previous users which could also be filtered.


The target audience of the site would be anyone who has interacted with the physical boxy. The typical user of the web app will tend to be younger people as I feel that they will be able to become more engaged in the project and learn from it. I would be targeting more active people who would be more likely to go out and take pictures of boxy doing interesting things, trying to give them a novel experience they don't get to experience often/ever.


## The technology stack and application architecture
I plan on using the following front end technologies: 
Vue.js to build out the front end 
Vite.js as the build tool used 

For the back end I plan on using:
Node.js with  Express.js to build out and host my server 
MongoDB will be the database service I use, along with the use of mongoose to intergrate it with my application

APIs and Libraries:
I plan on using a couple different APIs and Libraries:
GSAP to handle animation on the front end 
Map box to show a map on the front page on desktop
tres.js/three.js to handle 3d animation on the front end of the app

I plan to host on azure, though I have been looking into Vercel if azure does not work out with my app. 


## UI/UX considerations
I made a number of considerations when creating my layout design for Boxy! I wrote a lot of my thoughts down on a paper as I came up with them, later incorporating them into the design. One example of one consideration I made was whether I should have the clickable boxes throughout the site be represented as cardboard boxes. While this would stray slightly from button convention on the rest of the web, it would add a tactile feeling to the app which would greatly tie in with the idea that boxy is both a digital and physical experience. 

I have run through the design numerous times on paper and asked a peer to also run through it to ensure that the app would be accessible and simple to use for new users. I also did this again with the figma version of the app I created.

The figma file can be found here: 
[Figma Link](https://www.figma.com/design/wlGfyp2M1Wj4TisbWtV0Yz/Creative-Web?node-id=0-1&t=qSsecnT9a5kzYI6Q-1)


## Major features
The major features of the app will be: 
A fully functional back end that works seamlessly, running on node and mongo
A fully styled front end that runs on vue and is built by vite
Two pages main pages, one for the landing page and one for the users profile
A different view for users who scanned the qr code, allowing them to make a post, which then reroutes to the main page. If a user has made a post, time out their geolocation and browser. 
The ability for users to change their username or password
GSAP animations throughout the site to make it more engaging
Tres.js to control the 3d box on the hero of my landing page. 
A Mapbox map showing where boxy has been, using geolocation that is stored in the posts, combined with animations to show where 


## My minimal viable product 
The minimal viable product of the app will be:
A simple web app with a working backend and simple front end in vue with minimal amounts of styling, similar to the class app.
Two pages main pages, one for the landing page and one for the users profile
The ability for users to change their username or password
If user scans a qr code, they are taken to a version of the site where they can make a post
Users can upload pictures and text when making a post
A mapbox map to show the last location boxy was seen at 


## Anticipated challenges and technical obstacles
I expect to face a number of challenges due to working with vue for the very first time. A lot of my time currently has been spent on getting a good understanding of the framework but I still am anticipating challenges. I am expecting that even though vue makes front end development easier, that making it responsive to a mobile view will take up a large chunk of time.

I also expect that the front end in general, due to using multiple libraries and APIs, will be rather complex and will create a couple obstacles to get it how I would like it to look. 

I am not really anticipating many problems with the backend as I am more than fully confident in my ability after the previous weeks spent with node and mongo. This does not mean I am not allocating contingency time just in case the back end does go wrong, I am simply just not as anticipatory of big issues as the front end. 


##Experiments with techniques and API's
I have experimented with vue and vite along with getting a server that works using a tutorial I found. It wasn't as simple as I wanted due to the tutorial being in vue 2 while I am working with vue 3 which meant code had to be changed and updated. 

I made a very simple box with three.js following a tutorial. It is no longer applicable as I decided to move forward with tres.js as it is more applicable in the vue context, but I still did it which refamiliarised me with the three.js code structure.


## Learning points from your independent study
Vue is not as simple as I first expected it to be, though it has been fun to challenge myself

Updating from vue 2 to vue 3 has been hard and makes me anticipatory of any future code examples I find online
 
Using vue has required a restructuring of my server file compared to the simple social app, which has been really interesting to see the compartmentalising of controllers, models and routes. This has helped with my understanding of these concepts as rewriting them out has been a good process.







![Idea Generation (1)!](https://github.com/oxxeys/Creative-Web/blob/main/Assets/img(1).jpg)
