# Day 8: Memory Maneuver

## Part 1

### My Solution

After reading the problem description it seemed like a recursive method would be the best approach. I started with the example input as it made for easier debugging. It went fairly easily; only iterating over all the children took a bit to figure out. Initially I made a version with a global metadata array where I pushed all the metadata into. In the end I looped over the entries to sum them up. After I had the correct result I refactored the solution to sum up the metadata per child. This removed the need for global state plus it saved having the iterate over all the metadata one additional time just to sum it up.

### Optimal solution

There were no suggested improvements for my part 1 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: recursive descent parsing
- _Median runtime for my solution[^1]_: 1.40838ms

[^1]: Median runtime was determined over 50 samples.
