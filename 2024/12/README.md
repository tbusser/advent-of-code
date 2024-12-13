# Day 12: Garden Groups

What a day! Part one started off well. I figured a grid would work well. In this grid I go over all the cells and when I find a cell I haven't yet processed I go and find all its neighbors with the same plant type. Any neighbor I find I will mark as processed to ensure I don't try to determine its region again.

When finding the neighbors with the same plant type I can calculate the area, these are the plots which are part of the same region. The perimeter per plot is a calculation. Each plot can contribute a maximum of 4 sides to the perimeter. If we subtract the number of neighbors with a matching plant type from 4 we know how many sides are part of the perimeter.

With this logic I got the answer to part 1.

Part 2 complicated things considerably for me. I struggled to define what is an edge and once I thought I had it clear my calculations were all over the place. What tripped me up was ensuring an edge consisting of multiple plots was counted only once. I've tried many approaches and each one failed. It got very frustrating to be unable to do code the logic for a task I could so easily manage visually.

In the evening I had another go at it. I modified my part 1 solution to also return to me the indexes of the plots which make up the edge. I already knew which plots these are because of my perimeter counting logic. With this data I tried to detected the edges. This failed but it did give me the insight I needed to know for the plots at the edge which sides of the plot are inside the region and which are outside the region. I once again modified my part 1 solution to add this data.

With the new information I started writing a solution but again it kept failing. Finally fed up, I decided to leave the problem for another day and closed my laptop. The moment I stepped into to bed I figured it out. The answer to count an edge consisting of multiple plots only once lay in checking the neighbor above (for the vertical edges) or to the left (for horizontal edges).

In the morning I opened my laptop, looked at my code, and made some adjustments to implement the idea I had. Much to my enjoyment the examples all returned the correct answer. Hoping the actual input would throw another twist at me I had a go at it and luckily the answer I got was the correct one.

The way it works is as follow. Let's say I have a region which looks like the diagram below. I gave each plot a unique number to make it easier to explain how the solution works.

```
1
23
 4
```

It is important to know I process the plots from top left to bottom right. So I process these plots in the order they're numbered.

- Plot 1, 3 edges
	- The bottom has a neighbor which is part of the same region, therefor it can't be an edge.
	- The left, top, and right, all have no neighbor and thus are edges.

- Plot 2, 1 edge
	- The top and right have a neighbor which is part of the same region, therefor they can't be an edge.
	- The bottom has no neighbor in the same region and thus is an edge.
	- The left also has no neighbor in the same region but the plot above it (plot 1) also doesn't have a neighbor on its left side. Because we work top to bottom, the left hand side of plot 1 was already counted as an edge and this is the continuation of the same edge.

- Plot 3, 2 edges
	- The left and bottom have a neighbor which is part of the same region, therefor they can't be an edge.
	- The top has no neighbor in the same region but the plot to the left (plot 2) has a neighbor above it which is in the same region. Since the plot to top and left is inside the region and the plot directly above plot 3 is not in the same region, it means we've detected an edge.
	- The right has no neighbor in the same region and thus is an edge.

- Plot 4, 2 edges
	- The top has a neighbor which is part of the same region, therefor it can't be an edge.
	- The right has no neighbor in the same region but the plot above it (plot 3) also doesn't have a neighbor on the right side. Since the plot to the top and right is outside the region, the right hand side of plot 3 was already counted as an edge and this is the continuation of the same edge.
	- The bottom has no neighbor in the same region and thus is an edge.
	- The left has no neighbor in the same region but the plot above (plot 3) does have a neighbor to the left which is in the same region. Since the plot to top and left is inside the region and the plot directly left of plot 4 is not in the same region, it means we've detected an edge.

I didn't read any hints or googled for solutions to solve part 2. It did take me a long time to find the right answer. Due to the time it took me I've rated part 2 has hard.

Rating: **Easy** / **Hard**

## Challenge description

### Part One

Why not search for the Chief Historian near the *gardener* and his *massive farm*? There's plenty of food, so The Historians grab something to eat while they search.

You're about to settle near a complex arrangement of garden plots when some Elves ask if you can lend a hand. They'd like to set up fences around each region of garden plots, but they can't figure out how much fence they need to order or how much it will cost. They hand you a map (your puzzle input) of the garden plots.

Each garden plot grows only a single type of plant and is indicated by a single letter on your map. When multiple garden plots are growing the same type of plant and are touching (horizontally or vertically), they form a **region**. For example:

```
AAAA
BBCD
BBCC
EEEC
```

This 4x4 arrangement includes garden plots growing five different types of plants (labeled `A`, `B`, `C`, `D`, and `E`), each grouped into their own region.

In order to accurately calculate the cost of the fence around a single region, you need to know that region's **area** and **perimeter**.

The **area** of a region is simply the number of garden plots the region contains. The above map's type `A`, `B`, and `C` plants are each in a region of area `4`. The type `E` plants are in a region of area `3`; the type `D` plants are in a region of area `1`.

