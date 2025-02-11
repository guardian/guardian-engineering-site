---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-feb-15-london-devops-meetup-held-at-the-guardian'
headline: 'London DevOps meetup held at the Guardian'
date: '2014-02-15'
authors: [Simon Huggins]
standfirst: 'An inspiring get-together at the Guardian for London DevOps where members of the community swapped ideas about various development and operations techniques for building better software.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/15/1392423144552/05e52fb5-2b14-4966-ab9c-f32682a788f9-1024x768.jpeg'
  alt: 'Andy Sykes speaking at London DevOps'
  credit: 'Photograph: Simon Hildrew'
tags: [DevOps]
---

Around 65 people turned up at the Guardian offices on Wednesday night to eat pizza and talk about all things DevOps at the [London DevOps](https://groups.google.com/forum/#!forum/london-devops) meetup. There were five different talks ranging from “homoiconic deployments” to being in an abusive relationship with [Nagios](http://www.nagios.org/).

First up was [Matt Chadburn](https://www.theguardian.com/profile/matt-chadburn), a developer manager here at the Guardian, who has been making a huge impact by delivering [our new responsive design site](https://www.theguardian.com/uk?view=mobile). Software projects often end up continually accruing features but rarely have old features – which might not even be necessary today – removed. To counter this, Matt advocates for a way to [give features a sell-by date](http://matt.chadburn.co.uk/notes/apoptosis.html). When a feature extends beyond its sell-by date, it is automatically turned off to end-users. From that point on, the code would no longer even build as unit tests wouldn’t pass if any feature was past its sell-by date.

Just turning features off isn’t very palatable to product managers, end-users or the business in general, so a warning is generated a week before they expire. This forces developers of the product to have a conversation with the relevant parts of the business and jointly decide if the feature is still useful and should be extended, or if it should be properly removed. It’s early days of trying this out, but as the Ops Manager here I’m hoping it means fewer unloved features in the code that we run in production.

Next up, Jay Harrison talked about [his experiences trying to instil DevOps practices](https://docs.google.com/a/guardian.co.uk/presentation/d/1DPbapT2kxd7UrHvbLr_Eo02Y-F8OSB6vSQq8ArSOI8o) at Rebellion Developments in Oxford. There were new experiences both for the company and for Jay and he decided to use [SaltStack](http://www.saltstack.com/community/) as the basis for his work. Salt is a remote execution framework above all else and SaltStack then uses it along with Salt States (equivalent to puppet’s manifests or chef’s recipes) to work out what should be configured on any particular node. SaltCloud provides some basic instance provisioning, although it seems that this doesn’t know about Amazon Web Services auto-scaling groups, for example. It was an interesting insight into tools I knew little about.

[Simon Hildrew](https://www.theguardian.com/profile/simon-hildrew), my colleague in the systems team here at the Guardian, did a quick introduction to the benefits of using [hiera-eyaml](https://github.com/TomPoulton/hiera-eyaml) which he’s been [contributing to and integrating with our puppet setup internally](https://www.theguardian.com/info/developer-blog/2014/feb/14/encrypting-sensitive-data-in-puppet). It’s a tool that lets you store encrypted passwords in hiera yaml files with the minimal disruption of our usual git workflow. For instance, running a git diff against a hiera-eyaml encrypted yaml file allows you to see if an encrypted value changed or not and to see all the unencrypted values in the same file. Ultimately at the Guardian we hope that it will allow us to open up our puppet repository to our developers without having to change passwords whenever one moves on.

After a quick break, Robert Rees, a developer manager at the Guardian, attempted the most obscure talk entitled “homoiconic deployments”. He explained that operations often talk to developers in terms of “such and such a .war file has a problem” but that developers exist in a world of source code. If you want to get a developer to understand your issue in production then you should talk about lines of the code. Homoiconic deployments are the idea that you could deploy the code that was used to make up the artifact instead of a binary artifact that is divorced from its original form. He mentioned the idea of being able to run the unit tests against production on a live server with minimal effort in this way.

Then Andy Sykes got an award for “most audience participation of the evening” with his talk about why we should [stop using Nagios and let it die peacefully](http://www.slideshare.net/superdupersheep/stop-using-nagios-so-it-can-die-peacefully). He argued that Nagios is the safe choice for monitoring and whilst it has an amazingly simple plugin system it is: unsuited to modern infrastructures, doesn’t scale easily and has a terrible user interface. He has seen Nagios suck lots of energy from the community since it is seen as being good enough for simple cases. He claimed that many of us are in an abusive relationship with Nagios somewhat akin to Stockholm Syndrome.

So what’s the solution? Andy was emphatic that no one in the community should write their own new monitoring system and his solution is that we should instead take the existing components that do one job well and put them together into a better solution. He pointed at [The Open Monitoring Distribution](http://omdistro.org/) as an example of what a community can maintain and would like to create an alternative that is not based on Nagios.

There was then a lively debate about what should be used for each component. Regular London DevOps contributor Gareth Rushgrove even suggested we should give up on Open Source altogether and just buy something from the likes of Circonus, Boundary or NewRelic as the integration time of Open Source means it is expensive. The debate continued in the pub later where Gareth revealed his current monitoring system was actually homebrew Open Source.

Simon Hildrew has now made [videos of the talks at the event](http://www.youtube.com/playlist?list=PLW0uaXBKV9j-l_0hgglPZsOQLXRVFAVgX) available.

Overall then, a great mix of shorter lightning talks exposing ideas and longer in depth talks which made for a great evening. Thanks to Simon Hildrew in particular for organising this event and reminding everyone that [we’re hiring for a Senior Systems Integrator](http://gs10.globalsuccessor.com/fe/tpl_GuardianNews01.asp?newms=jj&id=96413), as well as [graduate developers](http://gs10.globalsuccessor.com/fe/tpl_GuardianNews01.asp?newms=jj&id=96220) and [other roles](http://jobs.theguardian.com/searchjobs/?Keywords=guardian+news+and+media).

The next meetup is on the 7th April at the JustEat offices a couple of weeks after the [Scale Summit](http://www.scalesummit.org/) unconference. If you want to find out about the next one, you can join the [mailing list](https://groups.google.com/forum/#!forum/london-devops).

Events like these show there really is a vibrant DevOps community in London, made up of people with great ideas. Surely there is much more material for talks at future meetups.
