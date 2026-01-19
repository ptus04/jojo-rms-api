import { createHash } from "node:crypto";

// TODO: Use a stronger hashing algorithm
export const hashToBase64 = (v: string) => createHash("sha256").update(v).digest("base64");
