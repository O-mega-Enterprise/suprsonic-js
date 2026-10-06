# suprsonic

TypeScript SDK for [Suprsonic](https://suprsonic.ai). One API key, dozens of capabilities for your AI agent.

## Install

```bash
npm install suprsonic
```

## Usage

```typescript
import { Suprsonic } from "suprsonic";

const client = new Suprsonic("omk_your_key");

// Search the web
const result = await client.search("latest AI funding rounds");
console.log(result.data);

// Find a professional email
const email = await client.emails.find({
  first_name: "Yuma", last_name: "Heymans", domain: "o-mega.ai"
});
console.log(email.data.email);

// Scrape a webpage
const page = await client.scrape("https://example.com");
console.log(page.data.content);

// Any capability via .run()
const screenshot = await client.run("screenshot", { url: "https://example.com" });
```

## Response Format

Every method returns a unified response object:

```json
{
  "success": true,
  "data": {
    "results": [
      { "title": "OpenAI raises $6.6B", "url": "https://...", "snippet": "..." }
    ]
  },
  "error": null,
  "metadata": {
    "provider_used": "serperdev",
    "providers_tried": ["serperdev"],
    "response_time_ms": 1200,
    "request_id": "req_abc123"
  },
  "credits_used": 1
}
```

On failure, `success` is `false` and `error` contains the details (see below).

## Error Handling

```typescript
import { Suprsonic, SuprsonicError } from "suprsonic";

const client = new Suprsonic("omk_your_key");

try {
  const result = await client.search("latest AI funding rounds");
  if (!result.success) {
    // API returned an error response
    console.error(result.error.detail);
    if (result.error.is_retriable) {
      // Safe to retry after the suggested delay
      await sleep(result.error.retry_after_seconds * 1000);
    }
  }
} catch (err) {
  if (err instanceof SuprsonicError) {
    console.error(err.status, err.detail);
  }
}
```

Error object structure:

```json
{
  "type": "billing_error",
  "title": "Insufficient credits",
  "status": 402,
  "detail": "Your account has 0 credits remaining. Add credits at suprsonic.ai/app/billing.",
  "is_retriable": false,
  "retry_after_seconds": null,
  "error_category": "billing"
}
```

Error categories: `transient` (retry safe), `permanent` (bad request), `authentication` (invalid key), `billing` (out of credits).

## Agent Framework Examples

### OpenAI Function Calling

Use the `/v1/tools` endpoint to get Suprsonic capabilities as OpenAI-compatible function definitions:

```typescript
const toolsRes = await fetch("https://suprsonic.ai/v1/tools", {
  headers: { Authorization: "Bearer omk_your_key" },
});
const tools = await toolsRes.json();

// Pass directly to OpenAI
const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Search for recent SpaceX launches" }],
  tools: tools,
});
```

### Vercel AI SDK

```typescript
import { Suprsonic } from "suprsonic";
import { tool } from "ai";
import { z } from "zod";

const client = new Suprsonic("omk_your_key");

const searchTool = tool({
  description: "Search the web for current information",
  parameters: z.object({ query: z.string() }),
  execute: async ({ query }) => {
    const result = await client.search(query);
    return result.data;
  },
});
```

## All Capabilities

search, scrape, profiles, emails, images, tts, stt, sms, documents, companies, email-verify, transcribe, invoice-parse, subtitle, file-convert, bg-remove, screenshot

Full API reference with all parameters and example responses: [suprsonic.ai/apis](https://suprsonic.ai/apis)

Get your API key at [suprsonic.ai](https://suprsonic.ai).
