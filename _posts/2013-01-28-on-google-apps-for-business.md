---
layout: post
title: On Google Apps for Business
tags: [Google, email]
---

Are you running your own mailserver but don't want to deal with all the hassle and/or aren't satisfied with the current state of email web frontends? The solution might very well be Google Apps.

I used to run a Postfix & Dovecot setup. It ran rock solid for almost 2 years. My server has automatic backups on-site, and I have a local [unison](http://www.cis.upenn.edu/~bcpierce/unison/) script running for added redundancy. Overall, I was very satisfied with the setup. It gave me full control over my data and granted me the flexibility to configure everything according to my preferences. It did however, come with a massive downside: _downtime was absolute_.

The setup had no failover. Had the server gone down, my primary email addresses would have been unreachable until fixed. Additionally, fully configuring and maintaining a mail server requires both time and in-depth domain knowledge. It also requires, and this is the main reason I started looking for an alternative, that the administrator be available and reachable.

Since arriving in Japan, constant internet access is no longer a guarantee. This effectively rendered my emergency plan[^1] void. Worst case scenario: Not even realizing that the server is down for a couple of days. To compound the issue, more often than not, connectivity is shaky. This is already frustrating for day-to-day interaction with the server, but in an emergency it would just add unnecessary stress.

As is, my current situation tipped the scales in favor of an alternative. I had a look at the big three: [Gmail](http://www.google.com/enterprise/apps/business/), [Yahoo Mail](http://smallbusiness.yahoo.com/email/) and [Outlook.com](http://office.microsoft.com/en-us/exchange/email-hosting-exchange-online-FX103739072.aspx). Out of these, Google simply offers the most (while also being the cheapest for my use-case). To me, the benefits of outsourcing email were:

+ email is unaffected by DDoS attacks
+ contact and calendar syncing
+ SLAs
+ automatic and highly redundant backup of my email
+ a (maintenance free) email server setup that conforms to best practices
+ IMAPS access, along with the best email web interface on the market
+ AName based custom domains for any Google services
+ very usable admin interface

There were also a couple of downsides:

+ loss of control over my email setup
+ loss of direct control over my personal and private data
+ a price-tag of €40.00 per year

To me the benefits outweighed the downsides, especially since the administrative features of Google Apps allow me to *really* tailor my personal Google experience in a way that non-paying consumers just cannot (example: I can individually control access to all Google products, so I can block my "company" from using youtube, which means I cannot log into youtube, even if I wanted to. Coupled with regular cookie clearing this reduces my overall Google footprint).

So far I am very happy with my decision. Administration has been straightforward and the peace-of-mind alone has been worth it. Overall, during the migration I had about 3 to 4 hours of downtime, as Google took considerably longer to acknowledge my DNS changes than my own root server. Note: I didn't lose any email during this period, so it's hard to know if Google already handled my email before acknowledging so in the administrative interface.


[^1]: (hopefully) get a notification or realize that the server has issues by other means. Attempt to log on to the server and restart the services. If that doesn't fix the issue, check logs for hits and fix the problem(s). In case of an unreachable server, check server health via LISH. Worst case, revert to the last snapshot
