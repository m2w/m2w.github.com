---
title: Quick nginx redirect
tags: []
layout: post
---

Here's a simple redirect in nginx:

{% highlight nginx %}
server {
    listen 80;
    server_name tibidat.com;
    return 303 $scheme://blog.tibidat.com$request_uri;
}
{% endhighlight %}

Minimalistic and very readable. Note the usage of a `303`; this means
I don't have to worry about clients with cached `301s` should I decide
to change the redirect target at a later time.
