import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { OpenAIApi } from 'openai';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAIApi({ apiKey: openAiApiKey });

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
             query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
        getPdfSummary: builder.mutation({
            query: async (text) => {
                const response = await openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: `Summarize this data:\n\n${text}`,
                    max_tokens: 100,
                });
                return response.data;
            },
        }),
    }),
})

export const { useLazyGetSummaryQuery, useGetPdfSummaryMutation } = articleApi;
