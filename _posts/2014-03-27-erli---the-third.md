---
title: erli - the third
tags: [erlang, erli, hœnir]
layout: post
---

[erli](https://github.com/m2w/erli) has been a great project to
experiment and learn erlang and webmachine. In a way, its complete
success as a learning tool has been the cause of its never ending
'beta' status: every time its state closed in on the 'good enough'
mark, motivation to finish dried up. It would bit-rot for a while,
until I found a new aspect of erlang to explore. This is the third
time that I return to it in an attempt to finish it.

Now that erli is to play a central role in my newest learning
endeavour, there is no way around that `1.0`. The specific components
that erli still requires to function as part of
['Hœnir'](/2014/03/24/starting-a-new-project) are:

- An <abbr>API</abbr> endpoint for a binary protocol, to be used by
  the dart & polymer based frontend
- Removal or isolation of the thumbnail generation component, since it
  has zero test coverage and is highly experimental
- Test suites for both the <abbr>HTTP</abbr> and binary
  <abbr>APIs</abbr>
- Configurable (and optional) integration with kafka
- A new resource for 'key' URLs. These should behave similar to
  `paths` without shared targets, no visit statistics and no
  discoverability. My current plan is to point 'key' <abbr>URLs</abbr>
  to a note with specific <abbr>URL</abbr> parameters or request headers
  (communication will be via <abbr>HTTPS</abbr> only) added. These
  params would be used to decrypt the note's contents. I realize that
  this is not a secure design. A better solution would be to actually
  use the 'key' <abbr>URLs</abbr> as keys since this would avoid
  having any kind of relation between keys and notes. I haven't
  decided on which approach to pursue, but it will most likely depend upon
  frontend usability.
- A release

I'm really looking forward to implementing these. The binary
<abbr>API</abbr> endpoint should be especially fun.

So I guess the *tldr* of this post is: if you can't get yourself to
finish a pet project, try to incorporate it into a larger, newer, pet
project.
