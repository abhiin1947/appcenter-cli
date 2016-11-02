// Information storage and retrieval about the current user
//
// Right now we only support a single logged in user

import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import * as mkdirp from "mkdirp";

import { environments } from "./environments";
import { profileFile, getProfileDir } from "../misc";
import { TokenValueType } from "../token-store";

const debug = require("debug")("sonoma-cli:util:profile:profile");

export interface Profile {
  userId: string;
  userName: string;
  displayName: string;
  email: string;
  environment: string;
  accessTokenId: string;
  readonly accessToken: Promise<TokenValueType>;
  endpoint: string;
  defaultApp?: DefaultApp;
}

export interface DefaultApp {
  ownerName: string;
  appName: string;
}

const validApp = /^([a-zA-Z0-9-_]{3,100})\/([a-zA-Z0-9-_]{3,100})$/;

export function toDefaultApp(app: string): DefaultApp {
  const matches = app.match(validApp);
  if (matches !== null) {
    return {
      ownerName: matches[1],
      appName: matches[2]
    };
  }
  return null;
}

let currentProfile: Profile = null;

function fileExists(filename: string): boolean {
  try {
    return fs.statSync(filename).isFile();
  }
  catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  return false;
}

function getProfileFilename(): string {
  const profileDir = getProfileDir();
  return path.join(profileDir, profileFile);
}

function loadProfile(): Profile {
  const profilePath = getProfileFilename();
  debug(`Loading profile from ${profilePath}`);
  if (!fileExists(profilePath)) {
    debug("No profile file exists");
    return null;
  }

  debug("Profile file loaded");
  let profileContents = fs.readFileSync(profilePath, "utf8");
  let profile: any = JSON.parse(profileContents);
  profile.accessToken = Promise.resolve(profile.accessToken);
  return profile as Profile;
}

export function getUser(): Profile {
  debug("Getting current user from profile");
  if (!currentProfile) {
    debug("No current user, loading from file");
    currentProfile = loadProfile();
    if (currentProfile && !currentProfile.endpoint) {
      currentProfile.endpoint = environments(currentProfile.environment).endpoint;
    }
  }
  return currentProfile;
}

export function saveUser(user: any, token: any, environment: string, ): Profile {
  let profile = {
    userId: user.id,
    userName: user.name,
    displayName: user.display_name || user.displayName,
    environment,
    email: user.email,
    accessTokenId: token.id,
    accessToken: token.api_token || token.apiToken,
    endpoint: environments(environment).endpoint
  };

  return saveProfile(profile);
}

export function saveProfile(profile: Profile): Profile {
  mkdirp.sync(getProfileDir());
  fs.writeFileSync(getProfileFilename(), JSON.stringify(profile), { encoding: "utf8" });
  return profile;
}

export function deleteUser() {
  try {
    fs.unlinkSync(getProfileFilename());
  } catch (err) {
    if (err.code !== "ENOENT") {
      // File not found is fine, anything else pass on the error
      throw err;
    }
  }
}
