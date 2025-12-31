# Day 11: Chronal Charge

See [here](https://adventofcode.com/2018/day/11) for the puzzle description.

## Part 1

### My solution

I started with constructing the grid with the power levels. Using an `Int8Array` seemed like a solid choice to store individual power levels. It had to be signed as the power levels are between `-5` and `4`. Following the instructions on how to calculate the power levels was fairly trivial and didn't take much effort.

For finding the 3x3 square with the highest combined power level I wanted to process three rows at once. Because every 3x3 square uses two columns from the previous square, I opted to use a sliding window construction to prevent having to calculate the column sums each time. This struck me as a nice way to save some work per check. Because I process 3 rows at a time, I've added a check to make sure I don't process the bottom 2 rows. They will never be able to make a 3x3 square.

### Optimal solution

There were no suggested improvements for my part 1 solution. ChatGPT did mention that a summed area table would probably scale better.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Fixed-size sliding window on a 2D grid.
- _Median runtime for my solution[^1]_: 6.54387ms

## Part 2

### My solution

For part 2 I started with modifying my solution for part 1. Everything which was hardcoded to a square size of 3, I changed to be dynamic. Then I wrapped the solution in a loop to go from a square size of 1 all the way up to 300. This got the job done but with a runtime of just over 3 seconds it was quite slow.

### Optimal solution

I shared my solution with ChatGPT and asked for optimization suggestions. As hinted at during part 1, the suggestion was to implement a summed area table (SAT). The initial solution was O(n<sup>4</sup>) because the work per square grows with its size. Using a SAT, each square sum is constant-time, reducing total complexity to O(n<sup>3</sup>). For the grid size of 300 cells in each direction, my solution had to perform billions of operations versus 9 million iterations for the SAT solution.

#### Building the summed-area table

The SAT works by calculating for each cell what the sum is for the rectangle spanning from the top-left corner (0, 0) to the cell itself. Take for instance this grid:
| | 0 | 1 | 2 |
| - | - | - | - |
| **0** | 1 | 2 | 3 |
| **1** | 4 | 5 | 6 |
| **2** | 7 | 8 | 9 |

The SAT is built left-to-right and top-to-bottom. This guarantees that the required neighboring values are already available when computing each cell. To avoid special-case handling at the grid boundaries, the SAT is defined to start at (1, 1). The top row and leftmost column are filled with zeros, which removes the need for bounds checks in the formula. With this setup, the same SAT formula can be applied uniformly to every cell.

To calculate the sum for any cell you need the following formula:

```
sum =
	sum of rectangle to the left of the cell
	+ sum of rectangle above the cell
	- the sum of the overlap rectangle
	+ value of the cell
```

The example grid has this SAT. For now the SAT for `(3,3)` is unknown.
| | 0 | 1 | 2 | 3 |
| - | - | - | - | - |
| **0** | 0 | 0 | 0 | 0 | 0
| **1** | 0 | 1 | 3 | 6 |
| **2** | 0 | 5 | 12 | 21 |
| **3** | 0 | 12 | 27 | ? |

Because of the padding row and column the coordinates from the grid shift by one when looking up the value in the SAT. The missing SAT for grid cell `(2, 2)` has an index of `(3, 3)` in the SAT. To calculate this missing value we need:

- The sum of the the rectangle to the left, SAT cell `(2,3)`, is `27`.
- The sum of the rectangle above, SAT cell `(3,2)`, is `21`.
- The sum of the overlap rectangle, SAT cell `(2,2)`, is `12`.

And thus the formula becomes:

```
SAT(x,y) = SAT(x-1, y) + SAT(x, y-1) - SAT(x-1, y-1) + grid(x-1, y-1)

SAT(3,3) = SAT(2, 3) + SAT(3, 2) - SAT(2, 2) + grid(2, 2)
			= 27 + 21 - 12 + 9
			= 45
```

#### Square sum calculation

Now to calculate the sum of a rectangle for any given size it only takes four values of the SAT to find the answer. For it to work we need the x and y of the top-left corner as well as the x and y of the bottom right corner.

```
square sum =
	sum for the rectangle to the bottom right
	- sum of the rectangle left of the square
	- sum of the rectangle above the square
	+ sum of the top-left overlap
```

Let's take the same grid as in the explanation for building the SAT, this gave us the following table:
| | 0 | 1 | 2 | 3 |
| - | - | - | - | - |
| **0** | 0 | 0 | 0 | 0 | 0 |
| **1** | 0 | 1 | 3 | 6 |
| **2** | 0 | 5 | 12 | 21 |
| **3** | 0 | 12 | 27 | 45 |

Now let's find out the sum of the rectangle spanning from grid coordinate `(1, 1)` to grid coordinate `(2, 2)`:

- `top` = `1`, `left` = `1` -> `satTop` = `2`, `satLeft` = `2`
- `bottom` = `2`, `right` = `2` -> `satBottom` = `3`, `satRight` = `3`
- The cumulative sum up to `(3, 3)` is `45`.
- The cumulative sum up to `(3, 1)`, area to the left, is `12`.
- The cumulative sum up to `(1, 3)`, area above, is `6`.
- The cumulative sum up to `(1, 1)`, top-left overlap, is `1`

Now the calculation becomes:

```
sum((satLeft, satTop), (satBottom, satRight)) =
	SAT(satRight, satBottom)
	- SAT(satRight, satTop-1)
	- SAT(satLeft-1, satBottom)
	+ SAT(satLeft-1, satTop-1)
sum((2, 2), (3, 3)) = 45 - 6 - 12 + 1 = 28
```

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Summed area table
- _Median runtime for my solution[^1]_: 3.17950s
- _Median runtime for optimal solution[^1]_: 78.09547ms

[^1]: Median runtime was determined over 50 samples.
