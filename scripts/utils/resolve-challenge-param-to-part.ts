import { existsSync } from 'fs';
import path from 'path';

/* ========================================================================== */

type Result = {
	day: number;
	path: string;
	year: number;
};

/* ========================================================================== */

const validationRegex = /\d{4}\/\d{1,2}/;

/* ========================================================================== */

function validatePath(puzzlePath: string, errorMessage: string) {
	if (!existsSync(puzzlePath)) {
		console.log(errorMessage);
		process.exit(1);
	}
}

/* -------------------------------------------------------------------------- */

export function resolveChallengeParamToPart(input: string): Result {
	if (!validationRegex.test(input)) {
		console.log('Unable to find challenge. The challenge ID must start with "<year>/<day>/".');
		console.log('- <year> must be 4 digits long.');
		console.log('- <day> must be 1 or 2 digits long.');
		process.exit(1);
	}

	// Split up the argument into its parts, this should give the year, date,
	// and part.
	const [year, day, part] = input.split('/');

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

	// Make sure there is a matching part file in the day folder. The part will
	// be added to the prefix "part-". Every solution file should start
	// with this.
	const fileName = path.join(dayFolder, `part-${part}.ts`);
	validatePath(
		fileName,
		`Part "part-${part}.ts" does not exist in ${dayFolder}. Only the text after "part-" and before ".ts" has to be provided.`
	);

	return {
		day: Number(day),
		path: path.resolve(process.cwd(), fileName),
		year: Number(year)
	};
}
