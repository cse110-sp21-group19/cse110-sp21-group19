# 5/13/21 - Week 7 Debrief

## Where
Derek's Zoom

## Started at
7:00pm PDT

### Agenda
- Review Name for Web App
- Status of Webapp
  - Local - Like Lab's Meme Generator
  - Online - Like actual internet stuff
- Debrief Design
  - Making sure stuff is documented
  - Go over completed HiFi for Daily Log
  - Go over remaining LoFis
  - User Heuristics
- Debrief Frontend
  - All three parts completed
  - Demo
  - Status on styling
  - ADR for Page Loads - [Rail](https://web.dev/rail/)
    - Page Load Times
    - Reponse Times
    - Animations
- Debrief Backend - [Usability](usabilityhub.com), [Rail](https://web.dev/rail/)
  - API
  - Database
  - Google Login API
  - ADR for Loads (from API / DB)
- Update for Builders, Testers, and Documentation
  - CI/CD Pipeline
  - Jest
    - Load testing - 50 people (expect less, prepare for more) - [Rail](https://web.dev/rail/)
  - JSDocs
- Schedule for review (This is what I did and I think it's pretty cool) + retrospective (How did we do and how do we do better?) meeting
  - Saturday, Monday, Tuesday

### Attendees
Everyone except Chris

### What We Did
- Name
  - Eucalyptus
  - Something with "Log"
- Disucssion about nature of App - Probably Local, ideally Online
  - Local vs. Online
    - Local
      - Extra steps for the user? --> In fact, the program (backend) should be able to take care of it
      - Need to figure out importing / exporting
      - Easier Security --> just encrypting local files 
      - Does not need a login anymore
        - No need for Google Accounts
      - More feasible -- more chance that we can finish
      - Changes to DB
        - Design would be more streamlined
    - Online
      - Easier to do cross compatibility w/ different devices
      - Extra Learning - Associate with other online services (google Drive) --> may include more stuff for learning other APIs
      - Security Risks --> internet people can ping the app -- Too much load?
      - Simultaneous use of backend
- Design Debrief
  - Stars for important
  - Hovering checkmark -> check and then you can cross off
  - Daily Log Drops down
  - Critiques
    - Daily Log - Blue looks a little out of place
    - Background not so minimal --> maybe a custom designed logo - Looks more minimal w/o leaves in background
    - Colors are clashing -- Maybe just single on just a single color
    - Spacing: "Tuesday May 11" is a little close to the Main Text area
    - Current Fonts: Title - Open Sans | Body - Roboto (Open Menu - Daily Log)
    - Shadows: Just for the boxes --> not the text
      - Font suggestion: Montserrat
  - Additional Entries
    - Text Box -- not necessarily for Bulleting
- Frontend Debrief
  - Manda:
    - Content - Editable to allow for nested Bullets
      - A little bit of a challenge
  - Malhar:
    - Modeled after the Lofi
    - Blank Note and Pictures
    - Limited to 3 --> look into implementing the carasoul
  - Cory:
    - Slides from the side instead of the top
    - A little "scuffed"
- Backend Debrief
  - API Design has been cleaned up
  - Google backend documentation was written (might not be used anymore)
  - Local installation --> done 

### Points of Action
- Design
  - Addressing critiques from the team -- small nitpick options
- Frontend - Should be as efficient as possible
  - Functionality 
    - nested bullets
- Backend - Should be as efficient as possible
  - Standardize types of parameters - Maybe a json file
  - Check out IndexDB
- Builder
  - Code quality review --> Codacy 
    - Quality Assurance 
- Review Retrospective @ Saturday 5-6pm PDT
- Name: Project Eucalyptus

## Ended at
8:16pm PDT Designers/Frontend
8:21pm PDT Backend