---
layout: post
title: Experimenting with Scala
tags: [scala, spray, slick]
---

After a first brush with Scala during the Stripe <abbr>CTF</abbr>
earlier this year, I have have been trying to find an opportunity to
dive deeper. Yesterday saw a post on HN about
[delete.im](https://news.ycombinator.com/item?id=7345449). Cloning
their basic functionality seemed like a neat project to test out some
of the cool Scala libraries I have stumbled upon. Notably
[spray](http://spray.io) and [Slick](http://slick.typesafe.com/).

While getting started I ran into a couple of issues with dependencies
in eclipse. The following `sbt` commands fixed these:

{% highlight bash %}
> reload
> eclipse with-source=true
{% endhighlight %}

I am still very far from groking Scala, but so far it has been a
pretty fun experience. You can track my progress on
[github](https://github.com/m2w/ephemeral).
