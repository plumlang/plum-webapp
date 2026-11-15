---
title: Hello, world
description: Your first Plumlang program. Print text with drop, write comments with #, and run a program with plum run or check it with plum check.
---

Here is a whole Plumlang program:

```plum
drop("Hello, world!")
```

```text output
Hello, world!
```

`drop` prints its values on a line of their own. There is no `main`
function to write and nothing to import: a program starts at its first line
and runs to its last.

## Running it

Save the program as `hello.plum` and run it:

```bash
plum run hello.plum      # or just: plum hello.plum
```

`plum` first checks the whole program, then runs it. If there is a mistake,
it says where, and usually how to fix it, before anything runs.

## Printing several things

`drop` takes any number of values, of any type, and separates them with a
space:

```plum
drop("The answer is", 42)
drop(1, 2.5, good)
drop()
drop("done")
```

```text output
The answer is 42
1 2.5 good

done
```

`drop()` with nothing in it prints an empty line. `good` is how Plumlang
spells *true*; you'll meet it again in the next step.

## Comments

A `#` starts a comment, which runs to the end of the line. Plumlang ignores
it; it is there for people reading the code.

```plum
# Greet the reader.
drop("Hello")   # a comment can follow code too
```

```text output
Hello
```

## One statement per line

A statement ends at the end of its line; there are no semicolons. A long
statement can carry on to the next line when the line ends inside brackets,
or with an operator or a comma:

```plum
drop("one",
     "two")
```

```text output
one two
```

Next: [values and variables](/docs/tour/values/).
