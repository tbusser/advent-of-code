# Day 8: Memory Maneuver

## Part 1

### My solution

After reading the problem description, it seemed that a recursive method would be the best approach. I started with the example input as it made for easier debugging. It went fairly easily; only iterating over all the children took a bit to figure out. Initially I made a version with a global metadata array where I pushed all the metadata into. In the end I looped over the entries to sum them up. After I had the correct result I refactored the solution to sum up the metadata per child. This removed the need for global state and it avoided having to iterate over all the metadata one additional time just to sum it up.

### Optimal solution

There were no suggested improvements for my part 1 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: recursive descent parsing
- _Median runtime for my solution[^1]_: 1.40838ms

## Part 2

### My solution

Sometimes part 2 is a happy little surprise. This one certainly was. It only required a small tweak to the solution for part 1 and it was done. Instead of adding up all the metadata values the metadata sum is calculated differently depending on whether child nodes exist. This was an easy modification.

### Optimal solution

Based on feedback from ChatGPT there were some things I could do to optimize my performance:

- Pre-size the `childMetadataSums` array with the number of child nodes. This prevents dynamically resizing the array.
- Check once for the existence of child nodes and have two different `for` loops instead of checking per loop iteration if there are child nodes.
- More of a semantic optimization, rename `metadataSum` to `nodeValue` as it better indicates what the variable represents.

### Insights

- _Perceived difficulty_: (Very) Easy
- _Problem type_: recursive descent parsing + context-dependent evaluation
- _Median runtime for my solution[^1]_: 1.61137ms
- _Median runtime for optimal solution[^1]_: 1.60871ms

Though the suggestions made by ChatGPT may have improved readability and intent a bit, performance wise it didn't make much of an impact.

[^1]: Median runtime was determined over 50 samples.
