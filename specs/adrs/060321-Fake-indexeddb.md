# 5/11/21 - Jest Backend Unit Testing
## Context and Problem Statement

To test the team's indexedDB backend a pure JS in-memory implementation of the IndexedDB API is needed.

## Considered Options

* fake-indexeddb

## Decision Outcome

We decided to use fake-indexeddb so we can unit test backend team's database. 