import { z } from "zod";
export const ArticleSchema = z.object({
    webTitle: z.string(),
    apiUrl: z.string(),
    webUrl: z.string(),
    id: z.string(),
    webPublicationDate: z.string(),
    fields: z.object({
        byline: z.string().optional(),
        body: z.string().optional(),
    }),
    tags: z.array(
        z.object({
            id: z.string(),
            type: z.string(),
            webTitle: z.string(),
            webUrl: z.string(),
            apiUrl: z.string(),
            references: z.array(z.unknown()),
            internalName: z.string()
        })
    ).optional()
});

export type Article = z.infer<typeof ArticleSchema>;

export const CapiSearchResponseSchema = z.object({
    response: z.object({
        currentPage: z.number(),
        results: z.array(ArticleSchema),
        pageSize: z.number(),
        pages: z.number(),
    }),
});

export type CapiSearchResponse = z.infer<typeof CapiSearchResponseSchema>;

export const CapiSearchParamsSchema = z.object({
    q: z.string().optional(),
    "api-key": z.string(),
    "show-fields": z.string().optional(),
    "show-tags": z.string().optional(),
    "page-size": z.string().optional(),
    "page": z.string().optional(),
    "order-by": z.string().optional(),
    "from-date": z.string().optional(),
    "to-date": z.string().optional(),
    "star-rating": z.string().optional(),
    "contains-element": z.string().optional(),
    type: z.string().optional(),
});

export type CapiSearchParams = z.infer<typeof CapiSearchParamsSchema>;