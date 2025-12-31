# Day 14: Chocolate Charts

See [here](https://adventofcode.com/2018/day/14) for the puzzle description.

## Part 1

### My solution

The main challenge was determining the correct update logic for the elves’ indices after each turn. Once that state transition was implemented correctly, the remainder of the problem reduced to a straightforward simulation. My initial solution generated recipes up to the requested index and then ran an additional loop to collect the final ten scores. After validating the result, I refactored this into a single loop that generates exactly the required number of recipes.

### Optimal solution

There were no suggested improvements for my part 1 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Deterministic sequence simulation
- _Median runtime for my solution[^1]_: 11.69974ms

## Part 2

### My solution

For part 2 I started by modifying the loop. After adding a score to the `recipes` array there is a check to see if the new score is the end digit of the input. Only when the digits match is there a need to see if the input digits are the closing scores in the array. In my first solution I would slice the last items from the array, equal to the length of the input, join them together and check if the resulting string is equal to the input. This worked but it was slow, it took over 3 seconds.

In order to speed up the algorithm I tried to remove the `slice` and string comparison. I converted the input string to an array of numbers. I put these in reverse order. Now to see if the input sequence is on the board a loop over the digits in the sequence and using the index to walk back on the board. This has a very positive effect, the runtime dropped to approximately 350ms.

The part I struggled with was deciding how big the `Uint8Array` needed to be. I've had to up the size multiple times before it was big enough.

### Optimal solution

According to ChatGPT the optimal solution would be using a KMP-algorithm. It also advised to initialize the `recipes` array to a sensible default and grow it as needed. After implementing the KMP-algorithm and growing the array as needed I check the runtime. To my surprise it was slower than my solution. There are two factors which cause this to happen:

1. Growing the array when needed is slow. Using the solution with an array initialized large enough saves about 80ms.
2. Setting up the prefix table and using it takes more time than my naive solution.
3. The `digits` array and the `for(const digit of digits)` loop take considerable time.

After implementing the KMP-algorithm I wanted to see what happens when I apply some of the learning to my part 2 solution. I modified my solution to grow the array when needed, guessing a size for the array never felt quite right. This solution is what I call the optimal version. I also tried the `digits` array as it looked nicer than the code duplication in my code.

KMP is perhaps the best solution for this sort of problem but for this challenge it certainly isn't the fastest. In part it is down to using an array for the digits, this has a huge impact, about 100ms. My perhaps somewhat naive solution is well geared towards the challenge and outperforms the optimal version. The reason I wouldn't call my solution the optimal solution is the need for trial and error to determine a suitable size of the array.

See the table below for some of the variants I tried and their median runtime. 1M is the size suggested by ChatGPT, with this size the array will be expanded 5 times. An initial size of 32M is enough to hold all recipes without having to grow the array.

| Algorithm | Initial recipes | Variant         | Runtime [^2]. |
| --------- | --------------- | --------------- | ------------- |
| KMP       | 1M              | digits array    | 591.45103ms   |
| KMP       | 1M              | no digits array | 403.90155ms   |
| KMP       | 32M             | digits array    | 517.86814ms   |
| KMP       | 32M             | no digits array | 370.27992ms   |
| Mine      | 32M             | N/A             | 319.93054ms   |
| Optimal   | 1M              | digits array    | 502.16832ms   |
| Optimal   | 1M              | no digits array | 401.46928ms   |
| Optimal   | 32M             | digits array    | 449.49691ms   |
| Optimal   | 32M             | no digits array | 341.53641ms   |

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Streaming sequence matching / online pattern detection
- _Median runtime for my solution[^2]_: 319.93054ms
- _Median runtime for kmp solution (1M, digits array)[^2]_: 591.45103ms
- _Median runtime for optimal solution (1M, no digits array)[^2]_: 401.46928ms

[^1]: Median runtime was determined over 50 samples.
[^2]: Median runtime was determined over 10 samples.
