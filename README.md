# Wizard Wars
Wizard Wars is a fast-paced deathmatch game that is run completely in your browser, no install needed.

## Components

### Web
The `web` project is the client running the browser. It's meant to use as little external libraries as possible since this is a learning project, how to build everything from scratch.
Written in TypeScript, uses the HTML 5 canvas api for rendering. Tests are written using Jest

### Backend
The backend is written using Kotlin and is pretty trivial. It handles all communication between players.

### Communication
All communication between players are handled using WebSockets. We chose WbeSockets instead of WebRTC as we want to perform cheat detection and similar operations in the backend. 
While it is possible to combine, this was the most straightforward solution.


## Getting started

### Perquisites
You need to have `yarn` installed and at least Java JDK 8.

Move into respective folder (web, backend) and read the README.md to get started.
