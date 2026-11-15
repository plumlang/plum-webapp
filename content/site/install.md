---
title: Download and install
nav: Install
metaTitle: Download and install Plumlang
description: How to install Plumlang. Download the plum binary from GitHub Releases or build it from source with a C11 compiler; one-line installers are coming soon.
---

Plumlang is one program, `plum`, with no dependencies: the compiler, the
virtual machine and the whole standard library are inside it. Installing
Plumlang means putting that one file on your `PATH`.

> **Status: pre-alpha.** The language is being built in the open, stage by
> stage; see the [roadmap](https://github.com/plumlang/plumlang/issues/36).
> Programs and the standard library can still change between versions.

## Download a release

Releases of Plumlang are published on
[GitHub Releases](https://github.com/plumlang/plumlang/releases), with a
`plum` binary for each platform:

1. Open the [releases page](https://github.com/plumlang/plumlang/releases)
   and download the archive for your system.
2. Unpack it and move `plum` (`plum.exe` on Windows) to a folder on your
   `PATH`.
3. Check that it works:

```bash
plum version
```

Until the first tagged release is out, build `plum` from source as below.

## One-line installers

Coming soon. Signed release builds for Linux, macOS and Windows, with
`install.sh`, `install.ps1`, Homebrew and winget, are tracked in
[plumlang#33](https://github.com/plumlang/plumlang/issues/33).

## Build from source

You need a C11 compiler (GCC, Clang or MSVC) and `make`, or CMake. Nothing
else: the TLS library Plumlang uses for HTTPS is included in the source.

```bash
git clone https://github.com/plumlang/plumlang
cd plumlang
make                 # builds ./plum
make test            # optional: runs the test suite
./plum version
```

On Windows with MSVC:

```bat
cmake -B build && cmake --build build --config Release
```

Then copy `plum` to a folder on your `PATH`.

## Your first program

Save this as `hello.plum`:

```plum
drop("Hello, world!")
```

and run it:

```bash
plum run hello.plum
```

The `plum` command also checks programs without running them, and lists the
standard library:

```bash
plum check hello.plum   # report every error, run nothing
plum stdlib             # every standard module and its functions
plum stdlib math        # one module
plum help               # everything else
```

Next, take the [tour](/docs/tour/), or try Plumlang in the
[playground](/playground/) once it opens.

## Licence

Plumlang is source-available under the
[Plumlang Commercial License 1.0](https://github.com/plumlang/plumlang/blob/main/LICENSE).
It is free for personal, educational, research and other non-commercial use,
and free to evaluate for 60 days. Commercial use, redistribution and hosted
services need a commercial licence: write to
[hello@elixpo.com](mailto:hello@elixpo.com). Programs you write in Plumlang
are yours.
