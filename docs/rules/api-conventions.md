# API conventions

**Never invent a contract.** Field names, shapes, and status codes come from
[architecture.md](../architecture.md)'s "Data flow" section. If the
endpoint you need is not described there, that is a question for the user, not a
gap to fill with a plausible guess — a guessed contract is the bug that surfaces
in integration, after both sides are written.

## Status codes

| Code | When |
|---|---|
| 200 | Read succeeded, body has the resource |
| 201 | Create succeeded, body has the created resource |
| 204 | Delete or update succeeded, deliberately no body |
| 400 | Request is malformed or failed validation |
| 401 | No credentials, or they are not valid |
| 403 | Valid credentials, not allowed to do this |
| 404 | Resource does not exist — **or** exists and the caller may not know it does |
| 409 | Conflicts with current state (duplicate, stale write) |
| 422 | Well-formed but semantically impossible |
| 500 | We broke. Never a client's fault, never used to mean "something went wrong" |

403 versus 404 is a real decision, not a style choice: returning 404 for a
forbidden resource hides its existence, which is what you want whenever the id
itself is information.

## Error envelope

One shape for every failure, so a client writes one handler:

```json
{
  "error": {
    "code": "order_not_found",
    "message": "No order with that id.",
    "details": null
  }
}
```

- `code` is a stable machine string. Clients branch on it. Renaming one is a
  breaking change.
- `message` is for a human reading a log. It is **not** UI copy — the client
  decides what the user sees.
- `details` carries per-field validation errors and is `null` otherwise.

Never put a stack trace, a query, a connection string, or an upstream provider's
raw error in any of the three. See [security.md](./security.md).

## Validation at the boundary

Every request body, query string, and route param is parsed before it reaches
business logic. Unparsed input must not travel past the controller.
No validation library is installed in this project. Parse and narrow by hand at
the boundary, or add one before the first endpoint that takes a body — a hand-
written check that drifts from the type it guards is worse than no check, because
the type says it is safe.

## The DTO boundary

What crosses the wire is not what lives in `src/domain/`. A DTO is shaped by
the API's needs (flat, serialisable, versioned); a domain type is shaped by the
business. Map between them explicitly.

Returning a domain object directly is how an internal field ends up public,
because nobody re-reads the serialiser when they add a column.

## Pagination

Every list endpoint is paginated from the first version — retrofitting it is a
breaking change and there is no such thing as a list that stays small.

```
GET /orders?limit=20&cursor=<opaque>
{ "data": [...], "nextCursor": "<opaque>" | null }
```

Cursor, not offset: an offset query returns duplicates and gaps once rows are
inserted between two pages.

## Versioning

TODO(content) — decide before the first external consumer exists: URL prefix
(`/v1/`), a header, or a commitment never to break. Whichever it is, write it here
and stop re-litigating it per endpoint.

## This project's endpoints

TODO(content) — anything that departs from the above: an auth scheme, an
idempotency key, a rate limit, a third-party contract this API must mirror.
