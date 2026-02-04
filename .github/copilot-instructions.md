# Guidance for AI coding agents

This repo is a small frontend-only Simple Todo App (vanilla JS + HTML + CSS). The instructions below point to the conventions and files an AI agent should know to be immediately productive.

- Big picture
  - Single-page static app served from `index.html` and `pages/index.js`. No build step. JS modules load directly in the browser via `type="module"` (see `index.html` and `pages/index.js`).
  - Core UI pieces are small ES modules in `components/`:
    - `Todo.js` — encapsulates a single todo's template cloning, checkbox state, delete button and DOM wiring.
    - `FormValidator.js` — reusable client-side form validation logic (mirrors the helpers in `scripts/validate.js`).
    - `Section.js` — lightweight renderer for lists (contains some broken syntax; see Issues below).
  - Shared config/data live in `utils/constants.js` (initial todos, `validationConfig`). `pages/index.js` wires everything together.

- What to change and why
  - Prefer edits inside `components/` and `pages/index.js`. These contain the app logic and are the most likely places to implement features or fixes (add, remove, render todos, validation, modal behavior).
  - Avoid changing CSS unless the task is explicitly UI styling. CSS lives under `blocks/`, `pages/index.css` and `vendor/`.

- Project-specific conventions and patterns
  - Templates: The HTML `<template id="todo-template">` in `index.html` is the source for todo items; `Todo.js` clones this template with `.content.querySelector('.todo').cloneNode(true)`.
  - Date handling: `pages/index.js` normalizes date input with timezone adjustment (adds `getTimezoneOffset()` minutes). Todo rendering formats dates in `Todo.js` using `toLocaleString('en-US', ...)`.
  - IDs: Todos use UUIDs generated from `jspm.dev/uuid` import in `pages/index.js`.
  - Validation: There are two validation implementations: `components/FormValidator.js` (class-based) and `scripts/validate.js` (functional helpers). The live code in `pages/index.js` instantiates `FormValidator`.

- Known issues and gotchas (important for agents)
  - `components/Section.js` contains multiple syntax/logic issues:
    - `rendererItems()` has an `addItem(Element) { ... }` nested inside it which is invalid. The method should be split into `renderItems()` and `addItem(element)`.
    - Method name `rendererItems` should be `renderItems` to match typical usage.
  - `pages/index.js` calls `initialTodos.forEach()` twice and both `generateTodo` + `renderTodo` are used inconsistently; deduplicate rendering to avoid duplicate DOM nodes.
  - `scripts/validate.js` calls `enableValidation(validationConfig)` at the bottom but `validationConfig` is exported by `utils/constants.js` — ensure import order if converting to modules or de-duplicating validators.
  - Some modules assume `form` DOM nodes exist at script execution time. Keep edits idempotent and avoid introducing code that runs before DOM ready when moving functions around.

- Examples (copyable intent and locations)
  - Create a new todo: see `pages/index.js` submit handler — uses `uuidv4()` and `generateTodo(values)` which returns a DOM node. To persist in-memory, update `initialTodos` or manage a new in-memory array in `pages/index.js`.
  - Toggle completed state: see `components/Todo.js` in `_setEventListeners()` — it updates `this._data.completed` when checkbox changes; a task to persist state should update whichever in-memory store is used.
  - Fix Section API: change `components/Section.js` to expose:
    - `renderItems()` — iterate items and call renderer
    - `addItem(element)` — append a DOM element to `this._container`

- Files to reference when making changes
  - Entry and wiring: `index.html`, `pages/index.js`
  - Components: `components/Todo.js`, `components/FormValidator.js`, `components/Section.js`
  - Helpers: `scripts/validate.js`, `utils/constants.js`
  - Templates: the template with id todo-template in index.html
  - Styles: `blocks/` and `pages/index.css`

- Developer workflows
  - No build or test scripts present. The app runs by opening `index.html` in a browser (or via simple static server). For local development use a static server (e.g., VS Code Live Server) because modules import via ES module `type="module"` requires serving over HTTP for some browsers.
  - If adding npm tooling, add a `package.json` and use a bundler only when necessary. Keep changes minimal for this small app.

- Safety and scope
  - This project is small; prefer changes that are minimal and reviewable. Do not introduce heavy frameworks or build steps without the user's approval.

If anything in these instructions is unclear or you want more detail (example tests, suggested bugfix patches for `Section.js`, or a preferred state shape for persisting todos), tell me which part to expand and I'll update this file.
