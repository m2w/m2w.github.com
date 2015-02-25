---
layout: static
title: RPT
---

Welcome to my Resolution Progress Tracker (RPT). It is a simple way
for me to keep track of progress towards my resolutions for the
current year.

Eventually this will be more visually appealing ;)

{% for entry in site.data.tracker %}
  <dl>
    <dt><em>{{ entry.goal }}</em></dt>
    <dd style="margin-left: 1em;"><small>{{ entry.progress }}</small></dd>
  </dl>
{% endfor %}

