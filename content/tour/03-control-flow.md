---
title: Making decisions and loops
nav: Decisions and loops
description: Control flow in Plumlang. if and else, if as a value, match on values and ranges, while loops, for loops over ranges and lists, break and continue.
---

## if and else

```plum
plant score = 84

if score >= 90 {
    drop("A")
} else if score >= 80 {
    drop("B")
} else {
    drop("C")
}
```

```text output
B
```

The condition needs no brackets around it, but the block always has braces,
and the opening brace goes on the same line. A condition must be a `bool`:
compare with `==`, `!=`, `<`, `<=`, `>`, `>=`, and combine with `and`, `or`
and `not`.

```plum
plant age = 20
plant banned = bad
if age >= 18 and not banned {
    drop("Welcome")
}
```

```text output
Welcome
```

When both branches are a single value, `if` can be used as a value:

```plum
plant count = 1
plant label = if count == 1 { "item" } else { "items" }
drop("{count} {label}")
```

```text output
1 item
```

## match

`match` compares a value against several patterns and runs the first that
fits. It must cover every case, so it usually ends with `else`:

```plum
plant command = "halt"

match command {
    "start" => drop("starting")
    "stop", "halt" => drop("stopping")
    else => drop("unknown command: {command}")
}

plant age = 15
plant group = match age {
    0..13 => "child"
    13..20 => "teen"
    else => "adult"
}
drop(group)
```

```text output
stopping
teen
```

`0..13` is a *range*: the numbers from 0 up to, but not including, 13.
`0..=13` would include 13.

## while

A `while` loop repeats as long as its condition holds:

```plum
plant n = 10
while n > 0 {
    drop(n)
    n -= 4
}
```

```text output
10
6
2
```

## for

A `for` loop walks over a range, or over the items of a list, a map or a
string:

```plum
for i in 0..3 {
    drop("round", i)
}

for fruit in ["plum", "pear", "fig"] {
    drop(fruit)
}

for i, fruit in ["plum", "pear"].enumerate() {
    drop("{i}: {fruit}")
}
```

```text output
round 0
round 1
round 2
plum
pear
fig
0: plum
1: pear
```

There is no C-style `for (i = 0; i < n; i++)`: a range says the same thing
without the setup.

## break and continue

`break` leaves a loop early; `continue` skips to its next round:

```plum
for n in 1..20 {
    if n % 2 == 0 {
        continue
    }
    if n > 7 {
        break
    }
    drop(n)
}
```

```text output
1
3
5
7
```

Next: [functions](/docs/tour/functions/).
