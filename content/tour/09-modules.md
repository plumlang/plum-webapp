---
title: Modules
description: Importing standard library modules with seed, aliases and named imports, splitting a Plumlang program into files, private names, and packages with plum.toml.
---

## The standard library

`seed` brings a module into your program. The standard library has modules
for maths, text, files, time, JSON, networking and the web:

```plum
seed math
seed time

drop(math.sqrt(2.0))
drop(math.max(3, 9), math.round(math.PI, digits: 2))
drop(time.now() > 0.0)
```

```text output
1.4142135623730951
9 3.14
good
```

A module can be renamed with `as`, or its names brought in directly:

```plum
seed math as m
seed math { sqrt, PI }

drop(m.floor(2.7), sqrt(16.0), PI > 3.0)
```

```text output
2 4.0 good
```

Strings, lists and maps need no `seed`: their methods are always there.
`plum stdlib` lists every module's functions, and the
[standard library](/docs/stdlib/) pages document them.

## Your own modules

Every `.plum` file is a module. Say `shapes.plum` holds:

```plum norun
root PI = 3.14159

branch circle_area(r: float) -> float => PI * r ** 2

branch _helper() { }       # starts with _: private to this file
```

Another file next to it imports it by its path, starting with `./`:

```plum norun
seed ./shapes

drop(shapes.circle_area(2.0))
```

`seed ./models/user as user` reaches into folders, and
`seed ./shapes { circle_area }` brings names in directly, just as with the
standard library. Names that start with `_` stay private to their file.

Each file runs once, the first time something imports it, so a module can
set itself up with ordinary statements at its top level.

## Packages

A folder with a `plum.toml` file is a package. Its `entry` file is the
program:

```toml
[package]
name = "garden"
version = "0.1.0"
entry = "main.plum"
```

`plum run garden` then runs `garden/main.plum`. The repository's
[garden example](https://github.com/plumlang/plumlang/tree/main/examples/garden)
is a small program in several files.

Next: [tasks](/docs/tour/tasks/).
