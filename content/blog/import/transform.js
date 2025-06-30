
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const inputFolder = 'data';
const outputFolder = '../../../src/pages/blog';

const TurndownService = require('turndown');
const turndownService = new TurndownService();


function escapeSingleQuote(s) {
  if (s === undefined)
      return '';
  return s.replaceAll("'", "''");
}


function replaceLinkTags(html) {
  // This regex matches any <a> tag with any attributes and captures the text content
  const linkRegex = /<a\s+[^>]*>(.*?)<\/a>/gi;
  
  // Replace all matches with just the text content (captured in group 1)
  return html.replace(linkRegex, (match, text) => {
    return text;
  });
}

function removeHTML(s) {
  
  const withoutLink = replaceLinkTags(s);

  return withoutLink.replaceAll("<p>", "").replaceAll("</p>", "").replaceAll("<strong>", "").replaceAll("</strong>", "").replaceAll("<br>", "").replaceAll("&amp;","&");
}


function createDate(iso8601Timestamp) {
  const date = new Date(iso8601Timestamp);
  return new Intl.DateTimeFormat("en-CA", {timeZone: 'Europe/London', year: "numeric", month: "2-digit", day: "2-digit"}).format(date);
}

function mainImage(mainMediaElements) {
  if (mainMediaElements && mainMediaElements.length) {

  const largestImage = mainMediaElements[0].media.allImages.reduce((max, img) => parseInt(img.fields.width, 10) > parseInt(max.fields.width, 10) ? img : max);

    return {
        url: largestImage.url,//mainMediaElements[0].media.allImages[0].url,
        alt: escapeSingleQuote(mainMediaElements[0].data.alt),
        credit: mainMediaElements[0].data.credit
    };
  }
  return {url: '', alt: '', credit: ''};
}

function transformTags(allTags, headline, standfirst) {
  const series = allTags.filter(tag => tag.type === 'Series').filter(tag => tag.id !== 'info/series/engineering-blog').map(tag => tag.title);
  const keywords = allTags.filter(tag => tag.type === 'Keyword' && tag.id !== 'technology/technology' && tag.id !== 'info/info').map(tag => tag.title);

  if (standfirst.includes('Day in the Life')) {
    series.push('Day in the Life');
  }

  if (standfirst.includes('Play application') || standfirst.includes('Scala ') || standfirst.includes('Scala,') || standfirst.includes('SBT') || headline.includes('Scala ')) {
    keywords.push('Scala');
  }

  if (standfirst.includes('Elasticsearch') || standfirst.includes('Ophan')) {
    keywords.push('Elasticsearch');
  }

  if (standfirst.includes('Ophan')) {
    keywords.push('Ophan');
  }

   if (headline.includes('Scribe')  || standfirst.includes('Scribe')) {
    keywords.push('Scribe');
    keywords.push('Open source');
  }

  if (standfirst.includes('PostgreSQL') || headline.includes('PostgreSQL') || headline.includes('Postgres')) {
    keywords.push('PostgreSQL');
  }

  if (standfirst.includes('CSS-in-JS') || standfirst.includes('Sass')) {
    keywords.push('CSS');
  }

  if (standfirst.includes('DynamoDB')) {
    keywords.push('DynamoDB');
    keywords.push('AWS');
  }

  if (standfirst.includes('Aurora') || standfirst.includes('RDS')) {
    keywords.push('AWS');
  }

  if (standfirst.includes('AWS')) {
    keywords.push('AWS');
  }

  if (standfirst.includes('accessibility') || headline.includes('accessibility')) {
    keywords.push('Accessibility');
  }

  if (standfirst.includes('Git') || headline.includes('Git')) {
    keywords.push('Git');
  }

  if (standfirst.includes('type classes')) {
    keywords.push('Scala');
    keywords.push('Functional programming');
  }

  if (headline.includes('Functional Programming')) {
    keywords.push('Functional programming');
  }


  if (headline.toLowerCase().includes('hack day')) {
    keywords.push('Hack day');
  }

  if (headline.includes('DevOps') || standfirst.includes('DevOps')) {
    keywords.push('DevOps');
  }

  if (headline.includes('Typerighter') || standfirst.includes('Typerighter')) {
    keywords.push('Typerighter');
  }

  if (headline.includes('Pinboard') || standfirst.includes('Pinboard')) {
    keywords.push('Pinboard');
  }

  if (standfirst === 'Code readability matters') {
    keywords.push('Programming');
  }

  if(headline === 'Compile-to-JavaScript languages') {
    keywords.push('JavaScript');
  }

  if (headline === 'Device wall of awesome: how Lego helped our digital development') {
    keywords.push('Testing');
    keywords.push('Lego');
  }

  if (headline.includes('machine learning') || standfirst.includes('machine learning')) {
    keywords.push('ML');
  }

  if (headline.includes('Tor') || standfirst.includes('Tor')) {
    keywords.push('Tor');
  }

  if (headline.includes('JavaScript') || standfirst.includes('JavaScript')) {
     keywords.push('JavaScript');
  }

  if (headline.includes('Typescript') || standfirst.includes('Typescript')) {
    keywords.push('TypeScript');
  }

  if (headline.includes('React') || standfirst.includes('React')) {
    keywords.push('React');
  }


  if (headline.includes('Android') || standfirst.includes('Android')) {
    keywords.push('Android');
  }

  if (headline.includes('Content API ') || standfirst.includes('Content API ')) {
    keywords.push('Content API');
  }

  if (headline.includes('Python') || standfirst.includes('Python')) {
    keywords.push('Python');
  }

  if (headline.toLowerCase().includes('security') || standfirst.toLowerCase().includes('security')) {
    keywords.push('Security');
  }

  if (headline.toLowerCase().includes('testing')) {
    keywords.push('Testing');
  }


  //TODO remove Activate conference
  //TODO remove specific WorldCup tag
  //TODO remove "Guardian%20app%20for%20Android"
  //TODO remove "Guardian Discovery Week 2012"
  //TODO Remove "Job hunting", "Tags are magic", "Artificial intelligence (AI)" should be AI
  //TODO Remove "Reading the riots"
  //TODO Review "Activate conference"

  //TODO conferences (http://localhost:4321/blog/dcr-info-developer-blog-2016-jul-02-git-merge-2016/)

  return [ ...new Set(series.concat(keywords).map(t => escapeSingleQuote(t)))]; 
}

