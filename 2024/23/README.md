# Day 23: LAN Party

Looking at the input I got the idea this would be something for which a Graph would be a suitable data structure to store everything in. Since I already had a graph class it was trivial to read in the data and construct the graph for it. Once the data was loaded I started thinking about how to solve part 1. Since any combination three nodes could form a valid inter-connected network I started thinking about the easiest way to generate all the permutations.

For the permutations I settled on iterating over all the nodes starting at index 0 and have that by my starting node. Now I can iterate over all the nodes the starting node connects to, and in turn I can iterate over all the nodes the second node is connecting to. This will give me all the permutations for the starting node. With all the permutations I had to satisfy two more conditions.

First all three nodes had to be connected, meaning the third needs to have a connection to the first node. This can easily be checked by taking all the nodes the the third node is connecting to and and checking if the starting node is in its adjacent nodes. The second condition is that there must be at least one node with its name starting with the letter "t", this was a pretty straightforward condition to add.

Since every combination of inter-connected nodes can occur multiple time but with the node in a different order, I settled on sorting the nodes before storing them in a `Set`. This way I could ensure I would not get a combination of any three nodes more than once. This got me the right answer on the first go.

For part 2 I initially had the wrong idea. I was trying to find the largest network where all the computers were connected like this:
`a -> b -> c -> d -> a`. This was
- a) hard to do and
- b) not the right problem to solve.

This did cost me quite some time.

At some point I had a little lightbulb moment which helped me solve this challenge. Taking the computers from the example you get this list of which computers each computer is connected to.

```
kh => tc, qp, ub, ta
tc => kh, wh, td, co
qp => kh, ub, td, wh
de => cg, co, ta, ka
cg => de, tb, yn, aq
ka => co, tb, ta, de
co => ka, ta, de, tc
yn => aq, cg, wh, td
aq => yn, vc, cg, wq
ub => qp, kh, wq, vc
tb => cg, ka, wq, vc
vc => aq, ub, wq, tb
wh => tc, td, yn, qp
ta => co, ka, de, kh
td => tc, wh, qp, yn
wq => tb, ub, aq, vc
```

Now take computer `co` and create a map of computers it is connected to and count 1 occurrence:
```
ka: 1
ta: 1
de: 1
tc: 1
```

Iterate over all the computers connected to `co` and now repeat the previous step with all their connected computers. After processing computer `ka` you have the following data:
```
ka: 1
ta: 2
de: 2
tc: 1
co: 1
tb: 1
```

After doing the same for the computers connected to `ta`, `de`, and `tc` you have the following counts:
```
ka: 3
ta: 3
de: 3
tc: 1
co: 4
tb: 1
kh: 2
cg: 1
wh: 2
td: 1
```

The computer you started with will have the highest count, the other computers which are all interconnected will have a count of 1 less. So the largest network of interconnected computers which contains `co` is `co,de,ka,ta`.

When I applied this logic on the actual input it gave the correct result in one go.

Rating: **Easy**

## Challenge description

### Part One

As The Historians wander around a secure area at Easter Bunny HQ, you come across posters for a *LAN party* scheduled for today! Maybe you can find it; you connect to a nearby *datalink port* and download a map of the local network (your puzzle input).

The network map provides a list of every **connection between two computers**. For example:

```
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
```

Each line of text in the network map represents a single connection; the line `kh-tc` represents a connection between the computer named `kh` and the computer named `tc`. Connections aren't directional; `tc-kh` would mean exactly the same thing.

LAN parties typically involve multiplayer games, so maybe you can locate it by finding groups of connected computers. Start by looking for **sets of three computers** where each computer in the set is connected to the other two computers.

In this example, there are `12` such sets of three inter-connected computers:

```
aq,cg,yn
aq,vc,wq
co,de,ka
co,de,ta
co,ka,ta
de,ka,ta
kh,qp,ub
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
ub,vc,wq
```

If the Chief Historian is here, **and** he's at the LAN party, it would be best to know that right away. You're pretty sure his computer's name starts with `t`, so consider only sets of three computers where at least one computer's name starts with `t`. That narrows the list down to **`7`** sets of three inter-connected computers:

```
co,de,**ta**
co,ka,**ta**
de,ka,**ta**
qp,**td**,wh
**tb**,vc,wq
**tc**,**td**,wh
**td**,wh,yn
```

Find all the sets of three inter-connected computers. **How many contain at least one computer with a name that starts with `t`?**


### Part Two

There are still way too many results to go through them all. You'll have to find the LAN party another way and go there yourself.

Since it doesn't seem like any employees are around, you figure they must all be at the LAN party. If that's true, the LAN party will be the **largest set of computers that are all connected to each other**. That is, for each computer at the LAN party, that computer will have a connection to every other computer at the LAN party.

In the above example, the largest set of computers that are all connected to each other is made up of `co`, `de`, `ka`, and `ta`. Each computer in this set has a connection to every other computer in the set:

```
ka-co
ta-co
de-co
ta-ka
de-ta
ka-de
```

The LAN party posters say that the **password** to get into the LAN party is the name of every computer at the LAN party, sorted alphabetically, then joined together with commas. (The people running the LAN party are clearly a bunch of nerds.) In this example, the password would be **`co,de,ka,ta`**.

**What is the password to get into the LAN party?**
