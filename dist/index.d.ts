/**
 * Suprsonic TypeScript SDK.
 *
 * Usage:
 *   import { Suprsonic } from "suprsonic";
 *
 *   const client = new Suprsonic("omk_your_key_here");
 *
 *   const result = await client.search("latest AI funding");
 *   const result = await client.emails.find({ first_name: "Yuma", last_name: "Heymans", domain: "o-mega.ai" });
 *   const result = await client.run("scrape", { url: "https://example.com", mode: "thorough" });
 *
 * All convenience methods (search, scrape, executeCode, screenshot, etc.)
 * are auto-generated from unified-apis.json. Use client.run() for any capability.
 */
import { type GeneratedMethods } from "./generated.js";
export interface SuprsonicResult {
    success: boolean;
    data: Record<string, unknown> | null;
    error: {
        type?: string;
        title?: string;
        detail?: string;
        is_retriable?: boolean;
    } | null;
    metadata: {
        provider_used?: string;
        providers_tried?: string[];
        response_time_ms?: number;
        request_id?: string;
    } | null;
    credits_used: number;
}
interface CapabilityNamespace {
    find(params: Record<string, unknown>): Promise<SuprsonicResult>;
}
export interface Suprsonic extends Omit<GeneratedMethods, "emails" | "profiles" | "companies" | "documents"> {
}
export declare class Suprsonic {
    private apiKey;
    private baseUrl;
    emails: CapabilityNamespace;
    profiles: CapabilityNamespace;
    companies: CapabilityNamespace;
    documents: CapabilityNamespace;
    [key: string]: any;
    constructor(apiKey: string, baseUrl?: string);
    private namespace;
    /** Call any capability via the Agent API. */
    run(capability: string, params?: Record<string, unknown>): Promise<SuprsonicResult>;
}
export {};
