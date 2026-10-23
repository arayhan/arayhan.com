# Security

The hard rule is in [AGENTS.md](../../AGENTS.md): secrets never
reach the client. This file is how
that is actually kept.

## Where a secret may be read

Only in files under `src/server/`, every one of which opens with
`import "server-only"`. That import is the enforcement: a client component that
imports such a module fails the build instead of shipping the value.

The browser talks to your route handlers. Only route handlers talk to the
database, the object store, or a third-party API with a key.

**`NEXT_PUBLIC_*` is a public variable.** The prefix is not a namespace —
it is an instruction to the bundler to inline the value into JavaScript the
browser downloads. Putting a key there publishes it. There is no "but the file is
only imported server-side" exception, because the prefix is what the bundler reads,
not the import graph.

## What never gets logged

Credentials, tokens, session ids, full request bodies on auth routes, and any
personal data that is not needed to debug the line being logged.

Logs get shipped to third parties, kept longer than anyone plans, and read by
people who never had access to the database. Treat a log line as public.

## Errors leak

An unhandled error's message and stack are written by a library that knows nothing
about your threat model — they routinely contain queries, file paths, and
connection strings. Catch at the boundary, log the detail server-side, return the
envelope shape from
your error
handler with a stable code and a message safe to show anyone.

## Input is hostile until parsed

Validate at the boundary, before business logic. Beyond shape:

- **SQL**: parameterised queries only. String interpolation into SQL is never
  acceptable, including "just for this admin query".
- **Rendering**: no `dangerouslySetInnerHTML` on anything that passed through user
  input without a sanitiser.
- **Redirects and file paths**: an attacker-supplied value is a path traversal or
  an open redirect until proven otherwise. Allowlist, never blocklist.
- **Authorisation is per-request.** Checking that a user is logged in is not
  checking that this user may touch this row. The id in the URL is attacker-
  controlled.

## Dependencies

A new dependency is new code you did not read running with your process's
privileges. Prefer the one already in `package.json`. Never commit a lockfile from
a package manager this project does not use — it silently resolves a different
tree than the one that was reviewed.

## Committed files

`.env` is never committed. `.env.example` carries the variable **names** and
`${PLACEHOLDER}` values, never a real one, so a leaked repo leaks nothing.

If a secret does get committed: rotate it first, then rewrite history. In that
order — history rewriting is slow and the value is public the moment it is pushed.

## This project's threats

TODO(content) — what this specific project must not leak, who the untrusted actors
are, and any compliance obligation that changes the rules above.
