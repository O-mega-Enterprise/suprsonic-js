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
import { bindGeneratedMethods } from "./generated.js";
export class Suprsonic {
    apiKey;
    baseUrl;
    emails;
    profiles;
    companies;
    documents;
    constructor(apiKey, baseUrl = "https://suprsonic.ai") {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl.replace(/\/$/, "");
        this.emails = this.namespace("emails");
        this.profiles = this.namespace("profiles");
        this.companies = this.namespace("companies");
        this.documents = this.namespace("documents");
        // Bind all auto-generated convenience methods (search, scrape, screenshot, etc.)
        const generated = bindGeneratedMethods(this);
        for (const [name, fn] of Object.entries(generated)) {
            if (!(name in this)) {
                this[name] = fn;
            }
        }
    }
    namespace(capability) {
        return { find: (params) => this.run(capability, params) };
    }
    /** Call any capability via the Agent API. */
    async run(capability, params = {}) {
        const resp = await fetch(`${this.baseUrl}/v1/agent`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ capability, params }),
        });
        const body = await resp.json();
        // Handle non-envelope responses (401, 429, etc. return {"detail": ...})
        if (body.detail && body.success === undefined) {
            const detail = typeof body.detail === "object" ? body.detail : { title: String(body.detail), status: resp.status };
            return { success: false, data: null, error: detail, metadata: null, credits_used: 0 };
        }
        return {
            success: body.success ?? false,
            data: body.data ?? null,
            error: body.error ?? null,
            metadata: body.metadata ?? null,
            credits_used: body.credits_used ?? 0,
        };
    }
}
