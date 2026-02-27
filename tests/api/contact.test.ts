import { describe, it, expect, beforeEach, vi } from "vitest";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../../api/contact";

const mockResendSend = vi.hoisted(() => vi.fn());

vi.mock("resend", () => ({
  Resend: function Resend() {
    return { emails: { send: mockResendSend } };
  }
}));

const createReq = (body: unknown, method = "POST"): VercelRequest => ({
  method,
  body,
  query: {},
  headers: {},
  cookies: {}
} as VercelRequest);

const createRes = () => {
  const res: VercelResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    setHeader: vi.fn(),
    send: vi.fn()
  } as unknown as VercelResponse;
  return res;
};

describe("contact API handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env["RESEND_API_KEY"] = "test-key";
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("returns 405 for non-POST methods", async () => {
    const req = createReq({}, "GET");
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("returns 400 for invalid body (missing fields)", async () => {
    const req = createReq({ subject: "test", email: "test@example.com" });
    const res = createRes();

    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  it("returns 400 for invalid body (wrong types)", async () => {
    const req = createReq({ subject: 123, email: null, message: true });
    const res = createRes();

    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "All fields are required" });
  });

  it("returns 400 for invalid body (null)", async () => {
    const req = createReq(null);
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 for invalid body(non-object)", async () => {
    const req = createReq("string");
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("returns 400 for empty strings", async () => {
    const req = createReq({ subject: "", email: "", message: "" });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("sends email successfully", async () => {
    mockResendSend.mockResolvedValue({} as any);
    const req = createReq({
      subject: "Test Subject",
      email: "test@example.com",
      message: "Test message"
    });
    const res = createRes();

    await handler(req, res);

    expect(mockResendSend).toHaveBeenCalledWith({
      from: "noreply@masonletoile.ca",
      to: "contact@masonletoile.ca",
      subject: "Contact form: Test Subject",
      text: "From: test@example.com\n\nTest message"
    });
    expect(res.status).not.toHaveBeenCalledWith(expect.any(Number));
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Message sent successfully"
    });
  });

  it("handles send error (500)", async () => {
    mockResendSend.mockRejectedValue(new Error("API error"));
    const req = createReq({
      subject: "Test",
      email: "test@example.com",
      message: "Test msg"
    });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to send message" });
  });

  it("handles missing RESEND_API_KEY (500)", async () => {
    delete process.env["RESEND_API_KEY"];
    const req = createReq({ subject: "test", email: "test@test.com", message: "test" });
    const res = createRes();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
