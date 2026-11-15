---
title: Lists, maps and missing values
nav: Lists, maps and none
description: Plumlang collections (lists, maps and sets), how values are copied, optional types with none, the ?? operator and if plant to unwrap.
---

## Lists

A list holds values of one type, in order. Indexes start at 0.

```plum
plant fruits = ["plum", "pear"]
fruits.push("fig")

drop(fruits, len(fruits))
drop(fruits[0], fruits[len(fruits) - 1])
drop(fruits[0..2])
drop("pear" in fruits)
```

```text output
["plum", "pear", "fig"] 3
plum fig
["plum", "pear"]
good
```

`fruits[0..2]` is a *slice*, a new list of items 0 and 1. Reading past the
end of a list is an error with a clear message, never a crash or a random
value.

An empty list needs its type written, since there is nothing in it to go
by:

```plum
plant scores: list[int] = []
for i in 0..4 {
    scores.push(i * 10)
}
drop(scores)
scores.reverse()
drop(scores)
```

```text output
[0, 10, 20, 30]
[30, 20, 10, 0]
```

## Maps

A map connects keys to values, and remembers the order keys were added in:

```plum
plant ages = {"ada": 36, "grace": 45}
ages["linus"] = 28
ages["ada"] += 1

drop(ages)
drop(ages["grace"], "bob" in ages)

for name, age in ages {
    drop("{name} is {age}")
}
```

```text output
{"ada": 37, "grace": 45, "linus": 28}
45 bad
ada is 37
grace is 45
linus is 28
```

The empty map is written `{:}`, with its type: `plant counts: map[str, int]
= {:}`.

## Sets

A set keeps each value once:

```plum
plant seen = set(["plum", "pear", "plum"])
seen.add("fig")
drop(seen, len(seen), seen.contains("pear"))
```

```text output
set(["plum", "pear", "fig"]) 3 good
```

## Copies, not surprises

Strings, lists, maps and sets are *values*. Assigning one to another
variable gives that variable its own copy:

```plum
plant a = [1, 2, 3]
plant b = a
b.push(4)
drop(a)
drop(b)
```

```text output
[1, 2, 3]
[1, 2, 3, 4]
```

Copying is cheap: the two share their data until one of them changes it.

## Missing values: none

A plain `str` always holds a string; it can never be missing. When a value
may be absent, its type ends with `?`, and `none` is the absent value.
Plumlang makes you deal with `none` before you use the value, so a missing
value can't crash your program.

```plum
plant ages = {"ada": 36}

plant found = ages.get("ada")      # an int? : the age, or none
plant missing = ages.get("bob")

drop(found, missing)
drop(missing ?? 0)

if plant age = ages.get("ada") {
    drop("ada is {age}")
}
```

```text output
36 none
0
ada is 36
```

- `??` gives a default when the value on its left is `none`.
- `if plant name = value { ... }` runs the block only when the value is
  there, and inside it `name` is a plain, never-missing value.

`ages["bob"]` would stop the program with a `KeyError`; `ages.get("bob")`
asks instead, and gives `none`.

Next: [trees, your own types](/docs/tour/trees/).
