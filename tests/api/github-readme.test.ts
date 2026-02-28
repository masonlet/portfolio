import { describe, it, expect, beforeEach, vi } from "vitest";
import handler from "../../api/github-readme";

const mockRes = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis(),
  send: vi.fn().mockReturnThis(),
  setHeader: vi.fn().mockReturnThis(),
});

const mockReq = (overrides = {}) => ({
  method: "GET",
  query: { owner: "owner", repo: "repo" },
  ...overrides,
});

beforeEach(() => {
  vi.resetAllMocks();
  vi.stubGlobal("fetch", vi.fn());
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

describe("README handler", () => {
  it("returns 405 for non-GET methods", async () => {
    const req = mockReq({ method: "POST" });
    const res = mockRes();
    await handler(req as any, res as any);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it.each([
    [{ owner: "../bad", repo: "repo" }],
    [{ owner: "owner", repo: "" }],
    [{ owner: undefined, repo: "repo" }],
    [{ owner: ["array"], repo: "repo" }],
  ])("returns 400 for invalid query %o", async (query) => {
    const res = mockRes();
    await handler(mockReq({ query }) as any, res as any);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid or missing owner/repo" });
  });

  it("returns 429 when GitHub rate limit is exceeded", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 403,
      headers: { get: (h: string) => h === "x-ratelimit-remaining" ? "0" : null },
      text: vi.fn(),
    } as any);
    const res = mockRes();
    await handler(mockReq() as any, res as any);
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ error: "GitHub rate limit exceeded" });
  });

  it("proxies non-403 GitHub errors", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      headers: { get: () => null },
    } as any);
    const res = mockRes();
    await handler(mockReq() as any, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("returns 404 when README content is empty", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue(" "),
    } as any);
    const res = mockRes();
    await handler(mockReq() as any, res as any);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No README content found" });
  });

  it("returns processed HTML with correct headers on success", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue('<img src="image.png"><a href="doc.md">'),
    } as any);
    const res = mockRes();
    await handler(mockReq() as any, res as any);
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "text/html; charset=utf-8");
    expect(res.setHeader).toHaveBeenCalledWith("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    expect(res.status).toHaveBeenCalledWith(200);
    const html = vi.mocked(res.send).mock.calls[0]?.[0] as string;
    expect(html).toContain('https://raw.githubusercontent.com/owner/repo/HEAD/image.png');
    expect(html).toContain('https://github.com/owner/repo/blob/HEAD/doc.md');
    expect(html).toMatch(/^<div class="readme-content">/);
  });

  it("returns 500 on fetch throw", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network failure"));
    const res = mockRes();
    await handler(mockReq() as any, res as any);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
  });

  it("includes Authorization header when GITHUB_TOKEN is set", async () => {
    vi.stubEnv("GITHUB_TOKEN", "test-token");
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: vi.fn().mockResolvedValue("<p>content</p>"),
    } as any);
    const res = mockRes();
    await handler(mockReq() as any, res as any);
    const calls = vi.mocked(fetch).mock.calls;
    const options = calls[0]?.[1] as RequestInit;
    expect((options.headers as Record<string, string>)["Authorization"]).toBe("token test-token");  });
});
