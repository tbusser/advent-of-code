import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

import { fetchChallenge } from './utils/fetch-challenge.js';
import { resolveChallengeParamToPath } from './utils/resolve-challenge-param-to-path.js';

/* ========================================================================== */

const newLine = '\r\n';

const titleRegex = /<h2>--- (?<title>.*?) ---<\/h2>/;
const titlePlaceholder = '{Title}';

const descriptionRegex = /<article class="day-desc"><h2[\s\S]*?>[\s\S]*?<\/h2>(?<content>[\s\S]*?)<\/article>/gm;

const partOnePlaceholder = '{PartOne}';
const partTwoPlaceholder = '{PartTwo}';

/* ========================================================================== */

function extractDescriptions(challenge: string): string[] {
	const result = [];
	let description: RegExpExecArray;

	while ((description = descriptionRegex.exec(challenge))) {
		result.push(description.groups.content.trimEnd());
	}

	return result;
}

function getReadMePath(year: number, day: number): string {
	const formattedDay = day.toString().padStart(2, '0');
	const pathName = path.join(year.toString(), formattedDay, 'README.md');

	return path.relative(process.cwd(), pathName);
}

function htmlToMarkdown(html: string): string {
	return html
		.replace(/<p>(.*?)<\/p>/g, `$1${newLine}`)
		.replace(/<a .*?>(.*?)<\/a>/g, '*$1*')
		.replace(/<span .*?>(.*?)<\/span>/g, '$1')
		.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, '```' + newLine + '$1```' + newLine)
		.replace(/<code><em>([\s\S]*?)<\/em><\/code>/g, '**`$1`**')
		.replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
		.replace(/<em>(.*?)<\/em>/g, '**$1**')
		.replace(/<li>(.*?)<\/li>/g, '- $1')
		.replace(/<ul>\s/g, '')
		.replace(/<\/ul>/g, '');
}

function readReadMe(path: string): string {
	try {
		return readFileSync(path, 'utf-8');
	} catch (error) {
		console.log(`Error reading README from "${readMePath}"`, error);
		process.exit(1);
	}
}

function replaceDescriptions(readMe: string, descriptions: string[]): string {
	return readMe
		.replace(partOnePlaceholder, descriptions[0])
		.replace(partTwoPlaceholder, descriptions[1]);
}

function replaceTitle(challenge: string, readMe: string): string {
	const title = challenge.match(titleRegex).groups.title;

	return readMe.replace(titlePlaceholder, title);
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
const descriptions = extractDescriptions(challenge).map(htmlToMarkdown);
const readMePath = getReadMePath(year, day);

let readMe = readReadMe(readMePath);
readMe = replaceTitle(challenge, readMe);
readMe = replaceDescriptions(readMe, descriptions);

writeReadMe(readMePath, readMe);
