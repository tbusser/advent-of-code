# Day 9: Marble Mania

See [here](https://adventofcode.com/2018/day/9) for the puzzle description.

## Part 1

### My solution

It took me some fiddling to determine when a marble should be added at the end of the board versus when its position needed to wrap back to the front. Once I had this figured out, implementing the special rule for marbles with a value divisible by 23 was straightforward. Before attempting the actual puzzle input I tried all the provided test cases. Unfortunately, the test case `13 players; last marble is worth 7999 points` was failing. Since the other test cases produced the correct results, I knew I had overlooked something. What I missed was correcting the position for marbles that are a multiple of 23. Subtracting 7 could result in a negative index, which needs to be wrapped back near the end of the board.

Once all examples were working correctly, I ran the actual puzzle input. It produced the correct answer, but took a very long time to do so. There must be a better way to do this, perhaps it is not even needed to simulate all marbles being played but I have no idea where to start. I knew array manipulation was expensive, but I wasn’t sure how to efficiently determine the marble seven positions back without tracking all played marbles.

### Optimal solution

I shared my solution with ChatGPT and asked for optimization suggestions. The first suggestion was to use a linked list rather than arrays. I immediately stopped reading. It had crossed my mind to use linked lists but I opted to use arrays instead. After reading this one bit of information I wanted to implement my own version with linked lists. This was not too much work and I quickly had something that worked. I then shared my linked list implementation and asked for further optimizations, which resulted in a version without objects, using two `Uint32Array` instances to track the next and previous marbles.

If you have this board `0 4 2 1 3` the `Uint32Array` for the next marbles would look like this:
| | | | | | |
| --------------------- | - | - | - | - | - |
| index (marble) | 0 | 1 | 2 | 3 | 4 |
| value (next marble). | 4 | 3 | 1 | 0 | 2 |

Now if you need to insert `5` in between `2` and `1` the array items change like this:
| | | | | | | |
| --------------------- | - | - | - | - | - | - |
| index (marble) | 0 | 1 | 2 | 3 | 4 | 5 |
| value (next marble). | 4 | 3 | 5 | 0 | 2 | 1 |

##### Learnings

- Using a linked list over arrays saves a lot of time due to no longer having to manipulate arrays. Updating a next and previous property to another object is much faster.
- Forgoing objects altogether and using arrays where only values change further reduces execution time.

### Insights

- _Perceived difficulty_: Easy / Medium
- _Problem type_: Circular sequence simulation
- _Median runtime for my solution[^1]_: 32.20098s
- _Median runtime for list solution[^2]_: 6.86909ms
- _Median runtime for optimal solution[^2]_: 3.11546ms

## Part 2

### My solution

There was no way my part 1 solution could handle the scale up for part 2, it would take way too long to determine the answer. Using the list and optimal versions of part 1, finding the solution for part 2 was trivial.

### Optimal solution

There were no suggested improvements for my part 2 solution.

### Insights

- _Perceived difficulty_: Hard (my initial solution is not suitable for this)
- _Problem type_: Linked-list optimization / performance scaling
- _Median runtime for list solution[^2]_: 707.87959ms
- _Median runtime for optimal solution[^2]_: 70.86469ms

[^1]: Median runtime was determined over 10 samples.
[^2]: Median runtime was determined over 50 samples.
