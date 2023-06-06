import CryptoJS from "crypto-js";

export function makeSignature(_url) {
  const space = " ";
  const newLine = "\n";
  const method = "POST";
  const timestamp = Date.now().toString();
  const accessKey = process.env.SMS_ACCESS_KEY;
  const secretKey = process.env.SMS_SECRET_KEY;

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(_url);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);

  const hash = hmac.finalize();

  return hash.toString(CryptoJS.enc.Base64);
}
