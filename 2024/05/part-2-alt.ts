/*
 |------------------------------------------------------------------------------
 | Alternative solution for Part 2
 |------------------------------------------------------------------------------
 |
 | This solution is a TypeScript version of the solution created by Rob
 | Habraken. On average my original solution takes about 85ms to give the
 | answer, this alternative solution gives the answer in about 2ms.
 |
 | Rob's solution in C# can be found here:
 | https://github.com/robhabraken/advent-of-code-2024/blob/main/solutions/04/part-1/Program.cs
 |*/

const rules: Record<number, number[]> = {};
let answer: number = 0;

function addRule(rule: number[]) {
	rules[rule[0]] ??= [];
	rules[rule[0]].push(rule[1]);
}

function processUpdate(update: number[]) {
	const temp = [...update];

	temp.sort((a, b) => {
		if (rules[a] !== undefined && rules[a].includes(b)) return -1;

		return 1;
	});

	if (update.join('') !== temp.join('')) {
		answer += temp[Math.floor(temp.length / 2)];
	}
}

function solver(input: string): number {
	input.split('\n').forEach(line => {
		if (line.includes('|')) {
			addRule(line.split('|').map(Number));
		} else if (line.includes(',')) {
			processUpdate(line.split(',').map(Number));
		}
	});

	return answer;
}

export default {
	prompt: 'The sum of the middle pages of the reordered updates is',
	solver
} satisfies Solution;
