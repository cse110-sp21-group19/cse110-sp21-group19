Our CI/CD build system will be implemented in stages as our code base is built - in this way, our pipeline can better accomodate the codebase decisions of our developers (i.e. build and test scripting will aim to match and accomodate the growing needs backend's and frontend's decisions/needs). Some exceptions include Documentation automation as this is something that helps the project as a whole and is best implemented ahead fo time.

## Merged/Implemented
- lint - Merged in Master; we used eslint since it's reports are easy to inpterpret, our developers can use a built in fix script, and it's wide array of tools allow for fine tuning the rules

- pull request - Merged into Master; We will be using Github actions to automatically add code owners (team leads) as code reviewers to every pull request to streamline the PR process. We also have an action to mark a PR as approved once two review approvals have been made (these whould be the team leads). Also added templates so that developers can target relevant information needed in PR.

- unit test automation (backend) - Merged into Master; We are looking to use jest as it can be quickly integrated through npm and has support from the CSE 110 - likely on to be implemented on experimental branch. It also allows for modular use in our pipeline where tests can be created independantly from the main code base and reduces the need to overhaul the pipeline for new tests.

## In Progress

- documentation - We likely are going to use JSdoc since the benefit of automatic documentation will greatly reduce the overhead near the end of the project and will generally increase code readability and give a reference for our developers, implementation is ongoing.

- unit test automation (frontend) - We are looking to use jest-puppeteer as it can be quickly integrated through npm and has support from the CSE 110 - likely on to be implemented on experimental branch. Implementation is ongoing.

- code quality - We are looking into "codacy", research is ongoing but we are likely going to implement this soon.

## Backlog  

- Deployment - initial research is ongoing. Current options are github pages vs heroku

- Logging - We are still iff-y on the need for this right now cause our developers arent as close to this stage (major overkill). Rudimentary research is going on but we want developer teams to have more input here since they will be using this tool for debugging later