Each garden plot is a square and so has **four sides**. The **perimeter** of a region is the number of sides of garden plots in the region that do not touch another garden plot in the same region. The type `A` and `C` plants are each in a region with perimeter `10`. The type `B` and `E` plants are each in a region with perimeter `8`. The lone `D` plot forms its own region with perimeter `4`.

Visually indicating the sides of plots in each region that contribute to the perimeter using `-` and `|`, the above map's regions' perimeters are measured as follows:

```
+-+-+-+-+
|A A A A|
+-+-+-+-+     +-+
              |D|
+-+-+   +-+   +-+
|B B|   |C|
+   +   + +-+
|B B|   |C C|
+-+-+   +-+ +
          |C|
+-+-+-+   +-+
|E E E|
+-+-+-+
```

Plants of the same type can appear in multiple separate regions, and regions can even appear within other regions. For example:

```
OOOOO
OXOXO
OOOOO
OXOXO
OOOOO
```

The above map contains **five** regions, one containing all of the `O` garden plots, and the other four each containing a single `X` plot.

The four `X` regions each have area `1` and perimeter `4`. The region containing `21` type `O` plants is more complicated; in addition to its outer edge contributing a perimeter of `20`, its boundary with each `X` region contributes an additional `4` to its perimeter, for a total perimeter of `36`.

Due to "modern" business practices, the **price** of fence required for a region is found by **multiplying** that region's area by its perimeter. The **total price** of fencing all regions on a map is found by adding together the price of fence for every region on the map.

In the first example, region `A` has price `4 * 10 = 40`, region `B` has price `4 * 8 = 32`, region `C` has price `4 * 10 = 40`, region `D` has price `1 * 4 = 4`, and region `E` has price `3 * 8 = 24`. So, the total price for the first example is **`140`**.

In the second example, the region with all of the `O` plants has price `21 * 36 = 756`, and each of the four smaller `X` regions has price `1 * 4 = 4`, for a total price of **`772`** (`756 + 4 + 4 + 4 + 4`).

Here's a larger example:

```
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
```

It contains:


- A region of `R` plants with price `12 * 18 = 216`.
- A region of `I` plants with price `4 * 8 = 32`.
- A region of `C` plants with price `14 * 28 = 392`.
- A region of `F` plants with price `10 * 18 = 180`.
- A region of `V` plants with price `13 * 20 = 260`.
- A region of `J` plants with price `11 * 20 = 220`.
- A region of `C` plants with price `1 * 4 = 4`.
- A region of `E` plants with price `13 * 18 = 234`.
- A region of `I` plants with price `14 * 22 = 308`.
- A region of `M` plants with price `5 * 12 = 60`.
- A region of `S` plants with price `3 * 8 = 24`.

So, it has a total price of **`1930`**.

**What is the total price of fencing all regions on your map?**


### Part Two

Fortunately, the Elves are trying to order so much fence that they qualify for a **bulk discount**!

Under the bulk discount, instead of using the perimeter to calculate the price, you need to use the **number of sides** each region has. Each straight section of fence counts as a side, regardless of how long it is.

Consider this example again:

```
AAAA
BBCD
BBCC
EEEC
```

The region containing type `A` plants has `4` sides, as does each of the regions containing plants of type `B`, `D`, and `E`. However, the more complex region containing the plants of type `C` has `8` sides!

Using the new method of calculating the per-region price by multiplying the region's area by its number of sides, regions `A` through `E` have prices `16`, `16`, `32`, `4`, and `12`, respectively, for a total price of **`80`**.

The second example above (full of type `X` and `O` plants) would have a total price of **`436`**.

Here's a map that includes an E-shaped region full of type `E` plants:

```
EEEEE
EXXXX
EEEEE
EXXXX
EEEEE
```

The E-shaped region has an area of `17` and `12` sides for a price of `204`. Including the two regions full of type `X` plants, this map has a total price of **`236`**.

This map has a total price of **`368`**:

```
AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA
```

It includes two regions full of type `B` plants (each with `4` sides) and a single region full of type `A` plants (with `4` sides on the outside and `8` more sides on the inside, a total of `12` sides). Be especially careful when counting the fence around regions like the one full of type `A` plants; in particular, each section of fence has an in-side and an out-side, so the fence does not connect across the middle of the region (where the two `B` regions touch diagonally). (The Elves would have used the M&ouml;bius Fencing Company instead, but their contract terms were too one-sided.)

The larger example from before now has the following updated prices:


- A region of `R` plants with price `12 * 10 = 120`.
- A region of `I` plants with price `4 * 4 = 16`.
- A region of `C` plants with price `14 * 22 = 308`.
- A region of `F` plants with price `10 * 12 = 120`.
- A region of `V` plants with price `13 * 10 = 130`.
- A region of `J` plants with price `11 * 12 = 132`.
- A region of `C` plants with price `1 * 4 = 4`.
- A region of `E` plants with price `13 * 8 = 104`.
- A region of `I` plants with price `14 * 16 = 224`.
- A region of `M` plants with price `5 * 6 = 30`.
- A region of `S` plants with price `3 * 6 = 18`.

Adding these together produces its new total price of **`1206`**.

**What is the new total price of fencing all regions on your map?**
