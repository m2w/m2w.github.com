---
layout: post
title: bower link
tags: [js, bower]
---

While working on *talaria* I usually test all changes using my blog
locally. Originally, I kept copying the updated `talaria.js` over
after every change as I had troubles with `jekyll serve` and
symlinks.

Annoyed, I did what I should have done much earlier! I read the
bower documentation. Turns out they have a very simple solution:

{% highlight bash %}
# cd /path/to/talaria
bower link
# cd /path/to/blog
bower link talaria
{% endhighlight %}

*talaria* is now symlinked back to its root repository. Once I want to
get rid of the symlink I can just run `bower uninstall talaria`.

While this approach is simple and cleaner than manual copying or
symlinking,  I still run into the issues with `jekyll serve` and
symlinks: to see my changes I am forced to reload jekyll manually.
