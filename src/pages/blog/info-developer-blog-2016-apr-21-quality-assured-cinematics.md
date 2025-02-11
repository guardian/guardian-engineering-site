---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2016-apr-21-quality-assured-cinematics'
headline: 'Quality Assured Cinematics'
date: '2016-04-21'
authors: [Tormod MacLean]
standfirst: 'A series of case studies for learning in development from unlikely sources'
image:
  url: 'http://media.guim.co.uk/eacc36bfe3fdfcb5aa2a9fe8c84c7b43a997ab88/0_0_1800_1080/1800.jpg'
  alt: 'The death scene of Simba’s father Mufasa in the Disney film The Lion King'
  credit: 'Photograph: Publicity image'
tags: []
---

I work in the Quality Assurance team in the Guardian’s Digital Development Department. Being a QA is about improving the quality of our apps and website by finding ways to improve systems, identifying issues and introducing practices that will reduce the number of bugs being produced. The first thing you learn doing this is that all systems have flaws. All projects produce bugs. Eradicating them all is impossible, what’s more important is how you respond when an issue arises.

I was thinking recently about a project leader whose systems were under attack from a particularly aggressive critical issue. Scoping out the problem, he assembled an agile cross functional team and got down to the business of trying to deal with it. When the problem was identified, the project leader correctly observed that they had failed to recognise the scope of the problem - based on this he re-evaluated their strategy; they were going to need a bigger boat.

This re-evaluation was key to Roy Scheider’s success at resolving the Jaws issue that plagued the beach - and it’s a key strategy in all forms of development. But it’s not enough to just review the history of your own project. You can also massively benefit from reviewing the failures of other systems, and thinking about how those lessons could be applied to your own work.

With that in mind here are some key case studies and an evaluation of how the participants could have avoided the critical failures that brought their systems down.

**Star Wars: A New Hope**

This is a clear case of poor risk calculation. A magic space pilot striking the center of the only exhaust port on a moon sized death machine was considered an edge case by the Empire. Here we see the limitations of basing risk assessment on probability alone. Had they also considered the catastrophic fallout from this vulnerability they would surely have addressed the problem during construction.

Given the small amount of development time required to put a protective grate over the port in question, and the damage done to the Empire’s long term plans when the death star exploded, this was definitely a bug worth fixing.

As a side point it is worth noting that this critical issue also highlights the importance of applying what you learn in one project to the next. As project manager, Vader only had himself to blame. His experiential understanding of the potential damage one sandy haired brat can wreak on major military installations should have prepared him for what happened.

**Jurassic Park**

When the first audience in the first ever screening of Jurassic Park took to their seats none of them were thinking; “Park full of killer dinosaurs? This’ll end well.” But this common sense wisdom clearly escaped the army of builders, plumbers, administrators and fungineers that had spent years putting the theme park together. This is not as unlikely as you might think. Often the people working most closely on a project become blind to its obvious flaws. Sure the audience is thinking, “What if the power goes out?” But the hundreds of park employees are thinking; “Gosh, this electric fence was a good idea!”

Overcoming the false assumptions associated with being too close to a project is not a simple matter. One of the top ways a team can achieve this is by the proper utilisation of data. I say proper utilisation because it is not enough to simply gather data, you have to analyse it and allow it to inform your decision making. Enter Jeff Goldblum.

Jeff’s character Dr. Ian Malcolm is invited along to the early beta test of the park because of his expertise at data modeling. After carefully going over the information available (Dinosaurs + people = bad times all round), Malcolm informs Hammond “that life, uh... finds a way”. Understandably Hammond is horrified that the fundamental basis of his billion dollar theme park is flawed, and like so many other overzealous start ups insists that Malcolm simply doesn’t get his vision.

Rather than pulling out of a doomed project Hammond forges ahead. This changes the issues status from possibly avoidable to absolute certainty and it’s poor old Samuel L. Jackson that has to pay the price.

**The Lion King**

Few cinematic events match the tragedy of the death of noble god-king Mufasa. Project Manager overseeing the beautifully simple system known as “the circle of life”, Mufasa was brought low not by the evil machinations of his usurping brother, but by a principle known in quality assurance as “death by a thousand cuts”.

