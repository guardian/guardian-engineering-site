---
layout: ../../layouts/blog.astro
slug: 'info-2019-may-10-structured-content-benefits-for-creating-and-publishing-articles'
headline: 'Structured content: benefits for creating and publishing articles'
date: '2019-05-10'
authors: [Sakib Supple]
standfirst: 'Starting with a content model to create structured content saves publishers money and makes production more efficient'
image:
  url: 'https://media.guim.co.uk/70e8f7fcb88cbc3b9319d92e8eb9e974f2c46918/40_275_3320_1992/3320.jpg'
  alt: 'The Guardian newsroom in the 1970s'
  credit: 'Photograph: Guardian News & Media Archive'
tags: [Computing, Software]
---

Colleagues from the Guardian newsroom pictured above would not recognise how we work today: a ‘create once publish everywhere’ approach to creating articles. Once published, our journalism in all its forms can be reused many times, sometimes without further human intervention. The benefits of this are more efficient workflows for creating content, and cheaper and more automated ways to repurpose that journalism on print and digital platforms.

The structure of the journalism we publish is simple: articles that consist of text and pictures, sometimes enhanced on digital platforms with multimedia such as video and audio. We treat material for publication as discrete pieces of data, containing text and media together with machine readable descriptions of that content.

In the early noughties we decided to develop our own editorial system – the tool used by editorial staff to manage and create articles and newspaper pages. We used best-of-breed desktop applications Adobe InDesign for page layout and Adobe InCopy for text editing. These applications provide industry leading functionality, however they do not come with any workflow or other capabilities needed to manage structured content.

Missing features include:

*   A standardised way for one person work on the headline of a story while another deals with the pictures, and another edits the main text
    
*   A way to mark parts of a page or individual story elements as being at different states of readiness for publication – give each one a different workflow status
    
*   Ability to markup parts of text in a file for publication to different platforms – some paragraphs can be for web only, while other parts for print only, with the rest for all platforms
    
*   Management of the legal status of stories or parts of a story
    
*   Management of syndication rights for stories or parts of a story – these specify if others are allowed to republish our content
    
*   Ability to tag articles with keyword and tone information, for example whether it is a comment, feature or news piece

No off-the-shelf system available at the time offered the capabilities we wanted, so we built our own. We designed a workflow database using Oracle RDBMS, together with our own middleware to allow multi-user access to that database from desktop applications like InDesign, InCopy and Photoshop.

This also meant we could design the database to handle the structure of the content we intended to publish, adding workflow and management information to that content as required.

Crucially, we were able to build in the flexibility to handle new content types, for example video, that we expected to publish in the future. Over the years, adding support for new digital platforms has been a simple task, and the in-house developed digital systems use the same content model.

The system we created, the Octopus Editorial System (OES), is what we still use to write and manage articles for print. The technology behind it is simple and robust, and has stood the test of time having published the Guardian and Observer in Berliner and tabloid formats, while integrating closely with new online and mobile publishing platforms.


   <figure>
   <img alt="Illustration showing the journey from content model, to structured content through to publication" src="https://i.guim.co.uk/img/media/95be5627a19f0374a3df5c5ad8d9da15dc29bc3e/0_0_1748_983/master/1748.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f87c6dd5280ed3b8c967d5906c51259e" loading="lazy" />
   <figcaption>
     Illustration showing the journey from content model, to structured content through to publication
    <i>Illustration: Sakib Supple/Internal guardian</i>
    </figcaption>
    </figure>

Key to the success of OES is the way that it encourages the creation and management of content in a structured way, with a database design that handles metadata for individual pieces of content we create.

How does structure help content creation?
-----------------------------------------

Discussion of structured content often focuses on its repurposing and reuse. However the approach also brings advantages for our content creation workflows.

Using our OES editorial system, staff can edit an entire news story (headline, standfirst, image, body text) as a complete bundle of content (‘story bundle’). Or different editors can work on those four elements.

In this way, as publication deadlines loom, editors can concentrate effort on the stories, or parts of stories, that still need work and forget about everything that is already complete. This not only applies to stories destined for publication in print, but also for those being prepared for digital platforms.

The technology was designed with editorial staff in mind. When analysing their needs, it became apparent that the tools they required must manage content in a structured way in order to meet the demands of a fast-paced, multi-user, deadline-driven environment.

Preparing content for reuse
---------------------------

Once content has been completed, we have a bundle of content, with a well written headline, fact checked story content and appropriate picture that tells a story that is ready to publish on any platform.

Adding structure to our content allows it to be automatically sent to the Guardian’s [Content Application Programming Interface](https://open-platform.theguardian.com/) (Content API). The Content API is used to publish content to the Guardian and Observer websites, and is used internally to automate some tasks.

The Content API stores every piece of content already published, or that has been scheduled to be published, for the Guardian and Observer.

Fully automated workflows
-------------------------

The most obvious way to reuse our content is to sell it to other publishers.

For example, if the Guardian publishes an authoritative story about media, health or education, special interest publications in those industries may want to re-publish some of that content, and will pay for the privilege.

The structure of the story bundle is important here, since The Guardian may have rights to publish the pictures that are part of the story in print or on our website, but may not have rights to syndicate them.

The structured approach solves this by allowing syndication rights to be attached to individual parts of the story bundle, so the syndication process can be accurately automated.

The [Kindle Edition](https://www.amazon.co.uk/The-Guardian-and-the-Observer/dp/B004MME3M8) is generated automatically from the Content API without human intervention.

Using metadata carried with the story, this edition can honour the structure of the newspaper, putting stories in the correct section and page order they were published in print. This is an example of where our structured content is used to automatically create a product for publication every day.

Partially automated workflow
----------------------------

The [iPad Daily Edition](https://itunes.apple.com/gb/app/the-guardian-daily-edition/id452707806?mt=8) uses the Content API to automatically generate a first cut of stories from the paper.

This is a curated product, so although the process is partially automated, production staff intervene to enhance and change article content to add value. For example, the print version of a story will not include video, but the Content API could include video since this may have been added for the online version.

The iPad team can move stories between sections and label them as being about a similar topic. For example, articles about Brexit may be appear on the front page, the UK news section, the international section and the business section. All of these could be brought together in a Brexit section just for the iPad edition.

Although this approach does not adhere strictly to the ‘create once publish everywhere’ philosophy, it does simplify and speed up the production process, while allowing the iPad Daily Edition to remain a curated product.

Benefits for all
----------------

Structured content works well for a media company like The Guardian, but the same approach can work for any organisation that publishes large amounts of data on multiple platforms. Whether you’re a government department, art gallery, retailer or university.

Starting out with clearly defined structured content provides a sound foundation on which to build. It allows content to be efficiently created and published, and then quickly and economically repurposed for multiple publishing and syndication platforms.
