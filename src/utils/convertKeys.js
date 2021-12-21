import { camelKeys, snakeKeys } from 'js-convert-case';

export const camelCaseKeys = obj => camelKeys(obj, { recursive: true, recursiveInArray: true });
export const snakeCaseKeys = obj => snakeKeys(obj, { recursive: true, recursiveInArray: true });
