---
layout: post
title: Writing a github hosted commenting system
tags: [github, jQuery, blog]
---
I just pushed the [beta version of my commenting system](https://github.com/m2w/talaria) for this blog to github. Code-named talaria, it provides commenting for any file-identifiable[^1] content via github commit message comments.

talaria works based on a number of assumptions:

1. content (such as a blogpost) is wrapped in a DOM container, such as a `div` or even better an `article`, which contains an `a.permalink`
2. the permalink can be used to figure out the actual path and filename of the content-source (such as a markup file)
3. the DOM provides the necessary nodes which talaria uses as template and reference points for comment insertion

A liquid template that enables usage of talaria would look structurally similar to the following:

{% highlight html %}
{% raw %}
...
    <script type="text/javascript" src="/path/to/comments.js"></script>
...
    <article>
        <header><a class="permalink" href="/permalink-to-post">A post</a></header>
        ...
        {% include comments-placeholder.html %}
    </article>
...
    <footer>
        {% include comments-template.html %}
    </footer>
...
{% endraw %}
{% endhighlight %}

The actual functionality is very simple and the majority of the work is handled by the github API, but here's a breakdown: talaria extracts all permalinks on the page. These are converted to the respective paths to the content source files. It then iterates over all files, querying the github API for all commits related to each file. For each commit it then retrieves the commit-comments. Retrieved data is cached locally[^2] (if supported by the browser) using `sessionStorage`. The next steps entail sorting the comments based on their `updated_at` field before rendering them using the template snippet. Finally `href` of the button to add a comment is set and, if the current URL indicates paginated content, the comments are initially left hidden and an appropriate "view comments" link is displayed instead, if not, the comments are displayed.

Getting around the XSS limitations with the github API is thankfully very simple as they offer support for CORS. All it takes is to [register an OAuth application](https://github.com/settings/applications/new) for the domain and from there everything just works&trade;.

Writing talaria was a great way to experiment with `$.Deferred()`, which are totally awesome!

[^1]: I consider content "file-identifiable", if the full content is contained in its own file, such as the markup source for a blog post.
[^2]: This also helps with the relatively low limit of 60 requests per hour (considering that with talaria the absolute minimum is 2 requests per page view) for unauthenticated queries against the github API.
