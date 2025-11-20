SIMPLE SOCIAL 

Ontop of the techniques added from class work, added likes, a user profile and a admin only page where users and posts can be deleted. 

When it comes to the user profile, the users first and last name are not used anywhere else due to the username existing. In future the app would expand out and the first and last name would be used for email/external communication. 

Adding these extra techniques was relatively simple once I reintroduced myself to the app and understood ejs a bit better. The hardest part was makin the correct POST requests in the right file to the right place to get the exact data I needed, which was often stored in mongo which I don't know much about therefore it was a lot of looking back at prior code and looking at the mongoose docs. 

Key Techniques:
MongoDB to store data externally
Node/Express for backend to host ejs and js which then get served to the user
ejs renders html on server before being served
private data stored in env file (for api keys and the like)
