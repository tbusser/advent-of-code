# Day 16: Reindeer Maze

I will not pretend I understand my own solution. Part 1 I've done after solving day 18 and I figured the algorithm I used there would be a good starting point for day 16. It didn't take too long before I had something which worked on the 2 provided examples but when using the actual input my answer was too high.

I tried to debug my code but the maze is so large that wasn't really feasible. After a while I decided to look for help on Reddit which is where I found a [thread](https://www.reddit.com/r/adventofcode/comments/1hfhgl1/2024_day_16_part_1_alternate_test_case/) with extra test cases. Hoping this would bring me closer to a working solution I've started writing tests for these inputs and debugged the smaller mazes.

After some time I wound up with code which correctly ran all the tests, this felt like a good time to try it with the actual input. My solution found the correct answer in about 50ms which felt pretty fast.

For part 2 I first tweaked my part 1 solution and I did manage to make a single method which could return the answer for both parts. The only problem, this version would not correctly solve the unit test example 4, 5, and 6. For this reason I've decided to implement part 2 in a separate method. This code is also not without its problems, it will not find the right answers for the same unit test examples.

There must be something wrong with my code but I don't have the time to debug it any further than I've done now. Maybe I will revisit this challenge later to see if I can find a better approach.

Because I had to use additional example inputs to find the problem with my code I will rate part 1 as hard.

Rating: **Hard** / **Medium**

## Challenge description

### Part One

It's time again for the *Reindeer Olympics*! This year, the big event is the **Reindeer Maze**, where the Reindeer compete for the **lowest score**.

You and The Historians arrive to search for the Chief right as the event is about to start. It wouldn't hurt to watch a little, right?

The Reindeer start on the Start Tile (marked `S`) facing **East** and need to reach the End Tile (marked `E`). They can move forward one tile at a time (increasing their score by `1` point), but never into a wall (`#`). They can also rotate clockwise or counterclockwise 90 degrees at a time (increasing their score by `1000` points).

To figure out the best place to sit, you start by grabbing a map (your puzzle input) from a nearby kiosk. For example:

```
###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############
```

There are many paths through this maze, but taking any of the best paths would incur a score of only **`7036`**. This can be achieved by taking a total of `36` steps forward and turning 90 degrees a total of `7` times:

```
###############
#.......#....E#
#.#.###.#.###^#
#.....#.#...#^#
#.###.#####.#^#
#.#.#.......#^#
#.#.#####.###^#
#..>>>>>>>>v#^#
###^#.#####v#^#
#>>^#.....#v#^#
#^#.#.###.#v#^#
#^....#...#v#^#
#^###.#.#.#v#^#
#S..#.....#>>^#
###############
```

Here's a second example:

```
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################
```

In this maze, the best paths cost **`11048`** points; following one such path would look like this:

```
#################
#...#...#...#..E#
#.#.#.#.#.#.#.#^#
#.#.#.#...#...#^#
#.#.#.#.###.#.#^#
#>>v#.#.#.....#^#
#^#v#.#.#.#####^#
#^#v..#.#.#>>>>^#
#^#v#####.#^###.#
#^#v#..>>>>^#...#
#^#v###^#####.###
#^#v#>>^#.....#.#
#^#v#^#####.###.#
#^#v#^........#.#
#^#v#^#########.#
#S#>>^..........#
#################
```

Note that the path shown above includes one 90 degree turn as the very first move, rotating the Reindeer from facing East to facing North.

Analyze your map carefully. **What is the lowest score a Reindeer could possibly get?**


### Part Two

Now that you know what the best paths look like, you can figure out the best spot to sit.

Every non-wall tile (`S`, `.`, or `E`) is equipped with places to sit along the edges of the tile. While determining which of these tiles would be the best spot to sit depends on a whole bunch of factors (how comfortable the seats are, how far away the bathrooms are, whether there's a pillar blocking your view, etc.), the most important factor is **whether the tile is on one of the best paths through the maze**. If you sit somewhere else, you'd miss all the action!

So, you'll need to determine which tiles are part of **any** best path through the maze, including the `S` and `E` tiles.

In the first example, there are **`45`** tiles (marked `O`) that are part of at least one of the various best paths through the maze:

```
###############
#.......#....O#
#.#.###.#.###O#
#.....#.#...#O#
#.###.#####.#O#
#.#.#.......#O#
#.#.#####.###O#
#..OOOOOOOOO#O#
###O#O#####O#O#
#OOO#O....#O#O#
#O#O#O###.#O#O#
#OOOOO#...#O#O#
#O###.#.#.#O#O#
#O..#.....#OOO#
###############
```

In the second example, there are **`64`** tiles that are part of at least one of the best paths:

```
#################
#...#...#...#..O#
#.#.#.#.#.#.#.#O#
#.#.#.#...#...#O#
#.#.#.#.###.#.#O#
#OOO#.#.#.....#O#
#O#O#.#.#.#####O#
#O#O..#.#.#OOOOO#
#O#O#####.#O###O#
#O#O#..OOOOO#OOO#
#O#O###O#####O###
#O#O#OOO#..OOO#.#
#O#O#O#####O###.#
#O#O#OOOOOOO..#.#
#O#O#O#########.#
#O#OOO..........#
#################
```

Analyze your map further. **How many tiles are part of at least one of the best paths through the maze?**
