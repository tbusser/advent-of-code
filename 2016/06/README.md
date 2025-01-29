# Day 6: Signals and Noise

The difficulty in the challenge was coming up with an efficient way of counting how many times each character occurs in a column. I initially thought of keeping them in an `object` like this:
```
{
	a: 1,
	e: 4
	l: 2
}
```
The biggest drawback to this approach was increasing the count. Before adding `1` it is necessary to ensure the letter is initialized to `0`. Either you have to do this each time you want to increase the counter for a letter or you have to create an object with a property for each letter and set its value to `0`. This was not very appealing to me.

In the end I settled on using an array with a predefined size of 26 items, one for each letter, and each item is set to 0. Since we know how many items the array will hold, it is more performant to use `new Array(26)` then to create an array using `[]` like you normally would do. Using `[]` and setting items at non-sequential indexes will cause it to become a sparse array which is bad for performance.

Now to map a letter to an index in the array I did the following. I've converted the words in the input to arrays of character codes. So `eedadn` becomes `[101, 101, 100, 97, 100, 110]`. Now when counting how often a letter occurs subtract the value of `a`, which is `97`, from the char code and we have the index in the array. The letter `e` is char code `101` which becomes `4` after subtracting `97`. This is the 5th item in the array, just as expected.

Once all words for a column are processed the array contains per item how often the letter was encountered. By using a `reduce` it is possible to find the letter which was seen the most number of times.
```
const charCode = occurrenceMap.reduce<CharOccurrence>((mostEncountered, count, charCode) => {
	return count > mostEncountered.count ? { count, charCode } : mostEncountered;
}, { count: 0, charCode: 0 })
```
The callback method for `reduce` has three parameters:
- The first param is the `accumulator`, this will be the result of the `reduce`. In the example above it is the character with the most occurrences and the number of times it occurred.
- The second param is the `value`, in the `occurrenceMap` array the values are the number of times a character has been seen.
- The third param is the `index`, in the `occurrenceMap` array the indexes are the character codes minus `97`.

Once the character with the most occurrences has been determined it is needed to add `97` again in order to get the "real" character code. Rather than concatting each letter to the result I do `result.push(String.fromCharCode(charCode));`. It is cheaper to `push` something into an array than to add it to a string. The message is constructed at the very end so a string concat has to be done only once, in this case by doing `result.join('')`.

Now the only difference between part 1 and part 2 is the `reduce` callback to get either the letter with the most or least occurrences. For part 2 it was needed to add one more check, it is important the count is not `0`. Without this check the `reduce` could return a letter which never occurred in the words, so only letter which have occurred at least once are eligible

Rating: **Easy**

## Challenge description

### Part One

Something is jamming your communications with Santa. Fortunately, your signal is only partially jammed, and protocol in situations like this is to switch to a simple *repetition code* to get the message through.

In this model, the same message is sent repeatedly.  You've recorded the repeating message signal (your puzzle input), but the data seems quite corrupted - almost too badly to recover. **Almost**.

All you need to do is figure out which character is most frequent for each position. For example, suppose you had recorded the following messages:

```
eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar
```

The most common character in the first column is `e`; in the second, `a`; in the third, `s`, and so on. Combining these characters returns the error-corrected message, `easter`.

Given the recording in your puzzle input, **what is the error-corrected version** of the message being sent?


### Part Two

Of course, that **would** be the message - if you hadn't agreed to use a **modified repetition code** instead.

In this modified code, the sender instead transmits what looks like random data, but for each character, the character they actually want to send is **slightly less likely** than the others. Even after signal-jamming noise, you can look at the letter distributions in each column and choose the **least common** letter to reconstruct the original message.

In the above example, the least common character in the first column is `a`; in the second, `d`, and so on. Repeating this process for the remaining characters produces the original message, `advent`.

Given the recording in your puzzle input and this new decoding methodology, **what is the original message** that Santa is trying to send?
