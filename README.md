# QuickNotes

QuickNotes is a simple note-taking web app built with HTML, CSS and vanilla JavaScript. It lets you capture short notes, organise them by category, search through them, and keeps them saved in your browser between visits.

## Features

- Add notes with a category (Personal, Work or Study)
- Delete individual notes
- Live search that ignores upper and lower case
- Validation for empty notes and notes over 200 characters
- Correct note count for zero, one and many notes
- Notes saved with localStorage, so they survive a refresh
- Responsive layout for phones

## How to run locally

1. Clone the repository:
   `git clone https://github.com/Livingpr/quicknotes-app.git`
2. Go into the folder: `cd quicknotes-app`
3. Start a local server: `python3 -m http.server 8000`
4. Open `http://localhost:8000` in your browser.

You can also open `index.html` directly, or use the VS Code Live Server extension.

## What I learned

- How the DOM works and how to build elements with `createElement` and `textContent`, which is safe for user text.
- How to keep the data in one array and redraw the page from it with a `render()` function.
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`.
- How to lay out a form with Flexbox and adapt it to phones with a media query.
- How to write clear Git commits for each stage of a project.