async function transformBody(elements, id) {

  function extractUrlFromScriptTag(scriptTagString) {

    /* Use a regular expression to match the URL between src=" and "*/
    const regex = /src="([^"]+)"/;
    /* Apply the regex to the string */
    const match = scriptTagString.match(regex);
    return match ? match[1] : null;
  }

  async function fetchGistContent(gistEmbedUrl) {
    try {
      const rawUrl = gistEmbedUrl.slice(0,-3) + '/raw';
      const response = await fetch(rawUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }
  
      const content = await response.text();
      return content;
    } catch (error) {
      console.error('Error fetching gist content:', error);
      throw error;
    }
  }

  async function transformImageElement(element) {

    const imgSources = element.imageSources.filter(src => src.weighting === 'inline')[0].srcSet;
    const imgSource = imgSources.reduce((max, img) => img.width > max.width ? img : max);

    const isSupporting = element.role === 'supporting';

    const cssClass = isSupporting ? ` class="supporting"` : '';  /* intentionally not support thumbnail here */

    const credit = isSupporting ? '':  element.data.credit; /* hide credit when supporting */


    return `
   <figure${cssClass}>
   <img alt="${element.data.alt}" src="${imgSource.src}" loading="lazy" />
   <figcaption>
     ${element.data.caption}
    <i>${credit}</i>
    </figcaption>
    </figure>`;
  }

  async function transformVideoYoutubeElement(element) {

    const title = element.caption || '';
    const src = element.embedUrl || element.url;

    return `<figure>
                <iframe class="video" src="${src}" title="${title}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>`;

  }

  async function transformYoutubeElement(element) {

    const title = element.mediaTitle || '';
    const src = 'https://youtube.com/embed/' + element.assetId;

    return `<figure>
                <iframe class="video" src="${src}" title="${title}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>`;

  }

  async function transformVimeoEmbedElement(element) {

    return `<figure>
              ${element.html}
            </figure>`;
  }

  async function transformVimeoBlockElement(element) {

    return `<figure>
              <iframe class="video" src="${element.embedUrl}" title="${element.title}" allowfullscreen></iframe>
              <figcaption>${element.caption}</figcaption>
            </figure>`;
  }

  async function transformUploadEmbedElement(element) {

    return `<figure>
              <div style="width:50%; margin:auto;">${element.html}</div>
              <figcaption>${element.caption}</figcaption>
            </figure>`;
  }

  async function transformInteractiveElement(element) {

    return `<figure>
              <iframe src="${element.url}" width="100%" height="700px" allowfullscreen></iframe>
              <figcaption>${element.caption}</figcaption>
            </figure>`;
  }

  async function transformExplainerAtomBlockElement(element) {

    const cleanBody = removeHTML(element.body);

    return `<hr>
              <hgroup>
              <h4>${element.title}</h3>
              <small>${cleanBody}</small>
            </hgroup>
            <hr>
    `;
  }


  async function transformElement(element, id) {

    if (element._type === 'model.dotcomrendering.pageElements.TextBlockElement') {

      /* remove double encoding */
      const removeDoubleEncoding =  (html) => html.replaceAll('<strong><strong>','<strong>').replaceAll('</strong></strong>','</strong>');

      /* fix wrong order for strong close tag to new breakinbg line, e.g <p><strong>I’m not based in the UK, can I still apply?<br></strong>Yes</p> */
      const reorderBrAfterClosingStrongTag = (html) => html.replaceAll('<br></strong>', '</strong><br>');

      /* fix wrong order for strong start tag to new breakinbg line, e.g <strong><br>\n  Privacy</strong>*/
      const reorderBrBeforeStartingStrongTag = (html) => html.replaceAll('<strong><br>', '<br><strong>');

      const betterHtml = reorderBrBeforeStartingStrongTag(reorderBrAfterClosingStrongTag(removeDoubleEncoding(element.html)));

      return turndownService.turndown(betterHtml);

    } else if (element._type === 'model.dotcomrendering.pageElements.SubheadingBlockElement') {
    
      const semanticHtml = element.html.replaceAll("<br>","").replaceAll("<strong>", "").replaceAll("</strong>", "");
      return turndownService.turndown(semanticHtml);

    } else if (element._type === 'model.dotcomrendering.pageElements.BlockquoteBlockElement') {

      const cleanedHtml = element.html.replaceAll('<h2>', '').replaceAll('</h2>','').replaceAll('<br></strong>', '</strong><br>');

      return turndownService.turndown(cleanedHtml);

    } else if (element._type === 'model.dotcomrendering.pageElements.PullquoteBlockElement') {

      return `<blockquote class='pullstring'>${element.html}</blockquote>`;

    } else if (element._type === 'model.dotcomrendering.pageElements.ImageBlockElement') {

      return transformImageElement(element);

    } else if (element._type === 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement') {

      return transformVideoYoutubeElement(element);

    } else if (element._type === 'model.dotcomrendering.pageElements.YoutubeBlockElement') {

      return transformYoutubeElement(element);

    } else if (element._type === 'model.dotcomrendering.pageElements.EmbedBlockElement' && element.sourceDomain === 'player.vimeo.com') {

      return transformVimeoEmbedElement(element);

    } else if (element._type === 'model.dotcomrendering.pageElements.VideoVimeoBlockElement') {

      return transformVimeoBlockElement(element);

    } else if (element._type === 'model.dotcomrendering.pageElements.CodeBlockElement') {

      const code = element.html.endsWith('\n') ? element.html : element.html + '\n';

      const codeLang = (() => {
        if (element.html.startsWith('sudo') || element.html.startsWith('qubesctl') || element.html.startsWith('wget') || element.html.startsWith('curl') || element.html.startsWith('#!/bin/bash') || element.html.startsWith('$ git '))
          return 'bash';
        else
          return element.language;
      })();

      return `\`\`\`${codeLang}\n${code}\`\`\``;

    } else if (element._type === 'model.dotcomrendering.pageElements.EmbedBlockElement' && element.sourceDomain === 'gist.github.com') {

      const gistUrl = extractUrlFromScriptTag(element.html);

      const code = await fetchGistContent(gistUrl) + '\n'; //fetched gist don't contain new line

      const codeLang = (() => {
        if (id === 'info/developer-blog/2014/dec/11/functional-android') {
          return 'java';
        }
        return'';
      })();

      return `\`\`\`${codeLang}\n${code}\`\`\``;

    } else if (element._type === 'model.dotcomrendering.pageElements.GuideAtomBlockElement') {

      /* CTA to apply to join the department, this should not be in the content */
      return '';

    } else if(element._type === 'model.dotcomrendering.pageElements.RichLinkBlockElement') {

      /* We have decommissioned rich links */
      return '';

    } else if(element._type === 'model.dotcomrendering.pageElements.EmbedBlockElement' && (element.sourceDomain === 'spreadsheets.google.com' || element.sourceDomain === 'spreadsheets2.google.com') &&  element.source === 'Spotify') {
      /* old signup form badly categorised as Spotify */
      return '';

    } else if(element._type === 'model.dotcomrendering.pageElements.EmbedBlockElement' && element.html.includes('uploads.guim.co.uk')) {
      return transformUploadEmbedElement(element);

    } else if(element._type === 'model.dotcomrendering.pageElements.TweetBlockElement') {
      /* use the fallback HTML instead of embedding twitter/X */
      return `${element.html}`;

    } else if(element._type === 'model.dotcomrendering.pageElements.GuVideoBlockElement') {
      /* use the HTML */
      return `${element.html}`;

    } else if (element._type === 'model.dotcomrendering.pageElements.AudioBlockElement') {

      /* only one empty element, so ignore */
      return '';

    } else if(element._type === 'model.dotcomrendering.pageElements.EmbedBlockElement') {
      /**/
      return `${element.html}`;

    } else if(element._type === 'model.dotcomrendering.pageElements.InteractiveBlockElement') {
      
      return transformInteractiveElement(element);

    } else if(element._type === 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement') {
      
      return transformExplainerAtomBlockElement(element); 
    
    } else {
      return `\\ UNSUPPORTED ELEMENT FIX ME - ${element._type} - ${element.sourceDomain} \\`;
    }

  }


  const body = [];

  for (const element of elements) {
    const transformedElement = await transformElement(element, id);
    body.push(transformedElement);
  }

  /* remove empty elemen and ensure enough space between element */
  return body.filter(e => e !== '').join('\n\n'); 
}

