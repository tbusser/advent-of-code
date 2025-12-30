import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { constructChallengeUrl, fetchChallenge } from './utils/fetch-challenge.js';
import { resolveChallengeParamToPath } from './utils/resolve-challenge-param-to-path.js';

/* ========================================================================== */

const titleRegex = /<h2>--- (?<title>.*?) ---<\/h2>/;
const titlePlaceholder = '{Title}';

const urlPlaceholder = '{url}';

/* ========================================================================== */

function getReadMePath(year: number, day: number): string {
	const formattedDay = day.toString().padStart(2, '0');
	const pathName = path.join(year.toString(), formattedDay, 'README.md');

	return path.relative(process.cwd(), pathName);
}

function readReadMe(path: string): string {
	try {
		return readFileSync(path, 'utf-8');
	} catch (error) {
		console.log(`Error reading README from "${readMePath}"`, error);
		process.exit(1);
	}
}

function replaceTitle(challenge: string, readMe: string): string {
	const title = challenge.match(titleRegex).groups.title;

	return readMe.replace(titlePlaceholder, title);
}

function replaceUrl(url: string, readMe: string): string {
	return readMe.replace(urlPlaceholder, url);
}

function writeReadMe(path: string, content: string) {
	try {
		writeFileSync(path, content, 'utf8');
	} catch (error) {
		console.log(`Error writing README to "${path}"`, error);
		process.exit(1);
	}
}

/* ========================================================================== */

const { day, year } = resolveChallengeParamToPath(true);

const challenge = await fetchChallenge(year, day);

const readMePath = getReadMePath(year, day);

let readMe = readReadMe(readMePath);
readMe = replaceTitle(challenge, readMe);
readMe = replaceUrl(constructChallengeUrl(year, day), readMe);

writeReadMe(readMePath, readMe);