Death by a thousand cuts refers to the idea that a thousand trivial issues can be as catastrophic as a single critical one. As each individual problem pops up people shrug them off thinking - no user will really care about that. Then one day you have so many bugs in your system that it has become untenable.

So it was with Mufasa. Proudly the King took his new start/son Simba on a tour of the system, informing him; “Everything the light touches is our kingdom”. But when the inquisitive Simba, his fresh eyes allowing him to appreciate the significance of potential issues his father had become blind to, asks “what about that shadowy place”, his father simply tells him, “You must never go there”.

This shadowy kingdom is of course the habitat of the hyenas. Small but vicious creatures the hyenas are no match for Mufasa individually. In sufficient numbers however they can dominate the entire plains and destroy the delicate system that Mufasa nurtured. Provoking a herd of inexplicably mute wildebeest (creatures that individually would be easy prey for the king), Mufasa meets his end.

Had Mufasa paid more attention to the shadowy land the hyenas called home he could have dealt with them while the problem was still manageable. You might argue that the kingdom’s fall is only a temporary setback - but who in their right mind would trade the steady experienced hand of a lion with James Earl Jones’ voice for that bug eating weirdo Simba?

**Titanic**

The hubris of the Titanic’s engineers is an often told cautionary tale. However, their mistake is not in attempting to make an unsinkable ship, but in their failure to identify the source of their problem. Throughout the ages many ships were sunk by crashing into icebergs, their hulls torn apart by the impact. The engineers of the titanic think to themselves - why not build a ship with a double hull? That way if one hull is breached, there will always be another one behind it.

This sounds like a reasonable proposition, leading to the wise Billy Zane’s repeated declarations that, “Not even god himself could sink this ship”. But it does sink. It sinks for ages. The issue here is that the torn hull was never really the problem, it was a symptom. The real problem was that ships kept on hitting icebergs. If the same effort put into constructing the Titanic’s double hull and sixteen watertight compartments had been put into figuring out how to avoid icebergs, then the internet would be free of endless diagrams of how Rose could have budged up on her drift wood.

**Robocop**

The titular character of the franchise is a slow moving man-sized cyborg armed with a pistol and riddled with software bugs. Yet he’s able to defeat the monstrous Enforcement Droid Series 209 with relative ease. Twice his size, armed with twin machine guns this literal killing machine should have been able to make short work of the malfunctioning Murphy, but instead it survives mere minutes in a real world environment.

The problem with the Enforcement Droid is that it was not put through any usability testing. One can imagine the scientists constructing it in their robotics lab; patting each other on the back with every massive gun or hulking footpad. Never stopping to consider - what if it has to go down the stairs?

Usability testing, perhaps a strong alpha programme, would have quickly identified this flaw. Just as it would have quickly identified the robots propensity to kill indiscriminately before its bloody reveal to the board of directors. Once the stairs issue had been identified the development team would not have had to take their creation all the way back to the starting board. Instead the recognition of the robots limits would have saved them the trouble of moving what is a clearly a multi-tonne piece of hardware all the way to the top of a skyscraper. Instead the Enforcement Droid could have remained a dedicated ground force. Sure, this may not have satisfied Dick Jones’ ultimate goal of city wide domination, but controlling everything at ground level would have been a good point to start iterating from.

**Ghostbusters**

Finally I’d like to end on a positive note - a story about how well applied development practices can save a project.

The term best practice is an oft repeated refrain in the software industry. But what is best practices? For three scientists and the dude they hired half way through the film best practice was simple - don’t cross the streams. This rule served them well throughout early development. But when a critical gigantic marshmallow themed issue appeared the Ghostbusters had the perspective to abandon best practice. When calculating the risk of stream crossing versus the threat posed by a titanic offbrand junk food mascot they were able to recognise the importance of adapting.

Streams crossed and day saved the Ghostbusters show us the necessity of flexibility for effective problem solving. It is important to learn from the past, but it is also important to recognise that every new problem is just that - new. And whether saving New York or deploying a new navigation bar creative problem solving will always be your best tool.
