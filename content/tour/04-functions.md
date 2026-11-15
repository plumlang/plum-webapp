---
title: Functions
description: Declaring functions in Plumlang with branch, parameter and result types, one-line functions with =>, default and named arguments, lambdas and closures.
---

A function is declared with `branch`. Its parameters always have types,
and its result type follows `->`:

```plum
branch add(a: int, b: int) -> int {
    return a + b
}

branch greet(name: str) {
    drop("Hello, {name}")
}

drop(add(2, 3))
greet("Ada")
```

```text output
5
Hello, Ada
```

`greet` returns nothing, so it has no `->`. A function that does return a
value must return one on every path; the compiler checks.

Functions can be called before the line that declares them, so you can put
the main part of a program first and the helpers after it.

## One-line functions

When the body is a single expression, `=>` replaces the braces and the
`return`:

```plum
branch square(x: int) -> int => x * x

drop(square(12))
```

```text output
144
```

## Default and named arguments

A parameter can have a default value, which makes it optional. Arguments
can also be passed by name, after the positional ones:

```plum
branch connect(host: str, port: int = 80, secure: bool = bad) {
    drop("{host}:{port} secure={secure}")
}

connect("example.com")
connect("example.com", 443, secure: good)
connect("example.com", secure: good)
```

```text output
example.com:80 secure=bad
example.com:443 secure=good
example.com:80 secure=good
```

## Parameters are read-only

Inside a function, its parameters are constants. Lists, maps and strings
are *values* in Plumlang, so a function gets its own copy and can never
change the caller's list behind its back; it returns a new one instead.

```plum
branch with_bonus(scores: list[int]) -> list[int] {
    plant result = scores
    result.push(100)
    return result
}

plant mine = [70, 85]
drop(with_bonus(mine))
drop(mine)
```

```text output
[70, 85, 100]
[70, 85]
```

## Functions as values

A function is a value too. A *lambda* is a function without a name, written
`(parameters) => expression`. Lambdas are handy with list methods like
`map`, `filter` and `reduce`:

```plum
plant numbers = [1, 2, 3, 4, 5, 6]

plant evens = numbers.filter((n) => n % 2 == 0)
plant squares = numbers.map((n) => n * n)
plant total = numbers.reduce((a, b) => a + b, 0)

drop(evens, squares, total)

plant double = (x: int) => x * 2
drop(double(21))
```

```text output
[2, 4, 6] [1, 4, 9, 16, 25, 36] 21
42
```

The lambda's parameter types can be left out when Plumlang can tell them
from where the lambda is used, as with `filter` above.

## Recursion

A function may call itself:

```plum
branch factorial(n: int) -> int {
    if n <= 1 {
        return 1
    }
    return n * factorial(n - 1)
}

drop(factorial(20))
```

```text output
2432902008176640000
```

`factorial(21)` doesn't fit in 64 bits, so it stops with an
`OverflowError` instead of printing a wrong number.

Next: [lists, maps and missing values](/docs/tour/collections/).
