---
layout: post
title: Writing a Github-hosted commenting system
tags: [github, jQuery, blog]
---

I just pushed the
[beta version of my commenting system](https://github.com/m2w/talaria)
for this blog to Github. Code-named talaria, it provides commenting
for any file-identifiable[^1] content via Github commit message
comments.

talaria works based on a number of assumptions:

1. content (such as a blog post) is wrapped in a <abbr>DOM</abbr>
   container, such as a `div` or even better an `article`, which
   contains an `a.permalink`
2. the permalink can be used to figure out the actual path and
   filename of the content-source (such as a markup file)
3. the <abbr>DOM</abbr> provides the necessary nodes which talaria
   uses as template and reference points for comment insertion

A liquid template that enables usage of talaria would look
structurally similar to the following:

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

The actual functionality is very simple and the majority of the work
is handled by the Github API, but here's a breakdown: talaria extracts
all permalinks on the page. These are converted to the respective
paths to the content source files. It then iterates over all files,
querying the Github <abbr>API</abbr> for commits related to each
file. Then it retrieves the comments for each commit. Retrieved
data is cached locally[^2] (if supported by the browser) using
`sessionStorage`. The next steps entail sorting the comments based on
their `updated_at` field and rendering them using the template
snippets. Finally, talaria sets the `href` for the buttons to add
comments, and, if the current <abbr>URL</abbr> indicates paginated
content, the comments are initially left hidden and an appropriate
"view comments" link is displayed instead, if not, the comments are
displayed.

Writing talaria was a great way to experiment with `$.Deferred()`,
which are totally awesome!

[^1]: I consider content "file-identifiable", if the full content is contained in its own file, such as the markup source for a blog post.
[^2]: This also helps with the relatively low limit of 60 requests per hour (considering that with talaria the absolute minimum is 2 requests per page view) for unauthenticated queries against the Github API.
