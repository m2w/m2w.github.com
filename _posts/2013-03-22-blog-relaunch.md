---
layout: post
title: Blog relaunch
tags: [jekyll]
---
I just moved my blog to github. There are two main reasons for the move: First, it moves another "critical" component off my server and into the cloud. This allows me to experiment more on my server with less fear of consequences. Second, I have been wanting to give [jekyll](https://github.com/mojombo/jekyll) a try for a while now, and while this isn't a reason to move to github per se, my current deployment mechanic is lacking, and github nicely streamlines it for me. A further addition that is currently in planning stage is to add a github-based commenting system to the blog.

There are currently a number of people using github issues for commenting. However, I find that approach unclean, as the comments are detached from the actual content you are commenting on. Instead, my idea is to instead base commenting on commit comments. The plan is to create an AJAX based system that follows the following mechanic:

1. Grab all commit comments
2. Grab the permalink of the post - convert it to the file name
3. Extract all comments that deal with said file
4. Display the count on the index (fade-in for actual comments), display the comment contents on the permalink page

    If this is too slow, drop index support - generate the comment count statically each time a new post gets added

Relaunching the blog also gave me the opportunity to redesign it. I switched to a very simplistic design, that I believe offers good readability and makes good use of screen real-estate.
