# Day 7: Internet Protocol Version 7

Initially I wrote a `for` loop to iterate over all the characters in an address and keep track of whether or not I'm inside a hypernet part. I probably could've made this approach work but it started to feel a bit off as I was working on it. I decided on a different approach where I process the input a bit more so each address is broken down in its hypernet and non-hypernet parts. This turned out to be good decision when I got to part 2. For breaking up an address into its part I am using two regular expressions.

- non-hypernet parts, these are the parts outside the `[ ]` brackets. To find these I use `/(?:^|\])(\w+?)(?:$|\[)/g`, this captures text between `]` or the beginning of the string, and `[` or the end of the string.
- hypernet parts, these are the parts inside the `[ ]` brackets, To find these I use `\[(\w+?)\]`.

Part 1 is now a matter of checking if there is an ABBA pattern in at least 1 non-hypernet part and that there are no ABBA patterns in all of the hypernet parts. Checking for an ABBA pattern is done by iterating over all the characters in a part. For each character the following checks are done:

- Make sure the next character is different from the current character. When they're the same it can't form an ABBA pattern.
- Check if current character is the same as three positions down from the current character, and if the next character is the same as two positions down from the current character.

When both checks pass it means an ABBA pattern has been found.

For part 2 it was a plus that I had already separated the hypernet parts from the non-hypernet parts. This made it a lot easier to iterate over the non-hypernet parts and finding the ABA patterns in that part.

To check if an address supports SSL I iterate over the non-hypernet parts and find all the ABA patterns. The ABA patterns are immediately converted to BAB patterns. The next step is to check if any hypernet part contains one of the found BAB patterns. As soon a hypernet part with a BAB pattern is found it means the address supports SSL and no further checks are needed for the address.

Rating: **Easy**

## Challenge description

### Part One

While snooping around the local network of EBHQ, you compile a list of *IP addresses* (they're IPv7, of course; *IPv6* is much too limited). You'd like to figure out which IPs support **TLS** (transport-layer snooping).

An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or **ABBA**.  An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as `xyyx` or `abba`.  However, the IP also must not have an ABBA within any hypernet sequences, which are contained by **square brackets**.

For example:


- `abba[mnop]qrst` supports TLS (`abba` outside square brackets).
- `abcd[bddb]xyyx` does **not** support TLS (`bddb` is within square brackets, even though `xyyx` is outside square brackets).
- `aaaa[qwer]tyui` does **not** support TLS (`aaaa` is invalid; the interior characters must be different).
- `ioxxoj[asdfgh]zxcvbn` supports TLS (`oxxo` is outside square brackets, even though it's within a larger string).

**How many IPs** in your puzzle input support TLS?


### Part Two

You would also like to know which IPs support **SSL** (super-secret listening).

An IP supports SSL if it has an Area-Broadcast Accessor, or **ABA**, anywhere in the supernet sequences (outside any square bracketed sections), and a corresponding Byte Allocation Block, or **BAB**, anywhere in the hypernet sequences. An ABA is any three-character sequence which consists of the same character twice with a different character between them, such as `xyx` or `aba`. A corresponding BAB is the same characters but in reversed positions: `yxy` and `bab`, respectively.

For example:


- `aba[bab]xyz` supports SSL (`aba` outside square brackets with corresponding `bab` within square brackets).
- `xyx[xyx]xyx` does **not** support SSL (`xyx`, but no corresponding `yxy`).
- `aaa[kek]eke` supports SSL (`eke` in supernet with corresponding `kek` in hypernet; the `aaa` sequence is not related, because the interior character must be different).
- `zazbz[bzb]cdb` supports SSL (`zaz` has no corresponding `aza`, but `zbz` has a corresponding `bzb`, even though `zaz` and `zbz` overlap).

**How many IPs** in your puzzle input support SSL?
