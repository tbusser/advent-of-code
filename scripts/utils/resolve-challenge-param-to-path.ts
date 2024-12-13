import { existsSync } from 'fs';
import path from 'path';

/* ========================================================================== */

type ResolvedParam = { day: number, id: string, path: string, year: number };

/* ========================================================================== */

function getPuzzleId(): { day: number, id: string, year: number } {
	const puzzleIdRegex = /\d{4}\/\d{1,2}/;

	// The second argument is the puzzle ID, this should be in the
	// format <year>/<day>/<part>. Make sure an argument is provided before
	// trying to validate the argument.
	const puzzleId = process.argv[2];

	if (!puzzleIdRegex.test(puzzleId)) {
		console.log('Please provide the puzzle ID as <year>/<day>.');
		process.exit(1);
	}

	const parts = puzzleId.split('/').map(Number);

	return {
		day: parts[1],
		id: puzzleId,
		year: parts[0]
	};
}

function getPuzzlePath(puzzleId: string): string {
	const [year, day] = puzzleId.split('/');
	const paddedDay = day.padStart(2, '0');

	return path.relative(process.cwd(), `${year}/${paddedDay}`);
}

function validatePath(puzzlePath: string, errorMessage: string) {
	if (!existsSync(puzzlePath)) {
		console.log(errorMessage);
		process.exit(1);
	}
}

/* ========================================================================== */

export function resolveChallengeParamToPath(mustExist: boolean): ResolvedParam {
	const { day, id, year } = getPuzzleId();
	const puzzlePath = getPuzzlePath(id);

	if (mustExist) {
		validatePath(puzzlePath, `The path "${puzzlePath}" does not exist.`);
	}

	return {
		day,
		id,
		path: puzzlePath,
		year
	} satisfies ResolvedParam;
}
