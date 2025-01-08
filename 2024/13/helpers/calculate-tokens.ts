import { Machine } from './parse-input.js';

/* ========================================================================== */

// To explain the code I will be using this example:
// Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400
//
// The challenge description already gives us the equations we need to solve to
// find the number of button presses. I've included the equations below along
// with translation to the properties of my Machine type.
// 1) (a * 94) + (b * 22) = 8400
//    (a * aX) + (b * bX) = pX
// 2) (a * 34) + (b * 67) = 5400
//    (a * aY) + (b * bY) = pY
//
// In order to solve these equations we need to first eliminate one variable,
// this can be done by making making the b-terms the same in both equations.
// By multiplying the numbers in equation 1 by the b-term of equation 2 and
// doing the same for equation 2 with the b-term of equation 1 we have the same
// b-term in both equations.
// 1) 67 * (94a + 22b) = 67 * 8400 -> 6298a + 1474b = 562800
//    (bY * aX)a + (bY * bX)b = bY * pX
// 2) 22 * (34a + 67b) = 22 * 5400 ->  748a + 1474b = 118800
//    (bX * aY)a + (bX * bY)b = bX * pY
//
// Now we can remove the y from both equations leaving the following two
// simplified equations:
// 1) 6298a = 562800
//    (bY * aX)a = bY * pX
// 2) 748a = 118800
//    (bX * aY)a = bX * pY
//
// This can be combined in a single equation like this:
// 6298a - 748a = 562800 - 118800
// (bY * aX)a - (bX * aY)a = (bY * pX) - (bX * pY)
// 5550a = 444000
// a = 44400 / 5550
// a = 80
//
// Once we have the value for a we can use this in one of the two original
// equations to find the answer for b:
// (94 * 80) + 22b = 8400
// 7520 + 22b = 8400
// 22b = 8400 - 7520
// 22b = 880
// b = 40

export function calculateTokensToSpend(machine: Machine): number {
	const pushesForA = ((machine.bY * machine.pX) - (machine.bX * machine.pY))
		/ ((machine.bY * machine.aX) - (machine.bX * machine.aY));
	const pushesForB = (machine.pX - machine.aX * pushesForA) / machine.bX;

	// When either number if not an integer number, there is no number of tokens
	// which can be spend to get to the price.
	if (!Number.isInteger(pushesForA) || !Number.isInteger(pushesForB)) return 0;

	// Pushes for button A cost 3 tokens.
	return (pushesForA * 3) + pushesForB;
}
