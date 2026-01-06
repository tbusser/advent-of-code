# Day 4: Repose Record

See [here](https://adventofcode.com/2018/day/4) for the puzzle description.

## Part 1

### My solution

After reading the example and inspecting the actual puzzle input I realized that sorting the logs would help a lot with processing. The dates in the input are easy to sort but other than that they serve no purpose. Whenever a line is found with a guard ID you're guaranteed the next lines will be matching pairs of falling asleep and waking up. In my first iteration I constructed ranges and let the solver map these to minutes but in the end I settled on counting the minutes directly in the parser. This saved me duplication in the solutions for part 1 and 2.

With the parsing done the solving was pretty straightforward. Find the guard who is asleep the most and then find the minute at which he sleeps the most.

### Optimal solution

There were no suggested improvements for my part 1 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Parsing and aggregation
- _Median runtime for my solution[^1]_: 2.68818ms

## Part 2

### My solution

Part two was more of the same. My parser already formatted the input in such a way that it only needed a `for` loop per guard to find the minute with the highest count.

### Optimal solution

There were no suggested improvements for my part 2 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Parsing and aggregation
- _Median runtime for my solution[^1]_: 2.76739ms

[^1]: Median runtime was determined over 50 samples.
