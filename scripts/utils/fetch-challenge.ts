import { sessionId } from './session-id.js';

/* ========================================================================== */

export function constructChallengeUrl(year: number, day: number): string {
	return `https://adventofcode.com/${year}/day/${day}`;
}

export async function fetchChallenge(year: number, day: number): Promise<string> {
	const url = constructChallengeUrl(year, day);
	const data = await fetch(url, {
		headers: {
			cookie: `session=${sessionId}`
		}
	});

	const challenge = await data.text();

	return challenge.replace(/\n/g, '\r\n').trimEnd();
}
