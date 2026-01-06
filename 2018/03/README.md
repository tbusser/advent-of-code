# Day 3: No Matter How You Slice It

See [here](https://adventofcode.com/2018/day/3) for the puzzle description.

## Part 1

### My solution

I started with figuring out how to parse the input. Per line I extracted the numbers for the position and dimension. While extracting the number I kept track of the maximum encountered start and end point positions. These determine the total number of cells in the grid. With this done, a second loop is needed to create rows per claim. For this the maximum X is needed to be able to calculate the index for the cell.

With this done, I started on counting how many claims there were per cell. This was a matter of looping over the rows in each claim, and per row increase the count for each cell in the range. Finding the answer for part 1 was now a matter of counting how many cells had a value of 2 or more.

### Optimal solution

There were no suggested improvements for my part 1 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Frequency aggregation
- _Median runtime for my solution[^1]_: 13.05285ms

## Part 2

### My solution

For part 2 I could reuse much of the part 1 solution. Finding the claim without overlap was a matter of checking if all the cells contained in the claim had a count of 1.

### Optimal solution

There were no suggested improvements for my part 2 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Overlap detection
- _Median runtime for my solution[^1]_: 16.15814ms

[^1]: Median runtime was determined over 50 samples.
