import { createHmac } from "crypto";

const CONSUMER_KEY = process.env.AUDIOMACK_CONSUMER_KEY || "audiomack-web";
const CONSUMER_SECRET = process.env.AUDIOMACK_CONSUMER_SECRET || "bd8a07e9f23fbe9d808646b730f89b8e";

export function generateOAuthHeader(method: string, url: string, params: Record<string, string> = {}) {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0",
    ...params,
  };

  const urlObj = new URL(url);

  const allParams: Record<string, string> = { ...oauthParams };
  urlObj.searchParams.forEach((value, key) => {
    allParams[key] = value;
  });

  const sortedKeys = Object.keys(allParams).sort();
  const paramString = sortedKeys
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(allParams[key]!)}`)
    .join("&");

  const baseString = `${method.toUpperCase()}&${encodeURIComponent(
    urlObj.origin + urlObj.pathname
  )}&${encodeURIComponent(paramString)}`;

  const signingKey = `${encodeURIComponent(CONSUMER_SECRET)}&`;

  const hmac = createHmac("sha1", signingKey);
  hmac.update(baseString);
  const signature = hmac.digest("base64");

  oauthParams.oauth_signature = signature;

  const header = Object.keys(oauthParams)
    .sort()
    .map((key) => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key]!)}"`)
    .join(", ");

  return `OAuth ${header}`;
}
