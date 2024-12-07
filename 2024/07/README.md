# Day 7: Bridge Repair

Part 1 landed me in the worse place to be, having a solution which works for the test input but returns the wrong answer for the actual input. Debugging that problem was not fun. After reading the challenge description I figured a recursive function would work well to try all the combinations. Setting up the recursive function took some fiddling but pretty soon I had something which solved the example input in no time at all. Time to try the actual input and there it all fell apart, my answer was wrong. I poured over my code, but was unable to find a flaw in the logic. After staring it at for a long time I felt like giving up.

Of course, giving up is not an option so I did the next best thing: pivot. I figured I'd make a queue and use that make all the possible combinations of operators. As I was building up my new solution I was adding a test case which I suddenly realized I didn't add to my recursive function. In my recursive function I was checking if my intermediate result was equal to the test value and this worked well for the example input. What I had failed to do was to also check if all the numbers had been used. In the puzzle input there are equations which will give the test value *before* all the numbers have been used. After extending the check for the test value with a check if all numbers had been used the answer for the actual input was correct.

Part 2 was more of the same. Added the concatenation operation to my solution of part 1 and fed it the challenge input. It is a nice feeling when making a small modification gives the right result for part 2 on the first go.

Rating: **Medium** / **Easy**

## Challenge description

### Part One

### Part Two