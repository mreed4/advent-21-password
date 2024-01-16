This was another fun project to implement a password generator. I had some ideas in my mind of how it could work, and the reality was more or less in line with that idea. 

Basically, there is a default pool of possible characters made available on page load. At the direction of the user, and by clicking on a checkbox, groups of characters can be removed from the pool, and re-added to the pool. A password is randomly generated each time the user makes a change (a) to the pool, or (b) to the desired length of the password.

I added some keyboard events to make this even more interactive. I also added a button that when clicked will generate a password with the current settings. Oddly that button was not in the provided files, nor did the challenge seem to call for it, but I thought it was a good idea to add it.
