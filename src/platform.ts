import { IDE, Platform } from "./globals";
import { isString } from "./typeGuards/isString";

const PLATFORMS = ["JetBrains", "VS Code", "Web"];

const isPlatform = (platform: unknown): platform is Platform =>
  isString(platform) && PLATFORMS.includes(platform);

export const getPlatform = (platform: unknown): Platform | null =>
  isPlatform(platform) ? platform : null;

export const platform = getPlatform(window.platform);

const IDES = ["IDEA", "Rider", "PyCharm"];

const isIDE = (ide: unknown): ide is IDE => isString(ide) && IDES.includes(ide);

export const getIDE = (ide: unknown): IDE | undefined =>
  isIDE(ide) ? ide : undefined;

export const ide = getIDE(window.ide);
