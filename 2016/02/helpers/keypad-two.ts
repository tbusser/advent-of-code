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
const keyA: Key = { value: 'A' };
const keyB: Key = { value: 'B' };
const keyC: Key = { value: 'C' };
const keyD: Key = { value: 'D' };

/* -------------------------------------------------------------------------- */

keyOne.neighbors = { U: null, R: null, D: keyThree, L: null };
keyTwo.neighbors = { U: null, R: keyThree, D: keySix, L: null };
keyThree.neighbors = { U: keyOne, R: keyFour, D: keySeven, L: keyTwo };
keyFour.neighbors = { U: null, R: null, D: keyEight, L: keyThree };
keyFive.neighbors = { U: null, R: keySix, D: null, L: null };
keySix.neighbors = { U: keyTwo, R: keySeven, D: keyA, L: keyFive };
keySeven.neighbors = { U: keyThree, R: keyEight, D: keyB, L: keySix };
keyEight.neighbors = { U: keyFour, R: keyNine, D: keyC, L: keySeven };
keyNine.neighbors = { U: null, R: null, D: null, L: keyEight };
keyA.neighbors = { U: keySix, R: keyB, D: null, L: null };
keyB.neighbors = { U: keySeven, R: keyC, D: keyD, L: keyA };
keyC.neighbors = { U: keyEight, R: null, D: null, L: keyB };
keyD.neighbors = { U: keyB, R: null, D: null, L: null };

/* ========================================================================== */

export { keyFive };
