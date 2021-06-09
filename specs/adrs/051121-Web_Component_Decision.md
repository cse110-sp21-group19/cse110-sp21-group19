# 5/11/21 - Web Component Decision

## Context and Problem Statement

The frontend developers wanted to consider different options to organize code through web components.

## Considered Options

* React Components
* Vanilla JavaScript without Shadow DOM
* Vanilla JavaScript with Shadow DOM

## Decision Outcome

We first decided on using Vanilla JavaScript as our group has minimal experience with React. React's learning curve and time expenses would not suit our timeline. While we considered not using Shadow DOM in order to simplify our styling, we ultimately decided to use the Shadow DOM because it will nicely encapsulate each component and everyone on the team has had exposure to it via Lab 6. We also decided to attach CSS to each component using `<link>` tags rather than `<style>` tags so that we can still access our variables defined in SCSS and we can avoid adding style in files other than `.scss` files.