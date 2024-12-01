import { Key } from './types.js';

/* ========================================================================== */

const keyOne: Key = { value: '1' };
const keyTwo: Key = { value: '2' };
const keyThree: Key = { value: '3' };
const keyFour: Key = { value: '4' };
const keyFive: Key = { value: '5' };
const keySix: Key = { value: '6' };
const keySeven: Key = { value: '7' };
const keyEight: Key = { value: '8' };
const keyNine: Key = { value: '9' };

/* -------------------------------------------------------------------------- */

keyOne.neighbors = { U: null, R: keyTwo, D: keyFour, L: null };
keyTwo.neighbors = { U: null, R: keyThree, D: keyFive, L: keyOne };
keyThree.neighbors = { U: null, R: null, D: keySix, L: keyTwo };
keyFour.neighbors = { U: keyOne, R: keyFive, D: keySeven, L: null };
keyFive.neighbors = { U: keyTwo, R: keySix, D: keyEight, L: keyFour };
keySix.neighbors = { U: keyThree, R: null, D: keyNine, L: keyFive };
keySeven.neighbors = { U: keyFour, R: keyEight, D: null, L: null };
keyEight.neighbors = { U: keyFive, R: keyNine, D: null, L: keySeven };
keyNine.neighbors = { U: keySix, R: null, D: null, L: keyEight };

/* ========================================================================== */

export { keyFive };
