import { sessionId } from './session-id.js';

/* ========================================================================== */

export async function fetchChallenge(year: number, day: number): Promise<string> {
	const url = `https://adventofcode.com/${year}/day/${day}`;
	const data = await fetch(url, {
		headers: {
			cookie: `session=${sessionId}`
		}
	});

	const challenge = await data.text();

	return challenge.replace(/\n/g, '\r\n').trimEnd();
}
