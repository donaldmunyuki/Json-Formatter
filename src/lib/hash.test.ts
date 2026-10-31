import { describe, it, expect } from "vitest";
import { decodeHash, encodeShare } from "./hash";

describe("share hash", () => {
  it("round-trips a document through /editor#", () => {
    const r = encodeShare('{"a":1}', "https://x.test");
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.url).toContain("/editor#");
      expect(decodeHash("#" + r.hash)).toBe('{"a":1}');
    }
  });
  it("rejects garbage", () => {
    expect(decodeHash("#garbage")).toBeNull();
    expect(decodeHash("")).toBeNull();
  });
});
