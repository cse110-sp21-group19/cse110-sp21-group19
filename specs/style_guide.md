# Style Guide - iNeedA\<br>


## Table of Contents
[HTML](#html)

[CSS](#css)

[Javascript](#css)

<hr>

## HTML
- Keep styling out of html files
  - Exception: Element is unique, does not fit a style already defined, and the styling is simple (~2 style properties), then styling may be defined within the element
- Give elements ids unless you have a really good reason to not include it
  - Use descriptive ids
  - Lowercase
  - Use hyphen (`-`) to seperate words
- List attributes in order (where applicable)
  - id, class, etc.
  
  >`<h1 id = "header1" class = "heading">This is a heading<\h1>`
- Include newlines between distinct parts of the code
  - i.e. seperate headings, paragraphs, media assets, div containers, etc.
  - Exception: List items, lines right after and before containers
    >`<div id = "div1">` \
    >&nbsp;&nbsp;&nbsp;&nbsp;`<h6 id = "heading">This is a heading\</h6>`
    >
    >&nbsp;&nbsp;&nbsp;&nbsp;`<p id = "paragraph"> This is a paragraph</p>`\
    >`</div>`
    >
    >`<div id = "div2">` \
    >&nbsp;&nbsp;&nbsp;&nbsp;`<ol id = "ordered-list>` \
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<li> l1 </li>` \
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<li> l2 </li>` \
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`<li> l3 </li>` \
    >&nbsp;&nbsp;&nbsp;&nbsp;`</ol>` \
    >`</div>`
- Indent (*Tabs*) each level of HTML
  - See above example

## CSS
- Include newlines between new CSS definitions
- Group relevant definitions together
  - i.e. Class CSS together, ID CSS together, etc.

## Javascript
General
- Use tabs instead of spaces for indentation
- Always end lines with semicolons
- Use `let` and `const`, avoid using `var`
- Include spaces between operators
  - i.e. `let z = x + y;`, `let message = "hello";`

Naming Conventions
- Constants are all uppercase, no spaces
  - i.e. `const FETCHURL = "https://www.whatever.com/resource";`
- Variables are named with camelCase and full words
  - i.e. `let myImage = new Image();`
  - Exception: Counter variables for loops
- Classes and Constructors are named with capital letters for each word
  - i.e. `class Entry{...}`, `class JournalEntry{...}`
  - i.e. `new Entry();`, `new JournalEntry();`
- Functions start with a verb describing its function
  - i.e. `function doSomething(){...}`, `function getName(){...}`

Commenting for functions
- Follow conventions for [JSDOC](https://devhints.io/jsdoc)
- Include a header and footer comment for functions
> /* \
> \* This is a function \
> \* \
> \* @param {string} x - A string param \
> \* \
> \* @example \
> \* \
> \* &nbsp;&nbsp;&nbsp;&nbsp;printVar("hello");\
> \*/ \
> function printVar(x){ \
> &nbsp;&nbsp;&nbsp;&nbsp;console.log(x); \
> } /* printVar */