---
title: A web server
description: Build an HTTP server in Plumlang with net.http. Routes with parameters, query strings and JSON responses, plus the HTTP client, each connection in its own task.
---

The standard library includes `net.http`, an HTTP/1.1 server and client.
A complete web server:

```plum norun
seed net.http

plant app = http.server()

app.get("/", (req) => http.html("<h1>Hello from Plumlang</h1>"))
app.get("/hello/:name", (req) => http.text("Hello, {req.params["name"]}!"))

drop("Listening on http://localhost:8080")
app.listen(8080)
```

Run it, and open `http://localhost:8080/hello/you` in a browser.

- `http.server()` makes a server; `app.get(pattern, handler)` adds a
  route. A handler takes the request and returns a response.
- `:name` in a pattern matches one part of the path, and the request's
  `params` map holds what it matched.
- `http.text`, `http.html` and `http.json` make responses.
- Each connection is served by a task of its own, so one slow client
  holds up nobody.

## Query strings and JSON

```plum norun
app.get("/add", (req) => {
    plant a = int(req.query.get("a") ?? "0")
    plant b = int(req.query.get("b") ?? "0")
    return http.json({"a": a, "b": b, "sum": a + b})
})
```

`/add?a=2&b=40` answers `{"a":2,"b":40,"sum":42}`.

## The client, and a server that tests itself

`http.get` fetches a URL. Here the server starts in the background on a
free port, asks itself a few questions, and stops, which is how the
examples in the repository test themselves:

```plum
seed net.http

plant app = http.server()
app.get("/hello/:name", (req) => http.text("Hello, {req.params["name"]}!"))
app.get("/add", (req) => {
    plant a = int(req.query.get("a") ?? "0")
    plant b = int(req.query.get("b") ?? "0")
    return http.json({"a": a, "b": b, "sum": a + b})
})

plant port = app.start(0, host: "127.0.0.1")
plant base = "http://127.0.0.1:{port}"

drop(http.get(base + "/hello/garden").body)
drop(http.get(base + "/add?a=2&b=40").body)
drop(http.get(base + "/missing").status)
app.stop()
```

```text output
Hello, garden!
{"a":2,"b":40,"sum":42}
404
```

The [`net.http`](/docs/stdlib/net-http/) page covers the rest:
middleware, static files, HTTPS, and the client's `post` and `post_json`.

## Where to go next

You've seen most of Plumlang. From here:

- The [language reference](/docs/language/) describes every part of the
  language exactly.
- The [standard library](/docs/stdlib/) documents each module.
- The [examples](https://github.com/plumlang/plumlang/tree/main/examples)
  in the repository are small, complete programs: a bank, shapes, a to-do
  list, an echo server and a REST API.
- Questions and ideas are welcome in
  [GitHub Discussions](https://github.com/plumlang/plumlang/discussions).
