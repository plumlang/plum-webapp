---
title: A tour of Plumlang
nav: Introduction
description: A step-by-step introduction to Plumlang for beginners, from printing a line to a web server, with a small runnable program on every page.
---

This tour introduces Plumlang one idea at a time. Each step is a short page
with small, complete programs and the output they print. You don't need to
have programmed before, though it helps to know what a variable is.

Plumlang is a small, statically typed language. Its keywords keep a garden
theme: you `plant` a variable, `drop` a value on the screen, grow a `branch`
(a function) and a `tree` (a class), and `seed` a module into your program.
Everything else reads like plain English: `and`, `or`, `not`, `if`, `for`.

## How to follow along

[Install Plumlang](/docs/install/), save a program in a file ending in
`.plum`, and run it:

```bash
plum run hello.plum
```

`plum check hello.plum` looks for mistakes without running the program. A
[playground](/playground/) that runs Plumlang in your browser is on its way.

## The steps

1. [Hello, world](/docs/tour/hello-world/): printing, comments and running a program.
2. [Values and variables](/docs/tour/values/): numbers, text, `plant` and `root`.
3. [Making decisions and loops](/docs/tour/control-flow/): `if`, `match`, `while` and `for`.
4. [Functions](/docs/tour/functions/): `branch`, default and named arguments, lambdas.
5. [Lists, maps and missing values](/docs/tour/collections/): collections and `none`.
6. [Trees: your own types](/docs/tour/trees/): fields, methods and inheritance.
7. [Traits and kinds](/docs/tour/traits-and-kinds/): shared behaviour and fixed sets of cases.
8. [When things go wrong](/docs/tour/errors/): compile errors, `throw`, `try` and `catch`.
9. [Modules](/docs/tour/modules/): `seed`, the standard library and programs of several files.
10. [Tasks](/docs/tour/tasks/): doing several things at once with `spawn` and channels.
11. [A web server](/docs/tour/web-server/): `net.http` in a few lines.

The tour shows the common path. The [language reference](/docs/language/)
is the full and exact description of the language, and the
[standard library](/docs/stdlib/) documents every module.
