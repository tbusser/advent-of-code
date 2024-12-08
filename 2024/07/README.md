# Day 7: Bridge Repair

Part 1 landed me in the worse place to be, having a solution which works for the test input but returns the wrong answer for the actual input. Debugging that problem was not fun. After reading the challenge description I figured a recursive function would work well to try all the combinations. Setting up the recursive function took some fiddling but pretty soon I had something which solved the example input in no time at all. Time to try the actual input and there it all fell apart, my answer was wrong. I poured over my code, but was unable to find a flaw in the logic. After staring it at for a long time I felt like giving up.

Of course, giving up is not an option so I did the next best thing: pivot. I figured I'd make a queue and use that make all the possible combinations of operators. As I was building up my new solution I was adding a test case which I suddenly realized I didn't add to my recursive function. In my recursive function I was checking if my intermediate result was equal to the test value and this worked well for the example input. What I had failed to do was to also check if all the numbers had been used. In the puzzle input there are equations which will give the test value *before* all the numbers have been used. After extending the check for the test value with a check if all numbers had been used the answer for the actual input was correct.

Part 2 was more of the same. Added the concatenation operation to my solution of part 1 and fed it the challenge input. It is a nice feeling when making a small modification gives the right result for part 2 on the first go.

Rating: **Medium** / **Easy**

## Challenge description

### Part One

The Historians take you to a familiar *rope bridge* over a river in the middle of a jungle. The Chief isn't on this side of the bridge, though; maybe he's on the other side?

When you go to cross the bridge, you notice a group of engineers trying to repair it. (Apparently, it breaks pretty frequently.) You won't be able to cross until it's fixed.

You ask how long it'll take; the engineers tell you that it only needs final calibrations, but some young elephants were playing nearby and **stole all the operators** from their calibration equations! They could finish the calibrations if only someone could determine which test values could possibly be produced by placing any combination of operators into their calibration equations (your puzzle input).

For example:

```
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
```

Each line represents a single equation. The test value appears before the colon on each line; it is your job to determine whether the remaining numbers can be combined with operators to produce the test value.

Operators are **always evaluated left-to-right**, not according to precedence rules. Furthermore, numbers in the equations cannot be rearranged. Glancing into the jungle, you can see elephants holding two different types of operators: **add** (`+`) and **multiply** (`*`).

Only three of the above equations can be made true by inserting operators:

- `190: 10 19` has only one position that accepts an operator: between `10` and `19`. Choosing `+` would give `29`, but choosing `*` would give the test value (`10 * 19 = 190`).
- `3267: 81 40 27` has two positions for operators. Of the four possible configurations of the operators, **two** cause the right side to match the test value: `81 + 40 * 27` and `81 * 40 + 27` both equal `3267` (when evaluated left-to-right)!
- `292: 11 6 16 20` can be solved in exactly one way: `11 + 6 * 16 + 20`.

The engineers just need the **total calibration result**, which is the sum of the test values from just the equations that could possibly be true. In the above example, the sum of the test values for the three equations listed above is **`3749`**.

Determine which equations could possibly be true. **What is their total calibration result?**


### Part Two

The engineers seem concerned; the total calibration result you gave them is nowhere close to being within safety tolerances. Just then, you spot your mistake: some well-hidden elephants are holding a **third type of operator**.

The *concatenation* operator (`||`) combines the digits from its left and right inputs into a single number. For example, `12 || 345` would become `12345`. All operators are still evaluated left-to-right.

Now, apart from the three equations that could be made true using only addition and multiplication, the above example has three more equations that can be made true by inserting operators:

- `156: 15 6` can be made true through a single concatenation: `15 || 6 = 156`.
- `7290: 6 8 6 15` can be made true using `6 * 8 || 6 * 15`.
- `192: 17 8 14` can be made true using `17 || 8 + 14`.

Adding up all six test values (the three that could be made before using only `+` and `*` plus the new three that can now be made by also using `||`) produces the new total calibration result of **`11387`**.

Using your new knowledge of elephant hiding spots, determine which equations could possibly be true. **What is their total calibration result?**