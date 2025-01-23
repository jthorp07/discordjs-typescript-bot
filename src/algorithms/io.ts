import { readdirSync } from 'fs';
import { join } from 'path';
import { instance as logger } from '../bot_systems/logger/logger';

export function readDirectoryToArray<T>(dirPath: string): T[] {
  logger.log(`Reading directory ${dirPath}`, "Info", "IO");
  const arr: T[] = [];
  const files = readdirSync(dirPath).filter(file => file.endsWith('.js'));
  for (const file of files) {
    try {
      logger.log(`Reading file ${file}`, "Info", "IO");
      const item = require(join(dirPath, file)).default as T;
      arr.push(item);
    } catch (err) {
      logger.log(`Error reading file ${file}:\n  ${err}`, "Warn", "IO");
    }
  }
  return arr;
}

export function readDirectoryToMap<K, T>(dirPath: string, keyFunc: (item: T) => K): Map<K, T> {
  logger.log(`Reading directory ${dirPath}`, "Info", "IO");
  const map = new Map<K, T>();
  const files = readdirSync(dirPath).filter(file => file.endsWith('.js'));
  for (const file of files) {
    try {
      logger.log(`Reading file ${file}`, "Info", "IO");
      const item = require(join(dirPath, file)).default as T;
      map.set(keyFunc(item), item);
    } catch (err) {
      logger.log(`Error reading file ${file}:\n  ${err}`, "Warn", "IO");
    }
  }
  return map;
}

export function readDirectoryThen<T>(dirPath: string, callback: (item: T) => void) {
  logger.log(`Reading directory ${dirPath}`, "Info", "IO");
  const files = readdirSync(dirPath).filter(file => file.endsWith('.js'));
  for (const file of files) {
    try {
      logger.log(`Reading file ${file}`, "Info", "IO");
      const item = require(join(dirPath, file)).default as T;
      callback(item);
    } catch (err) {
      logger.log(`Error reading file ${file}:\n  ${err}`, "Warn", "IO");
    }
  }
}