function createSlug(originalFilename) {
  /* remove 'dcr-' and convert arrow emoji into hyphen */
  return originalFilename.slice(4).slice(0, -5).replaceAll('➡️','-');
}

function createAuthorArray(byline) {
  /* clean byline from quote and HTML elements */
  const cleanByline = escapeSingleQuote(removeHTML(byline || 'Unknown'));

  /* First replace the ' and ' string with a comma to simplify splitting*/
  const processedText = cleanByline.replace(/ and /g, ", ").replace(/ & /g, ", ").replace(/ with help from /g, ", ");

  /* special cases */
  if (cleanByline == ('Anne ByrneCalum CampbellKate Whalen'))
    return ('Anne Byrne, Calum Campbell, Kate Whalen');
  else if (cleanByline == ('Natalia BaltazarJon Norman'))
    return ('Natalia Baltazar, Jon Norman');
  else if (cleanByline == ('Francesca Hammond David Lawes'))
    return ('Francesca Hammond, David Lawes');
  else if (cleanByline == ('Maria-Livia ChioreanSusie ColemanEmma MilnerJonathan Rankin'))
    return ('Maria-Livia Chiorean, Susie Coleman, Emma Milner, Jonathan Rankin');
  else if (cleanByline == ('Tom Richards (with contributions from Ana Pradas)'))
    return ('Tom Richards, Ana Pradas');
  else if (cleanByline == ('Jorge AzevedoScott Painter'))
    return ('Jorge Azevedo, Scott Painter');
  else
    return processedText;
}

