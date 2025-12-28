# Day 7: The Sum of Its Parts

## Part 1

### My solution

After reading the problem statement, it seemed the input described a graph and the processing order could use a priority queue. Based on these assumptions, I implemented my solution.

### Optimal solution

Based on feedback from ChatGPT there were several things I could do to optimize my solution. These were the biggest changes needed to make it more efficient:

- Regex was more complex than needed; the from/to nodes are always in the same position.
- Graph + priority queue overkill → switching to maps + arrays almost halved runtime.
- Using the Set difference was functional but probably on the slower side.
- Converting the letters to their ASCII value was a bit faster and made part 2 a bit easier.

Using the priority queue was not wrong but given the rather small input for the challenge it was a bit overkill. It would probably make for a better generic solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: Topological sort using Kahn’s algorithm
- _Median runtime for my solution[^1]_: 987.05450µs
- _Median runtime for optimal solution[^1]_: 568.22200µs

## Part 2

### My solution

Part 2 was a nice extension of Part 1. For my solution I did use the optimal version for the input parsing. This made sense since it already converted the nodes from strings to numbers. I implemented an array of workers and advanced time by the duration of the next finishing node, topping up workers from the queue as they became free.

### Optimal solution

There were no suggested improvements for my part 2 solution.

### Insights

- _Perceived difficulty_: Easy
- _Problem type_: DAG (Directed Acyclic Graph) scheduling / Parallel task scheduling with dependencies
- _Median runtime for my solution[^1]_: 708.82850µs

[^1]: Median runtime was determined over 50 samples.
