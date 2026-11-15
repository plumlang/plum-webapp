---
title: Values and variables
nav: Values and variables
description: Plumlang's basic types (int, float, str, bool), variables with plant, constants with root, type inference, conversions and string interpolation.
---

Programs work with values: numbers, text, and *yes or no*. Every value has
a type, and Plumlang knows the type of everything before the program runs.

## The basic types

| Type | What it holds | Examples |
|---|---|---|
| `int` | whole numbers | `42`, `-7`, `1_000_000` |
| `float` | numbers with a fraction | `3.14`, `0.5`, `6.022e23` |
| `str` | text | `"Hello"` |
| `bool` | yes or no | `good`, `bad` |

`good` and `bad` are Plumlang's *true* and *false* (and `true` and `false`
work too).

## plant and root

`plant` makes a variable, a name for a value that can change. `root` makes
a constant, which can't:

```plum
plant score = 0
score = score + 10
score += 5

root MAX_SCORE = 100

drop(score, "out of", MAX_SCORE)
```

```text output
15 out of 100
```

Changing `MAX_SCORE` would be a compile error. Constants are written in
capitals by convention.

You didn't write any types above: Plumlang worked out that `score` is an
`int` from its value. You can write the type after the name when you want
to, or when there is nothing to work it out from:

```plum
plant ratio: float = 1
plant name: str = "Ada"
drop(ratio, name)
```

```text output
1.0 Ada
```

## Arithmetic

`+ - *` work as you'd expect. Division `/` always gives a `float`, and `//`
divides whole numbers and drops the remainder; `%` is the remainder and
`**` the power.

```plum
drop(7 / 2, 7 // 2, 7 % 2, 2 ** 10)
drop(1 + 2 * 3, (1 + 2) * 3)
```

```text output
3.5 3 1 1024
7 9
```

An `int` that grows too large for 64 bits is an error, never a silent wrong
answer.

## Text and interpolation

Strings use double quotes. Write `{...}` inside a string to put a value
into it:

```plum
plant name = "Ada"
plant items = 3
drop("Hello, {name}! You have {items} items, {items * 2} after doubling.")

plant price = 4.5
drop("Total: {price * items:.2}")
```

```text output
Hello, Ada! You have 3 items, 6 after doubling.
Total: 13.50
```

A `:` after the value formats it: `:.2` keeps two digits after the point.
`+` joins strings, and `len` counts their characters:

```plum
plant greeting = "Hello, " + "world"
drop(greeting, len(greeting))
drop(greeting.upper())
```

```text output
Hello, world 12
HELLO, WORLD
```

## Converting between types

An `int` becomes a `float` wherever a `float` is wanted. Every other
conversion is written out:

```plum
drop(int(3.9), float(3), str(42) + "!")
drop(int("42") + 1)
```

```text output
3 3.0 42!
43
```

Nothing is ever *truthy* or *falsy* in Plumlang: a number is not a `bool`.
Where a condition is needed you write the comparison you mean, like
`count > 0`.

Next: [making decisions and loops](/docs/tour/control-flow/).
