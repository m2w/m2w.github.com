---
layout: post
title: Blog relaunch
tags: [jekyll, blog]
---

I just moved my blog over to GitHub. The main reasons for moving are:

* Moving another 'critical' components off the <abbr>VPS</abbr> and into the
cloud. With this, the server can safely be used for experimenting,
without fear of killing my blog or email server. It should be noted,
that this is only necessary since I have been too lazy to write
provisioning scripts, which means that resetting the server is currently
rather tedious.
* It allows me to try out
[jekyll](https://GitHub.com/mojombo/jekyll), all the while enjoying
the streamlined deployment offered by GitHub pages. It also gives me
a good starting point to add a GitHub-based commenting system, which
is currently in the planning stage.

With regards to the GitHub-based comments, there are currently a
number of people using a GitHub issues based approach. I personally
dislike it, as comments are removed from the actual content you are
commenting on. My plan is to base commenting on GitHub
commit-comments. The system would roughly work as follows:

1. Grab the permalink of a post and extrapolate the path to its
   source file
2. Retrieve all commits for said file through the GitHub <abbr>API</abbr>
3. Iterate over the commits and retrieve any comments from the <abbr>API</abbr>
4. Display a comment-count on the index (click to fade-in the actual
   comments); display all comments contents on the permalink page

Along with the switch to jekyll, I also opted to redesign the blog. It
now has a very simplistic design, which I believe offers good
readability and makes good use of screen real-estate.
