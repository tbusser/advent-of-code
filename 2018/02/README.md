# Day 2: Inventory Management System

See [here](https://adventofcode.com/2018/day/2) for the puzzle description.

## Part 1

### My solution

It seemed like a very straightforward problem. The parsing of the input was no work and finding the right answer took little effort.

### Optimal solution

After taking a second look it seemed the `inspectBox` method could be optimized. It used a `LazyMap` which had to be converted to an array, all rather costly operation. In the end I settled on an array of 26 items, one per letter. The letters of the box are converted to their ASCII code and mapped so that `a` becomes `0` and `z` becomes `25`. That and adding an early exit in the evaluation of the the box having letters which occur two or three times almost halved the runtime.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Frequency counting
- _Median runtime for my solution[^1]_: 2.52778ms
- _Median runtime for optimal solution[^1]_: 1.25567ms

## Part 2

### My solution

Part 2 was again rather straightforward. By iterating over every pair of boxes it is possible to find the two boxes with only 1 different letter.

### Optimal solution

On closer inspection of my solution I found lots of arrays that could be eliminated. I was splitting the box strings to create character arrays, which is not needed at all. Also for keeping track of the mismatch index I was using an array. Finally I used `splice` to remove the letter which is different between the two boxes, this also creates arrays. By replacing all of these arrays the runtime was almost halved.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Pairwise string compare
- _Median runtime for my solution[^1]_: 2.48344ms
- _Median runtime for optimal solution[^1]_: 1.21230ms

[^1]: Median runtime was determined over 50 samples.
