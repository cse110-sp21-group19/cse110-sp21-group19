# iNeedA\<br> Onboarding Guide
Updated 6/6/21

## Navigation
- [iNeedA\<br> Onboarding Guide](#ineedabr-onboarding-guide)
  - [Navigation](#navigation)
  - [Understanding iNeedA\<br>](#understanding-ineedabr)
  - [Understanding Eucalyptus](#understanding-eucalyptus)
  - [Understanding iNeedA\<br>'s Team Structure](#understanding-ineedabrs-team-structure)
    - [Management](#management)
    - [Design](#design)
    - [Frontend Developer](#frontend-developer)
    - [Backend Developer](#backend-developer)
    - [Testing Developer](#testing-developer)
    - [DevOps](#devops)
  - [Getting The Tools](#getting-the-tools)
    - [Github](#github)
    - [Setting up the IDE](#setting-up-the-ide)
  - [Getting The Code](#getting-the-code)
  - [Navigating the Repository](#navigating-the-repository)
    - [Admin](#admin)
    - [Source](#source)
      - [Frontend](#frontend)
      - [Backend](#backend)
    - [Specs](#specs)
  - [Building Eucalyptus](#building-eucalyptus)

## Understanding iNeedA\<br>
iNeedA\<br> (Group) is founded on the belief that everyone is an ally to everyone else. We value phycological safety and promote an environment where people are able to present ideas and expect to be given constructive criticism. We value individuals who are open about their struggles, are not shy about asking for help, and are constantly improving through constructive criticism. 

## Understanding Eucalyptus
Eucalyptus is a light-weight online bullet journal tool that allows users to perform rapid logging, prioritization, and more. Eucalyuptus supports three types of bullets: `note`, `task`, and `event`. Eucalyptus also supports the inclusion of additional entries in the form of plaintext documents or images. 

Eucalyptus uses IndexDB as a database for storing and retrieving bullets. Our API supports storing bullets and retriving bullets based on queries (Date, Bullet Type, etc.)

## Understanding iNeedA\<br>'s Team Structure
Upon joining iNeedA\<br>, you will be included into one of six teams: management, design, frontend developer, backend developer, testing developer, or developer operations (DevOps). 

### Management
You will be responsible for planning sprint goals, setting group meeting times, and maintaining the repository.

### Design
You will be responsible for maintaining and improving the design of Eucalyptus. This includes changing color palettes as well as the creation of logos and other branding material.

### Frontend Developer
You will be responsible for developing the UI/UX of Eucalyptus as well as supporting more features for improved capability of our app.

### Backend Developer
You will be responsible for improving and maintaing our database API.

### Testing Developer
You will be responsbiel for improving and maintaining our testing scripts as well as creating internal tools for more robust testing.

### DevOps
You will be responsbile for maintaining and improving upon the current build pipeline. Your responsibilities will include automatic documentation generation, automatic unit tests, automatic style checking, and similar tasks.

For more detailed responsibilities for your team, contact your mentor or direct manager.


## Getting The Tools

### Github
Make sure you have a Github account. You can sign up [here](github.com)

### Setting up the IDE
The Group codes in **Javascript (JS)**. You may want to download [Node.js](https://nodejs.org/en/download/) in order to run JS on your local machine.

The Group uses **Visual Studio Code (VSC)** as our main IDE for development. 

You can get VSC here: https://code.visualstudio.com/download

Be sure to get the following extensions, instructions [here](https://code.visualstudio.com/docs/editor/extension-gallery):
- [Draw.io](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio)
- [LiveShare](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare)
- [Markdown All In One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
- [CodeStream](https://marketplace.visualstudio.com/items?itemName=CodeStream.codestream)
- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)

## Getting The Code
Get the source code
- Clone the source code from: https://github.com/cse110-sp21-group19/cse110-sp21-group19.git

Follow the instructions on the Readme in order to install the necessary packages

Make sure you read over the [Style Guide](admin/specs/../../../../specs/style_guide.md) before you start coding

For more information about SCSS compiling, read the documentation [here](https://sass-lang.com/documentation)

## Navigating the Repository
The source code is separated into 3 parts
1. Admin
2. Source
3. Specs

### Admin
Administrative documents are located here. Documents and files related to branding, meetings, and videos are all located in the Admin folder. 

### Source
The source code is located here. Source is separated into 2 folders, `frontend` and `backend`. 

#### Frontend
HTML files, web components, JS scripts for the Web components, CSS styling

#### Backend
IndexDB Database API

### Specs
Specification documents are located here. Documents such as ADRs, initial brainstorming, CICD documentation, Source documentation, design documents, intial pitch documents, proof of concepts, and testing reports. 

Documents that are not administrative are located here.

## Building Eucalyptus
Builds will generate both on pushes and pull requests from any branch to any branch. This should happen automatically and require no extra actions from the developer
