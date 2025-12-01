import { sessionId } from './session-id.js';

import fs from 'fs';
import path from 'path';

/* ========================================================================== */

const defaultError =
	'Puzzle inputs differ by user. Please log in to get your puzzle input.';
const fileName = 'input.txt';

/* ========================================================================== */

async function fetchInput(url: string): Promise<string> {
	if (sessionId === undefined) {
		console.error(
			'Unable to find session ID. Please place your session ID in the ".env" file in the root of the project. See the README for more information.'
		);
		process.exit(1);
	}

	let data: Response;
	try {
		data = await fetch(url, {
			headers: {
				cookie: `session=${sessionId}`
			}
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}

	if (data.status !== 200) {
		console.error('There was an issue retrieving the puzzle input. Please check your session ID.');
	}

	const test = await data.text();

	return test.trimEnd();
}

function getInputPathForDay(year: number, day: number): string {
	const formattedDay = day.toString().padStart(2, '0');
	const pathName = path.join(year.toString(), formattedDay, fileName);

	return path.relative(process.cwd(), pathName);
}

function hasInputFile(fileName: string): boolean {
	return fs.existsSync(fileName);
}

/* ========================================================================== */

export async function fetchInputForDay(year: number, day: number): Promise<string> {
	const fileName = getInputPathForDay(year, day);
	const fileExists = hasInputFile(fileName);

	const text = fileExists
		? fs.readFileSync(getInputPathForDay(year, day), 'utf-8')
		: await fetchInput(`https://adventofcode.com/${year}/day/${day}/input`);

	if (!fileExists) {
		fs.writeFileSync(fileName, text);
	}

	return text;
}
