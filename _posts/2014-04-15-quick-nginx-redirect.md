---
title: Quick nginx redirect
tags: []
layout: post
---

A simple redirect in nginx:

{% highlight nginx %}
server {
    listen 80;
    server_name tibidat.com;
    return 303 $scheme://blog.tibidat.com$request_uri;
}
{% endhighlight %}

Minimalistic and very readable. Note the usage of a `303`; this leaves the option of adding other subdomains later without worry of clients with cached `301s`.
