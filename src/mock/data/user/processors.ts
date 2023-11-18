import db from "@mock/data/db.json";

export function generateToken() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
}

export function generateRefreshToken() {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let refreshToken = "";
  for (let i = 0; i < 64; i++) {
    refreshToken += characters[Math.floor(Math.random() * characters.length)];
  }
  return refreshToken;
}

export function verifyRefreshToken(refreshToken: string): boolean {
  const user = db.user;

  return user.refreshToken === refreshToken;
}

export function verifyAccessToken(accessToken: string | null): boolean {
  const user = db.user;

  if (accessToken) {
    const [_, token] = accessToken.split(" ");
    return token === user.token;
  }

  return false;
}
