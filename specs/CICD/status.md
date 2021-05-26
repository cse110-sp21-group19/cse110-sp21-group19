Our CI/CD build system will be implemented in stages as our code base is built - in this way, our pipeline can better accomodate the codebase decisions of our developers (i.e. build and test scripting will aim to match and accomodate the growing needs backend's and frontend's decisions/needs). Some exceptions include Documentation automation as this is something that helps the project as a whole and is best implemented ahead fo time.

## Merged/Implemented
- lint - Merged in Master; we used eslint since it's reports are easy to inpterpret, our developers can use a built in fix script, and it's wide array of tools allow for fine tuning the rules

- pull request - We will be using Github actions to automatically add code owners (team leads) as code reviewers to every pull request to streamline the PR process. We also have an action to mark a PR as approved once two review approvals have been made (these whould be the team leads). Also added templates so that developers can target relevant information needed in PR.

## In Progress
- unit test automation - We are looking to use jest as it can be quickly integrated through npm and has support from the CSE 110 - likely on to be implemented on experimental branch. Implementation is ongoing.

- documentation - We likely are going to use JSdoc since the benefit of automatic documentation will greatly reduce the overhead near the end of the project and will generally increase code readability and give a reference for our developers, implementation is ongoing.

- code quality - We are likely going to use the tool "codacy" if we are able to get access to it as a service, but research is ongoing and decision might change if we find too many blockers.

## Backlog  

