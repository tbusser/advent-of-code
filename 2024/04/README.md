# Day 4: Ceres Search

Today's challenge was a fun one, it required a bit more thinking than [Day 3](../03/). I was happy I restructured my repo to contain more than a single year as I recently did the 2015 edition of AoC and created something which was just perfect for today's challenge: a generic grid class! I could now easily reuse this which was a massive help.

For part 1 I figured it would be best to start at each "X" in the input and use that as a starting position to see of how many "XMAS" sequences it is the beginning. Using my grid class I could get the neighboring cells and see if any contained the next letter of the sequence. In a moment of foresight I had created the option to only return the neighbors in one or more specified directions, this served me well. For the "X" I left the filter empty, giving me all neighbors. Once a neighbor was found with the letter "M" I knew in which direction this neighbor was and I could use this as a filter to only process further neighbors in the same direction. All I had to do now was keep a queue of neighbors that followed the "XMAS" sequence until I reached a neighbor with the letter "S". This completes the sequence and increases the count.

Part 2 was simpler than it initially sounded. At first I was wondering how to solve when starting from an "X" but quickly realized it would make more sense to find the "A"'s and see if they were wrapped in two pairs of "M" and "S". Again I could filter the neighbors of the cell with the "A", only this time I wanted only the diagonal fields. By placing the neighbors per diagonal in an array I could sort the array to make sure the letters always appear in the same order. By joining the items in array together and check if they match with "MS" I could check if both diagonals match create a "MAS" sequence, thus making the "A" part of a "X-MAS".

Rating: **Easy**

## Challenge description

### Part One

"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the *Ceres monitoring station*!

As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her **word search** (your puzzle input). She only has to find one word: `XMAS`.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of `XMAS` - you need to find all of them. Here are a few ways `XMAS` might appear, where irrelevant characters have been replaced with `.:`

```
..X...
.SAMX.
.A..A.
XMAS.S
.X....
```

The actual word search will be full of letters instead. For example:

```
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
```

In this word search, `XMAS` occurs a total of **`18`** times; here's the same word search again, but where letters not involved in any `XMAS` have been replaced with `.`:

```
....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX
```

Take a look at the little Elf's word search. **How many times does XMAS appear?**

### Part Two

The Elf looks quizzically at you. Did you misunderstand the assignment?

Looking for the instructions, you flip over the word search to find that this isn't actually an **`XMAS`** puzzle; it's an **`X-MAS`** puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:

```
M.S
.A.
M.S
```

Irrelevant characters have again been replaced with `.` in the above diagram. Within the `X`, each `MAS` can be written forwards or backwards.

Here's the same example from before, but this time all of the `X-MAS`es have been kept instead:

```
.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........
```

In this example, an `X-MAS` appears `9` times.

Flip the word search from the instructions back over to the word search side and try again. **How many times does an X-MAS appear?**
