---
title: Tasks
description: Concurrency in Plumlang. spawn runs a function as a task, wait collects its result, and channels pass values between tasks, with no async or await and no data races.
---

A *task* is a piece of work that runs alongside the rest of your program.
`spawn` starts one and gives back a `Task`; its `wait()` method returns the
result when the task is done.

```plum
seed time

branch fetch(n: int) -> int {
    time.sleep(0.1)          # stands in for a slow download
    return n * 10
}

plant start = time.clock()
plant jobs = [spawn fetch(1), spawn fetch(2), spawn fetch(3)]
for job in jobs {
    drop(job.wait())
}
drop("about 0.1 seconds in all:", time.clock() - start < 0.25)
```

```text output
10
20
30
about 0.1 seconds in all: good
```

The three tasks wait at the same time, so the whole program takes about
0.1 seconds, not 0.3.

## No async, no await

A task pauses only when it waits for something: a timer, the network, a
file, another task. Other tasks run meanwhile. The code looks the same
whether it runs in a task or not: there is no `async`, no `await`, and no
separate *async* version of any library function.

## Channels

Tasks don't share variables. Each gets its own copy of the values it is
given, so two tasks can never trample on each other's data. To talk, they
use a *channel*: one task `send`s values, another receives them.

```plum
plant results = Channel[str]()

spawn (() => {
    for name in ["plum", "pear", "fig"] {
        results.send(name.upper())
    }
    results.close()
})()

for r in results {
    drop(r)
}
```

```text output
PLUM
PEAR
FIG
```

`for r in results` receives until the channel is closed and empty.
`spawn (() => { ... })()` starts a task from a lambda written on the spot.

## What happens when a task fails

An error in a task is not lost: `wait()` throws it, so you can catch it as
usual. An error nothing waited for is printed when the program ends, and
if every task is stuck waiting for another, Plumlang reports the deadlock
instead of hanging.

All tasks take turns on one thread, so thousands of them are cheap. The
[`Task` and `Channel`](/docs/stdlib/task-methods/) page has the details.

Next: [a web server](/docs/tour/web-server/).
