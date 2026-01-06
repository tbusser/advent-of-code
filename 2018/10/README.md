# Day 10: The Stars Align

See [here](https://adventofcode.com/2018/day/10) for the puzzle description.

## Part 1

### My solution

I started by looking at the example data. I noticed the negative X and Y coordinates and figured I would start by normalizing all coordinates. When I printed the grid this produced, it matched the grid shown in the challenge description. Based on this, I started moving the lights for a few iterations to see if it would yield the same intermediate states as the example. I used a `modulo` operation to ensure the coordinates stayed inside the grid. This appeared to work and produced the same grids as the challenge.

This led to the next problem: how to detect when the message has appeared. I initially assumed that the letters would not be more than 20 rows high. I modified the main loop to run indefinitely and log the grid whenever the bounding box was less than 20 rows high. After some waiting, this printed three grids, with the message clearly visible in the second one. At that point, I had found the correct answer.

However, this approach did not feel right. Relying on an infinite loop that had to be manually stopped did not seem like a good way to detect the message. After some experimentation, I discovered that keeping track of the area of the bounding box was a much better signal. The area keeps decreasing until the message appears, and immediately after that it starts increasing again. This is easy to detect and provides a clean exit condition for the loop.

### Optimal solution

Based on feedback from ChatGPT, there were a few things I could do to significantly improve the solution. First of all, I had not fully understood the problem. There is no need to normalize the light coordinates or keep them inside a grid using a modulo operation. Each light follows a linear motion. This means the width and height of the bounding box are differences of linear functions, making them piecewise linear. As a result, the area of the bounding box is piecewise quadratic, which always has a minimum. When this minimum is reached, the message appears. This realization simplified the solution considerably.

The other major improvement was removing the `grid` array that I originally used to track which cells were lit. By thinking of the problem strictly as a grid, I missed a simpler approach. There is no need to maintain a grid during the simulation, since the position of each light at any given second can be calculated directly:

```
x = <light original x> + (<light horizontal velocity> * <time>)
y = <light original y> + (<light vertical velocity> * <time>)
```

Instead of keeping a grid, the solution can iterate over time, calculate the light positions for that time, and track the bounding box. Once all lights have been processed, the area of the bounding box can be compared to the area from the previous second. When the minimum area has been passed, the simulation stops. At that point, the light positions can be recalculated for the time at which the minimum was reached, placed into a grid, and printed.

These two changes together had a huge impact on the performance of the solution. The runtime went from over 30 seconds to just under 20 milliseconds. The `grid` array that was being created on every iteration turned out to be the biggest culprit.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Simulation / Geometry
- _Median runtime for my solution[^1]_: 34.47559s
- _Median runtime for optimal solution[^2]_: 19.49826ms

## Part 2

### My solution

Part 2 was effectively already solved as part of the first solution and did not require any additional work other than returning the elapsed time at which the message appears.

### Optimal solution

There were no further improvements to be made for part 2.

### Insights

- _Perceived difficulty_: Very Easy
- _Problem type_: Simulation / Geometry
- _Median runtime for my solution[^1]_: 34.47559s
- _Median runtime for optimal solution[^2]_: 19.49826ms

[^1]: Median runtime was determined over 10 samples.
[^2]: Median runtime was determined over 50 samples.
