---
layout: static
title: RPT
---

<header>
<h2>Resolution Progress Tracker</h2>
</header>

The Resolution Progress Tracker (RPT) is a simple way to keep track of
progress towards my resolutions for the current year.

{% for entry in site.data.tracker %}
  <dl>
    <dt><em>{{ entry.goal }}</em></dt>
    <dd style="margin-left: 1em;"><small>{{ entry.progress }}</small></dd>
  </dl>
{% endfor %}

Eventually this will be more visually appealing ;)
