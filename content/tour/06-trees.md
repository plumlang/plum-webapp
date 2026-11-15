---
title: "Trees: your own types"
nav: Trees
description: Defining your own types in Plumlang with tree. Fields with defaults, methods and self, to_str for printing, init, inheritance with super, and shared objects.
---

A `tree` is Plumlang's class: a type you define, made of *fields* (the data)
and *methods* (functions that work on it).

```plum
tree Account {
    owner: str
    balance: float = 0.0

    branch deposit(amount: float) {
        self.balance += amount
    }

    branch to_str() -> str => "{self.owner}: {self.balance:.2}"
}

plant acct = Account("Ada")
acct.deposit(50)
acct.deposit(12.5)
drop(acct)
drop(acct.balance)
```

```text output
Ada: 62.50
62.5
```

- Calling the tree's name makes an object. The arguments fill the fields in
  order; `balance` has a default, so it can be left out.
- Inside a method, `self` is the object. Fields are always reached through
  it, as `self.balance`, so a field is never mistaken for a local variable.
- A `to_str` method decides how the object prints, in `drop` and in
  `{interpolation}`. Without one it prints as `<Account>`.

Fields with defaults can also be given by name:
`Account("Grace", balance: 100.0)`.

## init

When building an object takes more than filling in fields, give the tree an
`init` method. Calling the tree's name then calls `init`:

```plum
tree Temperature {
    celsius: float

    branch init(fahrenheit: float) {
        self.celsius = (fahrenheit - 32.0) * 5.0 / 9.0
    }
}

plant t = Temperature(212.0)
drop(t.celsius)
```

```text output
100.0
```

## Objects are shared

Unlike lists and maps, objects are not copied. Two names can refer to the
same object, and a change through one is seen through the other:

```plum
tree Counter {
    count: int = 0
    branch tick() { self.count += 1 }
}

plant a = Counter()
plant b = a
b.tick()
b.tick()
drop(a.count)
```

```text output
2
```

## Inheritance

A tree can extend one other tree with `:`. It gets the parent's fields and
methods, can add its own, and can replace (override) methods.
`super.method()` calls the parent's version.

```plum
tree Animal {
    name: str
    branch speak() -> str => "..."
    branch intro() -> str => "{self.name} says {self.speak()}"
}

tree Dog : Animal {
    branch speak() -> str => "woof"
}

tree Puppy : Dog {
    branch speak() -> str => super.speak() + " (squeaky)"
}

plant pets: list[Animal] = [Dog("Rex"), Puppy("Bit"), Animal("Generic")]
for pet in pets {
    drop(pet.intro())
}
```

```text output
Rex says woof
Bit says woof (squeaky)
Generic says ...
```

A `Dog` can go anywhere an `Animal` is expected, as in the list above.

## Private names

Fields and methods whose names start with `_` can only be used by the tree
itself (and the trees that extend it):

```plum
tree Wallet {
    _cents: int = 0
    branch add(cents: int) { self._cents += cents }
    branch total() -> str => "{self._cents // 100}.{self._cents % 100:02}"
}

plant w = Wallet()
w.add(1250)
w.add(5)
drop(w.total())
```

```text output
12.55
```

Next: [traits and kinds](/docs/tour/traits-and-kinds/).
