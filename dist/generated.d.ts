import type { SuprsonicResult } from "./index.js";
export interface GeneratedMethods {
    /** Search the web with SERP, AI synthesis, or both. Cost: 2 credits. */
    search(query: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Extract content from any URL as Markdown or HTML. Cost: 2 credits. */
    scrape(url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Find and enrich professional profiles. Cost: 3 credits. */
    profiles(opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Find professional email addresses. Cost: 2 credits. */
    emails(first_name: string, last_name: string, domain: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Generate images from text prompts. Cost: 3 credits. */
    generateImage(prompt: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Convert text to speech audio. Cost: 2 credits. */
    tts(text: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Transcribe audio to text with timestamps. Cost: 2 credits. */
    stt(opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Generate sound effects and short music tracks from text prompts (NOT speech: use tts for spoken voice). Cost: 4 credits. */
    generateSound(prompt: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Send SMS or WhatsApp messages. Default channel is SMS (reliable delivery). WhatsApp requires recipient opt-in: they must have messaged your Business number within 24 hours. Cost: 1 credits. */
    sendMessage(to: string, message: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Extract structured data from URLs or content. Cost: 3 credits. */
    documents(extraction_prompt: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Enrich company data by domain. Cost: 3 credits. */
    companies(domain: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Check if an email is deliverable, catch-all, or disposable. Cost: 1 credits. */
    verifyEmail(email: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Transcribe audio with speaker diarization and timestamps. Cost: 3 credits. */
    transcribe(audio_url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Extract structured data from invoices and receipts. Cost: 3 credits. */
    parseInvoice(document_url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Generate SRT/VTT subtitles from audio or video. Cost: 2 credits. */
    generateSubtitles(audio_url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Convert documents, web pages, spreadsheets and images between formats. Cost: 2 credits. */
    convertFile(file_url: string, source_format: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Remove background from any image. Returns transparent PNG. Cost: 2 credits. */
    removeBackground(image_url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Capture a rendered screenshot of any webpage. Cost: 1 credits. */
    screenshot(url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Execute code in a secure sandbox with pre-configured environments. Cost: 2 credits. */
    executeCode(code: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Get comprehensive domain intelligence: WHOIS, DNS, SSL, tech stack, email security, hosting. Cost: 2 credits. */
    siteIntel(domain: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Multi-step deep research: search, scrape, enrich entities, and synthesize into a cited report. Cost: 10 credits. */
    research(query: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Extract video metadata, available formats, and thumbnail from any URL. Cost: 1 credits. */
    videoInfo(url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Download video from any URL and return a temporary download link. Cost: 3 credits. */
    videoDownload(url: string, opts?: Record<string, unknown>): Promise<SuprsonicResult>;
    /** Find domain names and the extensions that fit a business. Cost: 5 credits. */
    domains(opts?: Record<string, unknown>): Promise<SuprsonicResult>;
}
/** Generated method implementations. Call this inside the Suprsonic constructor. */
export declare function bindGeneratedMethods(client: {
    run(capability: string, params?: Record<string, unknown>): Promise<SuprsonicResult>;
}): GeneratedMethods;
