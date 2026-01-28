import { createHmac, randomBytes } from "crypto";

const CONSUMER_KEY = "audiomack-web";
const CONSUMER_SECRET = "bd8a07e9f23fbe9d808646b730f89b8e";

const STRICT_URI_RE = /[!'()*]/g;

function strictEncodeURIComponent(str: string) {
  return encodeURIComponent(String(str)).replace(
    STRICT_URI_RE,
    (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

function buildParamString(params: Record<string, string>) {
  return Object.keys(params)
    .sort()
    .map(
      (k) =>
        `${strictEncodeURIComponent(k)}=${strictEncodeURIComponent(params[k])}`
    )
    .join("&");
}

function generateSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  paramString: string
) {
  const baseString = `${method.toUpperCase()}&${strictEncodeURIComponent(
    url
  )}&${strictEncodeURIComponent(paramString)}`;
  const signingKey = `${strictEncodeURIComponent(consumerSecret)}&`;

  return createHmac("sha1", signingKey).update(baseString).digest("base64");
}

export function generateSignedUrl(method: string, baseUrl: string, additionalParams: Record<string, string> = {}) {
  const params: Record<string, string> = {
    ...additionalParams,
    oauth_consumer_key: CONSUMER_KEY,
    oauth_nonce: randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0",
  };

  const paramString = buildParamString(params);
  const signature = generateSignature(
    method,
    baseUrl,
    params,
    CONSUMER_SECRET,
    paramString
  );

  return `${baseUrl}?${paramString}&oauth_signature=${strictEncodeURIComponent(signature)}`;
}
