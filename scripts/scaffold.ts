import { cpSync, existsSync, mkdirSync, rmdirSync } from 'fs';
import path from 'path';
import { resolveChallengeParamToPath } from './utils/resolve-challenge-param-to-path.js';

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

function removeFolder(folderPath: string) {
	try {
		rmdirSync(folderPath);
	} catch {
		// swallow any error.
	}
}

/* ========================================================================== */

const { id, path: puzzlePath } = resolveChallengeParamToPath(false);

ensureDestinationIsEmpty(puzzlePath);

copyScaffoldToDestination(puzzlePath);

console.log(`The puzzle "${id}" has been scaffolded in "${puzzlePath}".`);
