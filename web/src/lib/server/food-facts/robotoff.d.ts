import { paths } from "./schemas/robotoff";
type InsightQuery = paths["/insights"]["get"]["parameters"]["query"];
type InsightResponse = paths["/insights"]["get"]["responses"]["200"]["content"]["application/json"];
type AnnotateBody = paths["/insights/annotate"]["post"]["requestBody"]["content"]["application/x-www-form-urlencoded"];
export declare class Robotoff {
    /** The fetch function used for every request */
    private readonly fetch;
    /** The raw openapi-fetch client is used for every request exposed by the openapi schema */
    private readonly raw;
    constructor(fetch: typeof global.fetch);
    annotate(body: AnnotateBody): Promise<import("openapi-fetch").FetchResponse<{
        requestBody: {
            content: {
                "application/x-www-form-urlencoded": {
                    insight_id: string;
                    annotation: 0 | 1 | -1 | 2;
                    update?: 0 | 1;
                    data?: Record<string, never>;
                };
            };
        };
        responses: {
            200: {
                content: {};
            };
        };
    }, {
        body: {
            insight_id: string;
            annotation: 0 | 1 | -1 | 2;
            update?: 0 | 1;
            data?: Record<string, never>;
        };
    }, `${string}/${string}`>>;
    questionsByProductCode(code: number): Promise<{
        status?: "no_questions" | "found";
        questions?: Record<string, never>[];
    } | undefined>;
    insightDetail(id: string): Promise<{} | undefined>;
    /**
     * Fetches insights based on the provided query.
     *
     * @param {InsightQuery} query - The query object containing parameters for fetching insights.
     * @returns {Promise<InsightResponse | undefined>} A promise that resolves to the data from the insights endpoint
     *
     */
    insights(query: InsightQuery): Promise<InsightResponse | undefined>;
    loadLogo(logoId: string): Promise<import("openapi-typescript-helpers").SuccessResponse<{
        200: {
            content: {
                "application/json": {
                    status?: "no_questions" | "found";
                    questions?: Record<string, never>[];
                };
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    status?: "no_questions" | "found";
                    questions?: Record<string, never>[];
                    count?: number;
                };
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    status?: "no_questions" | "found";
                    questions?: Record<string, never>[];
                    count?: number;
                };
            };
        };
    } | {
        200: {
            content: {};
        };
    } | {
        200: {
            content: {
                "application/json": {
                    count: number;
                    questions: (string | number)[];
                    status: "found" | "no_questions";
                };
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    status?: "no_predictions" | "found";
                    predictions?: Record<string, never>[];
                    count?: number;
                };
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    insights?: import("./schemas/robotoff").components["schemas"]["InsightSearchResult"][];
                };
            };
        };
    } | {
        200: {
            content: {};
        };
    } | {
        200: {
            content: {
                "application/json": {
                    insights?: import("./schemas/robotoff").components["schemas"]["InsightSearchResult"][];
                    status?: "no_insights" | "found";
                    count?: number;
                };
            };
        };
    } | {
        200: {
            content: {};
        };
    } | {
        200: {
            content: {
                "text/csv": string;
            };
        };
        204: {
            content: never;
        };
        400: {
            content: never;
        };
    } | {
        200: {
            content: {
                "image/jpeg": string;
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    status?: "no_image_predictions" | "found";
                    image_predictions?: Record<string, never>[];
                    count?: number;
                };
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    logos: unknown[];
                    count: number;
                };
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    logos: unknown[];
                    count: number;
                };
            };
        };
    } | {
        200: {
            content: {
                "application/json": import("./schemas/robotoff").components["schemas"]["LogoANNSearchResponse"];
            };
        };
    } | {
        200: {
            content: {
                "application/json": import("./schemas/robotoff").components["schemas"]["LogoANNSearchResponse"];
            };
        };
    } | {
        200: {
            content: {
                "application/json": {
                    predictions: {
                        nutrients: Record<string, never>;
                        predictor_version: string;
                        predictor: string;
                        source_image: string;
                    };
                    image_ids: number[];
                    errors?: {
                        error?: string;
                        error_description?: string;
                    }[];
                };
            };
        };
        400: {
            content: never;
        };
    } | {
        200: {
            content: {
                "application/json": {
                    predictions: import("./schemas/robotoff").components["schemas"]["Prediction"][];
                };
            };
        };
        400: {
            content: never;
        };
    } | {
        200: {
            content: {
                "application/json": {
                    predictions?: {
                        lang?: string;
                        confidence?: number;
                    }[];
                };
            };
        };
        400: {
            content: never;
        };
    } | {
        200: {
            content: {
                "application/json": {
                    counts?: {
                        lang?: string;
                        count?: number;
                    }[];
                    percent?: {
                        lang?: string;
                        percent?: number;
                    }[];
                    image_ids?: number[];
                };
            };
        };
        400: {
            content: never;
        };
    }, `${string}/${string}`> | undefined>;
}
export {};
