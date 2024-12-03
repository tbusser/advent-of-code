import { cpSync, existsSync, mkdirSync, rmdirSync } from 'fs';
import path from 'path';

/* ========================================================================== */

function copyScaffoldToDestination(destination: string) {
	try {
		mkdirSync(destination);
	} catch (error) {
		console.error(`Unable to create destination folder "${destination}"`, error);
		process.exit(1);
	}

	const sourceFolder = path.resolve(process.cwd(), './scripts/solution-template');

	try {
		cpSync(sourceFolder, destination, { recursive: true });
	} catch (error) {
		console.log('There was a problem copying the scaffold.', error);
		// Remove the folder we created to copy the scaffold to.
		removeFolder(destination);
		process.exit(1);
	}
}

function ensureDestinationIsEmpty(destination: string) {
	if (existsSync(destination)) {
		console.log(`A folder named ${destination} already exists. To scaffold a solution, the path is not allowed to already exist.`);
		process.exit(1);
	}
}

function getPuzzleId(): string {
	const puzzleIdRegex = /\d{4}\/\d{1,2}/;

	// The second argument is the puzzle ID, this should be in the
	// format <year>/<day>/<part>. Make sure an argument is provided before
	// trying to validate the argument.
	const puzzleId = process.argv[2];

	if (!puzzleIdRegex.test(puzzleId)) {
		console.log('Please provide the puzzle ID as <year>/<day>.');
		process.exit(1);
	}

	return puzzleId;
}

function getPuzzlePath(puzzleId: string): string {
	const [year, day] = puzzleId.split('/');
	const paddedDay = day.padStart(2, '0');

	return path.relative(process.cwd(), `${year}/${paddedDay}`);
}

function removeFolder(folderPath: string) {
	try {
		rmdirSync(folderPath);
	} catch {
		// swallow any error.
	}
}

/* ========================================================================== */

const puzzleId = getPuzzleId();
const puzzlePath = getPuzzlePath(puzzleId);

ensureDestinationIsEmpty(puzzlePath);

copyScaffoldToDestination(puzzlePath);

console.log(`The puzzle "${puzzleId}" has been scaffolded in "${puzzlePath}".`);
