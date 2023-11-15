import { generateToken, generateRefreshToken } from "./processors";
import db from "@mock/data/db.json";

/**
 * Get User flags
 */
export function getUserFlags() {
  return db.flags
}

/**
 * Update user tokens
 */
export function updateUserToken() {
  const userInfo = db.user;

  userInfo.token = generateToken();
  userInfo.refreshToken = generateRefreshToken();

  return userInfo;
}

/**
 * Get user info
 */
export function getUser() {
  return db.user;
}

