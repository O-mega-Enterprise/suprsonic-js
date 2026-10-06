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

import { bindGeneratedMethods, type GeneratedMethods } from "./generated.js";

export interface SuprsonicResult {
  success: boolean;
  data: Record<string, unknown> | null;
  error: { type?: string; title?: string; detail?: string; is_retriable?: boolean } | null;
  metadata: { provider_used?: string; providers_tried?: string[]; response_time_ms?: number; request_id?: string } | null;
  credits_used: number;
}

interface CapabilityNamespace {
  find(params: Record<string, unknown>): Promise<SuprsonicResult>;
}

// Declaration merging: adds generated method types (search, scrape, etc.) for autocomplete,
// excluding the four that are redefined as CapabilityNamespace objects below.
export interface Suprsonic extends Omit<GeneratedMethods, "emails" | "profiles" | "companies" | "documents"> {}

export class Suprsonic {
  private apiKey: string;
  private baseUrl: string;

  public emails: CapabilityNamespace;
  public profiles: CapabilityNamespace;
  public companies: CapabilityNamespace;
  public documents: CapabilityNamespace;

  // Generated convenience methods are bound in the constructor
  [key: string]: any;

  constructor(apiKey: string, baseUrl = "https://suprsonic.ai") {
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
        (this as any)[name] = fn;
      }
    }
  }

  private namespace(capability: string): CapabilityNamespace {
    return { find: (params) => this.run(capability, params) };
  }

  /** Call any capability via the Agent API. */
  async run(capability: string, params: Record<string, unknown> = {}): Promise<SuprsonicResult> {
    const resp = await fetch(`${this.baseUrl}/v1/agent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ capability, params }),
    });

    const body = await resp.json() as any;

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
