import * as crypto from "crypto";

function encryptPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
}

function verifyPassword(password: string, salt: string, hash: string) {
  const newHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return hash === newHash;
}

export { encryptPassword, verifyPassword };
