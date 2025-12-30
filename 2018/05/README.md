# Day 5: Alchemical Reduction

## Part 1

### My solution

When I read lowercase and uppercase of the same letter react it seemed the easiest to convert the input to ASCII codes. Checking if two positions contain the same letter only in different casing becomes as easy as subtracting their ASCII coded and checking if the difference is 32 (the difference between 'A' and 'a' in the ASCII table). My solution was to go over all the positions in the polymer, remove the reacting ones and adjusting the index when I did. This way I only had to go over the entire polymer once.

### Optimal solution

Based on feedback from ChatGPT there were some things I could do to optimize my solution:

- Replace in-place array mutation (splice) with a stack-based approach. This shaved off so much time, it is not even funny.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Stack-based reduction
- _Median runtime for my solution[^1]_: 161.92043ms
- _Median runtime for optimal solution[^1]_: 5.85732ms

With the suggestions from ChatGPT the time complexity of my solution went from O(n<sup>2</sup>) to O(n).

## Part 2

### My solution

Part 2 was more of the same. I just added a loop to go over the ASCII codes of the letters and filter them out of the polymer before fully reacting it. This part was rather simple and straightforward.

### Optimal solution

There were no suggested improvements for my part 2 solution.

### Insights

- _Perceived difficulty_: (Very) Easy
- _Problem type_: Stack-based reduction
- _Median runtime for my solution[^1]_: 71.19610ms

[^1]: Median runtime was determined over 50 samples.
