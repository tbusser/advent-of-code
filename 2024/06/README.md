# Day 6: Guard Gallivant

Today was fun! It certainly increased the difficulty of AoC by a notch compared to the previous days. Part 1 was not to hard, I could again rely on my Grid to do some of the heavy lifting. I started with padding the input with extra cells on the outside, this makes it a lot easier to test when the guard leaves the area. Now I can just test if the value of the cell is my padding value.

Once that was done I created subclass for my Grid and worked on a method to follow the instructions. I used a `Set` to keep track of the visited positions, this way I don't have to worry about counting the same position twice in case the guard visits the same position more than once. I used my `neighbors` filter to only get the direction the guard is facing and a little helper to determine the next direction after taking a 90º right turn.

With part 1 done it was time for part 2, this threw me for a bit of a loop (pun intended). At first I wasn't quite sure where to start so I allowed myself to take a breather before diving into the problem. After a bit of thinking I figured the challenge could be broken down into two parts:
1) Detect when the guard is stuck in a loop
2) Figure out where to place an obstacle to cause a loop

Problem 1 seemed to easiest so I decided to tackle that first. I thought about what makes a loop and arrived at a definition of making a turn at the same place as 4 turns ago, like this:

```
1--->2
^    |
|    v
4<---3
```

When making a turn again at position 1 and the last turn at position 1 is exactly 4 turns ago, a loop is detected. This held up till I got to example 5 of the challenge description, this was loop but not like one outlined above. Figuring this approach would get me nowhere had me go back to defining for myself what makes something a loop. Then it hit me. A loop occurs when the guard enters a position for the second time **from the same direction**.

Visiting a position more than once is not a problem, the guard can come from below and enter the same position again from the right. But when the guard enters the position from the same direction this is only possible if she followed the same path! With this little insight I created a copy of my logic for part 1, added the direction to the set of visited positions and manually altered to input to match the 6 cases from the challenge description. All 6 loops were detected, so that concluded solving the first problem.

Now on to problem 2, figuring out where to put an obstacle which causes a loop. After same thinking it dawned on me the obstacle has to be placed on a position the guard visits are else it wouldn't affect the path the guard will follow. Luckily part 1 already collected the positions visited by the guard so I just had to adjust the method to return me the set instead of only its size. With the visited positions I figured I would just try blocking every visited position one-by-one and see which ones would cause a loop. This was the easy part, I found the answer to part 2 in no time.

Part 2 was fun to solve. I had me take a pause and really forced me to think about the problem, for this reason I rated part 2 as medium.

Rating: **Easy** / **Medium**

## Challenge description

### Part One

The Historians use their fancy *device* again, this time to whisk you all away to the North Pole prototype suit manufacturing lab... in the year *1518*! It turns out that having direct access to history is very convenient for a group of historians.

You still have to be careful of time paradoxes, and so it will be important to avoid anyone from 1518 while The Historians search for the Chief. Unfortunately, a single **guard** is patrolling this part of the lab.

Maybe you can work out where the guard will go ahead of time so that The Historians can search safely?

You start by making a map (your puzzle input) of the situation. For example:

```
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
```

The map shows the current position of the guard with `^` (to indicate the guard is currently facing **up** from the perspective of the map). Any **obstructions** - crates, desks, alchemical reactors, etc. - are shown as `#`.

Lab guards in 1518 follow a very strict patrol protocol which involves repeatedly following these steps:

- If there is something directly in front of you, turn right 90 degrees.
- Otherwise, take a step forward.
Following the above protocol, the guard moves up several times until she reaches an obstacle (in this case, a pile of failed suit prototypes):

```
....#.....
....^....#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
```

Because there is now an obstacle in front of the guard, she turns right before continuing straight in her new facing direction:

```
....#.....
........>#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#...
```

Reaching another obstacle (a spool of several **very** long polymers), she turns right again and continues downward:

```
....#.....
.........#
..........
..#.......
.......#..
..........
.#......v.
........#.
#.........
......#...
```

This process continues for a while, but the guard eventually leaves the mapped area (after walking past a tank of universal solvent):

```
....#.....
.........#
..........
..#.......
.......#..
..........
.#........
........#.
#.........
......#v..
```

By predicting the guard's route, you can determine which specific positions in the lab will be in the patrol path. **Including the guard's starting position**, the positions visited by the guard before leaving the area are marked with an X:

```
....#.....
....XXXXX#
....X...X.
..#.X...X.
..XXXXX#X.
..X.X.X.X.
.#XXXXXXX.
.XXXXXXX#.
#XXXXXXX..
......#X..
```

In this example, the guard will visit **`41`** distinct positions on your map.

Predict the path of the guard. **How many distinct positions will the guard visit before leaving the mapped area?**

### Part Two

While The Historians begin working around the guard's patrol route, you borrow their fancy device and step outside the lab. From the safety of a supply closet, you time travel through the last few months and *record* the nightly status of the lab's guard post on the walls of the closet.

Returning after what seems like only a few seconds to The Historians, they explain that the guard's patrol area is simply too large for them to safely search the lab without getting caught.

Fortunately, they are **pretty sure** that adding a single new obstruction **won't** cause a time paradox. They'd like to place the new obstruction in such a way that the guard will get **stuck in a loop**, making the rest of the lab safe to search.

To have the lowest chance of creating a time paradox, The Historians would like to know **all** of the possible positions for such an obstruction. The new obstruction can't be placed at the guard's starting position - the guard is there right now and would notice.

In the above example, there are only **`6`** different positions where a new obstruction would cause the guard to get stuck in a loop. The diagrams of these six situations use `O` to mark the new obstruction, `|` to show a position where the guard moves up/down, `-` to show a position where the guard moves left/right, and `+` to show a position where the guard moves both up/down and left/right.

Option one, put a printing press next to the guard's starting position:

```
....#.....
....+---+#
....|...|.
..#.|...|.
....|..#|.
....|...|.
.#.O^---+.
........#.
#.........
......#...
```

Option two, put a stack of failed suit prototypes in the bottom right quadrant of the mapped area:

```
....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
......O.#.
#.........
......#...
```

Option three, put a crate of chimney-squeeze prototype fabric next to the standing desk in the bottom right quadrant:

```
....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----+O#.
#+----+...
......#...
```

Option four, put an alchemical retroencabulator near the bottom left corner:

```
....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
..|...|.#.
#O+---+...
......#...
```

Option five, put the alchemical retroencabulator a bit to the right instead:

```
....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
....|.|.#.
#..O+-+...
......#...
```

Option six, put a tank of sovereign glue right next to the tank of universal solvent:

```
....#.....
....+---+#
....|...|.
..#.|...|.
..+-+-+#|.
..|.|.|.|.
.#+-^-+-+.
.+----++#.
#+----++..
......#O..
```

It doesn't really matter what you choose to use as an obstacle so long as you and The Historians can put it into position without the guard noticing. The important thing is having enough options that you can find one that minimizes time paradoxes, and in this example, there are **`6`** different positions you could choose.

You need to get the guard stuck in a loop by adding a single new obstruction. **How many different positions could you choose for this obstruction?**
