# Day 1: No Time for a Taxicab

The first part was not much of a problem though it took a little while to come to the solution I used. I figured an array for the directions would make it easy to alter and keep track of the current direction. By using the ten digit for the vertical movement and the one digit for the horizontal movement I could write code for the movements which was the same for any direction.

Part two posed a bit of a problem, after reading the description it was unclear to me how the distance was only `4` as I got `8`. After searching for a hint I found someone on Reddit with the exact same problem I had. A visited location is not just where the direction changes but any position in between also counts.

Once the description was clear the solution required a small modification to part 1 to keep track of all the points where the direction changes instead of just the last visited point. Now it was just checking if lines were intersecting. I looked at some math but figured it would be overkill as the challenge only deals with perpendicular lines.

Rating: **Easy** / **Medium**

## Challenge description

### Part One
Santa's sleigh uses a very high-precision clock to guide its movements, and the clock's oscillator is regulated by stars. Unfortunately, the stars have been stolen... by the Easter Bunny. To save Christmas, Santa needs you to retrieve all *fifty stars* by December 25th.

Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants *one star*. Good luck!

You're airdropped near **Easter Bunny Headquarters** in a city somewhere. "Near", unfortunately, is as close as you can get - the instructions on the Easter Bunny Recruiting Document the Elves intercepted start here, and nobody had time to work them out further.

The Document indicates that you should start at the given coordinates (where you just landed) and face North. Then, follow the provided sequence: either turn left (`L`) or right (`R`) 90 degrees, then walk forward the given number of blocks, ending at a new intersection.

There's no time to follow such ridiculous instructions on foot, though, so you take a moment and work out the destination. Given that you can only walk on the **street grid of the city**, how far is the shortest path to the destination?

For example:

- Following `R2, L3` leaves you `2` blocks East and `3` blocks North, or `5` blocks away.
- `R2, R2, R2` leaves you `2` blocks due South of your starting position, which is `2` blocks away.
- `R5, L5, R5, R3` leaves you `12` blocks away.

How many blocks away is Easter Bunny HQ?

### Part Two
Then, you notice the instructions continue on the back of the Recruiting Document. Easter Bunny HQ is actually at the first location you visit twice.

For example, if your instructions are `R8, R4, R4, R8`, the first location you visit twice is 4 blocks away, due East.

How many blocks away is the **first location you visit twice**?