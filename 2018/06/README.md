# Day 6: Chronal Coordinates

See [here](https://adventofcode.com/2018/day/6) for the puzzle description.

## Part 1

### My solution

The first problem to solve was parsing the input. The coordinates themselves were easy to parse, but by themselves they were still fairly meaningless. I figured it would be useful to determine the largest X-coordinate so I would know the row length of the grid. Once I had that, there was one more optimization to consider. If I know the minimum values for X and Y, I can transpose all the coordinates so the top-left coordinate is positioned at `(0, 0)`. This can potentially save a lot of cells when this point is located far away from the original `(0, 0)` location.

Once I had the transposed coordinates and the size of the bounding box for all coordinates, I started thinking about how to approach the problem. My first instinct was to “bloom” the given coordinates and see when collisions occurred. This very quickly became a complex solution, and it did not feel right given the large number of loops I needed. Once it felt wrong, I abandoned this approach and tried to rethink the problem.

For my next approach, I decided to loop over all the cells in the bounding box and check the distance to each coordinate. I initially stored the distance to each coordinate and its index in an array and sorted it by distance at the end. When the first and second entries had the same distance, I would ignore the cell; otherwise, I would increase the area of the coordinate in the first position. This worked and gave me the right solution, but I was not happy with it. It had the following issues:

- Filling an array with distances to each coordinate and then sorting it felt overly complicated.
- I was not accounting for the fact that infinite areas had to be discarded.

Getting the right answer felt more like luck than proper work.

I refactored the array of distances into two variables: one for the shortest distance and one for the index of the coordinate with that distance. I then looped over all coordinates, calculated the distance to the current grid cell, and checked whether it was shorter than or equal to the shortest distance so far. If the distance was the same, I reset the coordinate index; if it was smaller, I updated both the shortest distance and the index. Once all coordinates were processed and the index was not `undefined`, it meant there was exactly one coordinate closest to the cell. At this point, the array and sorting were no longer needed.

The remaining challenge was discarding infinite areas. This turned out to be simpler than I initially thought. When there is a single coordinate closest to a cell, I check whether the cell is at the edge of the grid. If it is, the coordinate must extend infinitely, so I add its index to a set. Once all cells are processed, I iterate over the array of areas and ignore any coordinate whose index is present in the set. For the remaining coordinates, I keep track of the largest area.

### Optimal solution

There were no suggested improvements for my Part 1 solution. While there are hints toward more advanced algorithms, they come with the caveat that for Advent of Code they are likely overkill and may even be slower than a straightforward brute-force implementation. The suggested algorithms are:

- BFS / flood-fill (multi-source expansion)
- Voronoi diagram / sweep-line algorithms

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Grid traversal / Manhattan distance
- _Median runtime for my solution[^1]_: 40.48466 ms

## Part 2

### My solution

Part 2 was straightforward. I reused the structure of my loop from Part 1, but instead of tracking the nearest coordinate, I kept a running total of the distances from all coordinates to the current cell. If the total distance stayed below the given limit, the cell was counted as part of the region.

### Optimal solution

There were no suggested improvements for my Part 2 solution.

### Insights

- _Perceived difficulty_: (Very) Easy
- _Problem type_: Grid traversal / Manhattan distance
- _Median runtime for my solution[^1]_: 35.39452 ms

[^1]: Median runtime was determined over 50 samples.
