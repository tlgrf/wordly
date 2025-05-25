# Wordly Dictionary SPA

## Table of Contents
Demo
Setup
Testing
Usage
Performance Analysis
Future Improvements

## Demo
(./assets/demo.png)

## Setup
1. Clone the repo
2. `npm install` (for Jest)
3. `open index.html` in your browser

## Testing
- Run `npm test` to execute the Jest suite.

## Usage
- Type a word into the search bar and hit **Search**.
- Definitions, pronunciations, and synonyms will appear without reloading the page.
- Errors (e.g., word not found) will be displayed inline.

## Performance Analysis
Big-O & File Placement:
The fetch and DOM update functions run in O(n) where n is the number of definitions + synonyms received. 

## Future Improvements
- Add pagination for multiple entries
- Save favorite words to local storage
- Toggle themes (light/dark)
