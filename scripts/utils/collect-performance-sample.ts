import { fetchInputForDay } from './fetch-input.js';
import { measure } from './measure.js';

/* ========================================================================== */

const input = await fetchInputForDay(Number(process.argv[2]), Number(process.argv[3]));
const { default: solution } = await import(process.argv[4]);

const result = measure(solution.solver, input);
process.stdout.write(result.duration.toString());