async function processJsonFiles() {
  try {
    
    /* Create a list of all files in the folder */
    const files = await readdir(inputFolder);
    
    /* Filter for only JSON files */
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    if (jsonFiles.length === 0) {
      console.log('No JSON files found in the specified folder.');
      return;
    }
    
    console.log(`Found ${jsonFiles.length} JSON files. Processing...`);
  
    
    /* Process each JSON file */
    for (const file of jsonFiles) {

      const filePath = join(inputFolder, file);
      
      try {

        /* Read and parse the JSON file */

        const content = await readFile(filePath, 'utf8');
        const jsonData = JSON.parse(content);

        /* Transform the data */

        const slug = createSlug(file);

        const headline = escapeSingleQuote(jsonData.headline || '');
        const standfirst = escapeSingleQuote(removeHTML(jsonData.standfirst || ''));
        const author = createAuthorArray(jsonData.author.byline);
        const pubDate = createDate(jsonData.webPublicationDate);
        const image = mainImage(jsonData.mainMediaElements);

        /* This can be useful to improve DX by displaying a link to the original article */
        //const debug = { canonical: jsonData.canonicalUrl};

        const tags = transformTags(jsonData.tags, headline, standfirst).sort();

        const body = await transformBody(jsonData.blocks[0].elements, jsonData.pageId);


        const defaultImageContent = `
image:
  url: '${image.url}'
  alt: '${image.alt}'
  credit: '${image.credit}'`;

        const imageContent = image.url ? defaultImageContent : ''; 

        const blogContent = `---
layout: ../../layouts/blog.astro
slug: '${slug}'
headline: '${headline}'
date: '${pubDate}'
authors: [${author}]
standfirst: '${standfirst}'${imageContent}
tags: [${tags.join(', ')}]
---

${body}
`;

        const outputFilname = slug + '.md';
        const outputPath = outputFolder + '/' + outputFilname;

        await Bun.write(outputPath, blogContent);

        console.log(`Written: ${outputFilname}`);

      } catch (error) {
        console.error(`Error processing ${file}: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

// Run the function
processJsonFiles();