import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

class CryptoSecure {
  private static algorithm = "aes-256-cbc";
  private static secretKey = process.env.KEY as string;

  public static secureEncodeString = (str: string): string => {
    const iv = randomBytes(16);
    const cipher = createCipheriv(
      CryptoSecure.algorithm,
      CryptoSecure.secretKey,
      iv
    );
    let encrypted = cipher.update(str, "utf8", "base64");
    encrypted += cipher.final("base64");
    return `${iv.toString("hex")}:${encrypted}`;
  };

  public static secureDecodeString = (str: string): string => {
    const [ivHex, encrypted] = str.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = createDecipheriv(
      CryptoSecure.algorithm,
      CryptoSecure.secretKey,
      iv
    );
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };

  public static secureRandomString = (length: number): string => {
    const bytes = randomBytes(Math.ceil(length / 2));
    return bytes.toString("hex").slice(0, length);
  };

  public static secureCompareString = (a: string, b: string): boolean => {
    if (a.length !== b.length) {
      return false;
    }
    let result = 0;
    for (let i = 0; i < a.length; i++) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  };
}

export default CryptoSecure;
