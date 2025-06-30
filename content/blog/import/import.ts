import {Article, CapiSearchParams, CapiSearchResponse, CapiSearchResponseSchema} from "./CapiTypes.ts";

const fetchArticles = async (currentPage = 1, results: Article[] = []): Promise<Article[]> => {

    if(!Bun.env.CONTENT_API_KEY) throw new Error("CONTENT_API_KEY is not set");

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const params: CapiSearchParams = {
        "api-key": /*Bun.env.CONTENT_API_KEY as string*/ "gnm-test-internal",
        "type": "article",
        "show-fields": ["byline", "body"].join(","),
        "page-size": "200",
        "tag": "info/series/engineering-blog",
        // partial day data is misleading - end at yesterday
        "to-date": new Date().toISOString().split("T")[0],
        "page": currentPage.toString()
    };

    const baseUrl = new URL("https://content.guardianapis.com/search")
    const searchParams = new URLSearchParams(params)
    baseUrl.search = searchParams.toString()

    console.log("Searching Content API using: " + baseUrl.href);

    const capiResp = await fetch(baseUrl.href);
    if(!capiResp.ok) throw new Error(`Failed to fetch articles: ${capiResp.statusText}`);

    const searchResponse: CapiSearchResponse = CapiSearchResponseSchema.parse(await capiResp.json());

    results.push(...searchResponse.response.results);

    return searchResponse.response.pages > currentPage ? await fetchArticles(currentPage + 1, results) : results;
}


const fetchFromDcr = async (article: Article) => {
    const response = await fetch(article.webUrl + '.json?dcr');
    try {
        if (response.ok) {
            const dcrArticle = await response.json();
            return dcrArticle;
        } else if (response.status == 429) {
            //wait a few seconds and try again
            console.log("Rate limited, waiting 5 seconds before retrying");
            await new Promise(resolve => setTimeout(resolve, 5));
            return fetchFromDcr(article);
        } else {
            console.log("Unexpected response status: " + response.status);
            throw new Error(`Failed to fetch article: ${article.webUrl}`);
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            if (!response.url.startsWith("https://www.theguardian.com/")) {
                console.log("article was redirected to another platform, let's ignore it");
                return undefined;
            } else{
                console.log("article was not yet migrated to DCR, le's ignore it for the time being");
                return undefined;
                //console.log('There was a SyntaxError while parsing json', error);
                //throw new Error(`Failed to parse json for article: ${article.webUrl}`);
            }
        } else {
            console.log('There was an error', error);
            throw new Error(`Failed to fetch article: ${article.webUrl}`);
        }
    }
}

console.log("Import started");

const articles = await fetchArticles();

for (const article of articles) {   
    console.log("fetching: " + article.webUrl);
    const dcrArticle = await fetchFromDcr(article)
    if (dcrArticle) {
        const filename = 'dcr-' + article.id.replaceAll('/', '➡️') + '.json'; 
        console.log("writing: " + filename);
        /* We could add a Json beautify */
        await Bun.write("data/" + filename, JSON.stringify(dcrArticle));
    }
}

console.log("Import is finised!");