---
title: Starting a new project
tags: [hœnir]
layout: post
---

I recently stumbled across an
[amazing blog post on logging](http://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying)
by Jay Kreps of LinkedIn. Beside being extremely well written and
informative, it got me really interested in building an application to
try out some of the technologies at the heart of 'scaling'.

The plan is to (finally) complete the
[erli](https://github.com/m2w/erli) rewrite and combine its
functionality with that of
[ephemeral](https://github.com/m2w/ephemeral). The output will be an
application that allows (anonymous) users to create secret notes. I
want the stored notes to be server-side encrypted. My current idea is
to generate two <abbr>URLs</abbr> for each note, one pointing to the
note and the other being used as key to encrypt the data. Since there
would be no state or any other connection between a note and a key
<abbr>URL</abbr> (as key <abbr>URLs</abbr> could be generated ahead of
time or on the client side) this should provide 'good enough'
secrecy.

Both <abbr>URLs</abbr> are subject to expiry, so if you want your note
to expire after one view, both the note and key <abbr>URL</abbr> are
each only available for exactly one view. Upon expiry, the relevant
database contents are erased and the <abbr>URL</abbr> will return a
`410`.

This is the core functionality of the application and should be a
pretty fun exercise to implement. In addition, I would like to add
[Kafka](http://kafka.apache.org/) and
[hadoop](http://hadoop.apache.org) integration to provide an activity
feed and simple statistics and aggregates regarding service
usage.

Ideally, the whole application should be docker based to facilitate
testing and experimenting with 'scale'. I code-named the project
'Hœnir', after the god of silence in Norse mythology.
