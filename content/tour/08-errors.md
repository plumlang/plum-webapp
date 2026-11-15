---
title: When things go wrong
nav: Errors
description: How Plumlang reports mistakes. Compile errors with codes and hints, runtime errors with stack traces, and throw, try, catch and finally for your own errors.
---

Plumlang has two kinds of mistakes, and tells you about both in plain
words.

## Compile errors

Most mistakes are found before the program runs: a misspelled name, a
string where a number should be, a missing `return`. `plum` shows the line,
underlines the problem, and suggests a fix:

```plum norun
plant total = 0
for i in 0..3 {
    totl += i
}
drop(total)
```

```text
total.plum:3:5: error[E0301]: unknown name 'totl'; did you mean 'total'?
3 |     totl += i
  |     ^~~~
1 error
```

Adding a number to a string is caught the same way, with a hint:

```text
count.plum:2:17: error[E0403]: can't add str and int; to put a value in text, use interpolation: "text {value}"
2 | plant message = "items: " + count
  |                 ^~~~~~~~~~~~~~~~~
1 error
```

Every error has a code, like `E0301`. The [error codes](/docs/errors/) page
explains each one with an example and its fix. `plum check file.plum`
reports every error in a file without running it.

## Runtime errors

Some problems can only happen while the program runs: a file that isn't
there, a list index out of range, a number too big for 64 bits. These
*throw* an error. If nothing catches it, the program stops with a message
and a stack trace showing where it happened.

## try and catch

`try` runs a block, and `catch` handles an error thrown inside it:

```plum
plant numbers = [1, 2, 3]

try {
    drop(numbers[10])
} catch e: IndexError {
    drop("no such item:", e.message)
}

try {
    drop(int("forty-two"))
} catch e {
    drop("that wasn't a number")
}
```

```text output
no such item: index 10 is out of range: the list has 3 items (0 to 2)
that wasn't a number
```

`catch e: IndexError` catches only that kind of error; a plain `catch e`
catches any error. A `finally { }` block after the catches runs however
the `try` ends, which is the place to tidy up.

## Your own errors

Errors are trees that extend the built-in `Error` tree, which has a
`message`. Make your own by extending it, and `throw` one when something
is wrong:

```plum
tree Overdrawn : Error {
    short_by: float
}

tree Account {
    balance: float = 0.0

    branch withdraw(amount: float) {
        if amount > self.balance {
            throw Overdrawn("not enough money", amount - self.balance)
        }
        self.balance -= amount
    }
}

plant acct = Account(20.0)
try {
    acct.withdraw(50.0)
} catch e: Overdrawn {
    drop("{e.message}: short by {e.short_by:.2}")
}
```

```text output
not enough money: short by 30.00
```

## try as a value

When all you need is a fallback, `try` before an expression turns an error
into `none`, and `??` supplies the default:

```plum
plant text = "8O80"
plant port = try int(text) ?? 8080
drop(port)
```

```text output
8080
```

Next: [modules](/docs/tour/modules/).
