---
title: Traits and kinds
description: Plumlang traits (interfaces with default methods) and kinds (enumerations whose cases can carry values), with match covering every case.
---

## Traits

A `trait` lists methods that a tree promises to have. Any tree that has the
trait can be used where the trait is expected, whatever else it is.

```plum
trait Shape {
    branch area() -> float
    branch name() -> str => "shape"
    branch summary() -> str => "{self.name()} with area {self.area():.2}"
}

tree Circle : Shape {
    radius: float
    branch area() -> float => 3.14159 * self.radius ** 2
    branch name() -> str => "circle"
}

tree Rect : Shape {
    width: float
    height: float
    branch area() -> float => self.width * self.height
}

plant shapes: list[Shape] = [Circle(1.0), Rect(2.0, 3.0)]
for s in shapes {
    drop(s.summary())
}
drop(shapes[0] is Circle)
```

```text output
circle with area 3.14
shape with area 6.00
good
```

`area` has no body in the trait, so every tree with the trait must write
one; forgetting it is a compile error. `name` and `summary` have bodies,
which trees get for free and may replace. `x is Type` asks what an object
really is.

A tree that extends another tree names its parent first, then its traits:
`tree Dog : Animal, Pet { ... }`.

## Kinds

A `kind` is a type with a fixed set of cases, like the four directions:

```plum
kind Direction { North, East, South, West }

plant heading = Direction.North
drop(heading, heading == Direction.North)
```

```text output
Direction.North good
```

Cases can carry values. `match` takes them apart, and must cover every
case, so adding a case later points you at every `match` that needs it:

```plum
kind Shape {
    Circle(radius: float)
    Rect(width: float, height: float)
}

branch area(s: Shape) -> float => match s {
    Circle(r) => 3.14159 * r ** 2
    Rect(w, h) => w * h
}

plant shapes = [Shape.Circle(1.0), Shape.Rect(2.0, 3.0)]
for s in shapes {
    drop(s, area(s))
}
```

```text output
Shape.Circle(1.0) 3.14159
Shape.Rect(2.0, 3.0) 6.0
```

Kind values are values, like numbers: two are equal when they are the same
case with equal contents.

Next: [when things go wrong](/docs/tour/errors/).
