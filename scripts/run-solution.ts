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

// Split up the argument into its parts, this should give the year, date,
// and part.
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

// Make sure there is a matching part file in the day folder. The part will be
// added to the prefix "part-". Every solution file should start with this.
const fileName = path.join(dayFolder, `part-${part}.ts`);
validatePath(
	fileName,
	`Part "part-${part}.ts" does not exist in ${dayFolder}. Only the text after "part-" and before ".ts" has to be provided.`
);

// Start the script for the provided puzzle ID.
const { default: solution } = await import(path.resolve(process.cwd(), fileName)) as { default: Solution };
solve({
	day: Number(day),
	year: Number(year),
	...solution
});
