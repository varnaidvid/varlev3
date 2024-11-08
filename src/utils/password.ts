import * as crypto from "crypto";

function saltAndHashPassword(_password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const password = crypto
    .pbkdf2Sync(_password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, password };
}

function verifyPassword(password: string, salt: string, hash: string) {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hashToVerify === hash;
}

export { saltAndHashPassword, verifyPassword };
