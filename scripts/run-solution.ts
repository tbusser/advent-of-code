import { existsSync } from 'fs';
import path from 'path';

import { solve } from './utils/runner.js';

/* ========================================================================== */

function validatePath(puzzlePath: string, errorMessage: string) {
	if (!existsSync(puzzlePath)) {
		console.log(errorMessage);
		process.exit(1);
	}
}

/* ========================================================================== */

// The second argument is the puzzle ID, this should be in the
// format <year>/<day>/<part>. Make sure an argument is provided before trying
// to validate the argument.
const puzzleId = process.argv[2];
if (puzzleId === undefined) {
	console.log('Please provide the puzzle ID as <year>/<day>/<part>.');
	process.exit(1);
}

// Split up the argument into its parts and convert them to numbers.
const [year, day, part] = puzzleId.split('/');

// Make sure there is a matching year folder in the current directory.
const yearFolder = path.relative(process.cwd(), year);
validatePath(yearFolder, `Year ${year} does not exist, please provide a valid year.`);

// Make sure there is a matching day folder in the year folder, days should
// always be two digits long.
const paddedDay = day.padStart(2, '0');
const dayFolder = path.join(yearFolder, paddedDay);
validatePath(
	dayFolder,
	`Day ${paddedDay} does not exist within ${year}, please provide a valid day.`
);

// Make sure there is a matching part file in the day folder, parts should
// always be one digit long.
const fileName = path.join(dayFolder, `part-${part}.ts`);
validatePath(fileName, `Part ${part} does not exist in ${dayFolder}, please provide a valid part.`);

// Start the script for the provided puzzle ID.
const { default: solution } = await import(path.resolve(process.cwd(), fileName));
solve({
	day,
	year,
	...solution
});
