# ✨🎄 Advent of Code 🎄✨

These are my solutions for the puzzles of [Advent of Code](https://adventofcode.com/). I enjoy writing code in TypeScript so that's what did. This repository contains everything you need to run my solutions.

## Setup

The solutions require NodeJS version 22.1.0 to run. In addition you need a couple of packages, these can be installed by running the `pnpm install` command from the root folder of the project.

## Running the solutions

To run a specific solution you can use the following command:
```bash
pnpm solve <year>/<day>/<part>
```
For instance to run the solution for day 2, part 1 you need the command:
```bash
pnpm solve 2015/2/1
```

## Puzzle input
Each solution requires the puzzle input. When there is no `input.txt` file in the day folder, the input will be downloaded from the Advent of Code website. Because the input is different per account a session ID cookie is needed. To get your session ID cookie, visit [Advent of Code website](https://adventofcode.com/) and login. Using the inspector of the browser, find the value of the session cookie. This value needs to be inserted in the `.env` file that you will have to create in the root folder of the project. See the `.env.example` file for what it should look like.

If you want to use input other than the input from the Advent of Code website, you can create the `input.txt` file yourself and fill it with whatever input you want to use for your solution.