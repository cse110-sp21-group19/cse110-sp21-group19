# 6/7/21 - Package Restructure
## Context and Problem Statement

The current package system is redundant as banckend and frontend have no specific packages for their systems

## Considered Options

* Consolidated package.json

## Decision Outcome

We consolidated the package system into a mono system (one master package.json in the root of the repo). This was due to the redundance of the frontend and backend package.json files that was magnified when we choose to do a combined local app with backend on the browser.
