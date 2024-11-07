import * as crypto from "crypto";

function saltAndHashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
}

function verifyPassword(password: string, salt: string, hash: string) {
  const hashToVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hashToVerify === hash;
}

export { saltAndHashPassword, verifyPassword };
