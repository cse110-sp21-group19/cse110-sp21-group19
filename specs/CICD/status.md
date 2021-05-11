Our CI/CD build system will be implemented in stages as our code base is built - in this way, our pipeline can better accomodate the codebase decisions of our developers (i.e. build and test scripting awaiting backend's and frontend's decisions as to how they will organize and design their codebase of the repo).

## Merged/Implemented
- lint - Merged in Master; we used eslint since it's reports are easy to inpterpret, our developers can use a built in fix script, and it's wide array of tools allow for fine tuning the rules

## In Progress
- pull request - no formal tooling has been choosen; we plan to use main branch protection but that tool must be paid for, Sasya is currently talking to the professor about our options there

- unit test automation - awaiting backend api codebase to be fleshed out; we likely are goign to use jest, but we are awaiting for more code to be filled out so our pipeline scripts can really run

- documentation - awaiting backend api codebase to be fleshed out; we likely are goign to use JSdoc, but we are awaiting for more code to be filled out so our CI pipeline can really run

## Backlog  
- code quality - research ongoing; still looking at options