# Day 6: Chronal Coordinates

See [here](https://adventofcode.com/2018/day/6) for the puzzle description.

## Part 1

### My solution

The first problem to solve was parsing the input. The coordinates themselves were easy to do but by themselves are still fairly meaningless. I figured it would be good to determine the largest X-coordinate so I would know the row length of the grid. Once I had that there was one more optimization I had to think of. If I know the minimum values for X and Y I can transpose all the coordinates so the top-left coordinate is position at `(0, 0)`. This can potentially save a lot of cells when this point is located much further away from the original `(0, 0)` location.

Once I had the transposed coordinates and the size of the bounding box for all coordinates I started thinking about how the approach the problem. My first instinct was to bloom the given coordinates and see when collisions occurred. This very quickly become a complex solution and it didn't feel right given the large number of loops I needed. Once it felt wrong I abandoned my solution and tried to rethink the problem.

For my next approach I figured I would loop over all the cells in the bounding box and check the distance to each cell. I stored the distance to each coordinate and its index in an array and sorted it by distance at the end. When the first and second entry had the same distance I would ignore the cell. Else I'd increase the area of the coordinate in the first position. This worked and got me the right solution but I wasn't happy the solution. It had the following issues:

- Filling the array with the distance to each coordinate and then sorting it felt like it was too complicated.
- Nowhere did I account for the fact the infinite areas had to be discarded.

Getting the right answer felt more like luck then proper work.

The array with distances I refactored to two variables, one for distance and one for the index of the coordinate with the shortest distance. Now I could go over all the coordinates calculate the distance to the current grid cell and see if it was shorter or same to the shortest distance so far. In case the distance is the same, I reset the index to the coordinate. When the distance is smaller I update the smallest distance and the coordinate index. Once all coordinates have been processed and the index is not `undefined`, it means there was only a single coordinate with the shortest distance to the cell. Now the array and sorting was no longer needed.

Now the remaining challenge was discarding the infinite areas. This turned out simpler than I originally thought. When there is a single coordinate closest to the cell, I check if the cell is at the edge of the grid. When it is at the edge, I add the index of the coordinate to a set. Once all the cells are processed I go over the array with arrays and for each entry I check if the index is present in the set. If it is present the area can be ignored. Otherwise I can check of the area is bigger than what't the biggest area up to that point and remember the size if it is.

### Optimal solution

There were no suggested improvements for my part 1 solution. There was a hint at what kind of algorithms could be used but they came with the caveat that for Advent of Code it would probably be overkill and slower than my own implementation.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_:
- _Median runtime for my solution[^1]_: 40.48466ms

## Part 2

### My solution

Part 2 was easily solved. I could take the basics of my loop for part 1 except now I needed to keep a running count of the total distance for all coordinates to a cell.

### Optimal solution

There were no suggested improvements for my part 2 solution.

### Insights

- _Perceived difficulty_: (Very) Easy
- _Problem type_:
- _Median runtime for my solution[^1]_: 35.39452ms

[^1]: Median runtime was determined over 50 samples.
