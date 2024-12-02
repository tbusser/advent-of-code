# Day 4: Security Through Obscurity

My initial idea for part 1 was to take the checksum and see if it was correct given the encrypted room name. After a moment of thought it felt like it would be overly complicated and perhaps better to just generate the checksums myself and see if they match the provided checksum from the puzzle input. This very quickly got me a working solution. The sorting of the letters gave me a bit of trouble. No matter how many times I have to write a sort function, getting the result right always seems to come down to some trial and error.

Part 2 was a fun puzzle to solve. First of all there was the decoding. The substitution itself is not complicated but doing it for each letter as many times as the sector ID took a little while. I figured a modulo would work well here. I'll admit it took a bit of fiddling but I soon had my unit tests correctly returning the expected decrypted text.

Now I could decrypt the names but it was initially not clear how to continue from here. The challenge description didn't have any more clues so I figured I'd log all the decrypted room names and search for clues. The logged names made me chuckle and give me an idea. I changed the code to only log room names which contained the word "north", luckily there was only one! A last modification to find this room name in code and return its sector ID as the result yielded the correct answer.

Rating: **Easy**

## Challenge description

### Part One
Finally, you come across an information kiosk with a list of rooms. Of course, the list is encrypted and full of decoy data, but the instructions to decode the list are barely hidden nearby. Better remove the decoy data first.

Each room consists of an encrypted name (lowercase letters separated by dashes) followed by a dash, a sector ID, and a checksum in square brackets.

A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, in order, with ties broken by alphabetization. For example:

- `aaaaa-bbb-z-y-x-123[abxyz]` is a real room because the most common letters are `a` (5), `b` (3), and then a tie between `x`, `y`, and `z`, which are listed alphabetically.
- `a-b-c-d-e-f-g-h-987[abcde]` is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
- `not-a-real-room-404[oarel]` is a real room.
- `totally-real-room-200[decoy]` is not.

Of the real rooms from the list above, the sum of their sector IDs is `1514`.

What is the **sum of the sector IDs of the real rooms**?

### Part Two
With all the decoy data out of the way, it's time to decrypt this list and get moving.

The room names are encrypted by a state-of-the-art *shift cipher*, which is nearly unbreakable without the right software. However, the information kiosk designers at Easter Bunny HQ were not expecting to deal with a master cryptographer like yourself.

To decrypt a room name, rotate each letter forward through the alphabet a number of times equal to the room's sector ID. `A` becomes `B`, `B` becomes `C`, `Z` becomes `A`, and so on. Dashes become spaces.

For example, the real name for `qzmt-zixmtkozy-ivhz-343` is `very encrypted name`.

**What is the sector ID** of the room where North Pole objects are stored?