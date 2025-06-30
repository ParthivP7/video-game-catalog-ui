# 🎮 Video Game Catalog – Frontend (Angular 20)

A clean, modern **Single Page Application (SPA)** for managing a video game catalog, built with **Angular 20**.  
Connects to a RESTful API backend to support full CRUD operations using reactive forms, standalone components, and Bootstrap 5.

---

## 🧱 Tech Stack

| Layer         | Technology                                   |
|---------------|--------------------------------------------- |
| Framework     | Angular 20 (Standalone Components)           |
| Routing       | Angular Router (with nested routes)          |
| Styling       | Bootstrap 5.3.6 + @ng-bootstrap/ng-bootstrap |
| Forms         | Reactive Forms + Form Validation             |
| HTTP          | Angular `HttpClient`                         |
| State Mgmt    | RxJS (`BehaviorSubject`, `AsyncPipe`)        |
| Testing       | Jasmine + Karma + Angular TestBed            |
| Tooling       | Angular CLI + VS Code                        |

---

## 📄 Features

- ✅ Browse paginated list of video games
- ✅ Add new game (via form)
- ✅ Edit existing game
- ✅ Delete with confirmation
- ✅ Fully reactive component state
- ✅ Form validation with error feedback
- ✅ Angular Routing with nested pages
- ✅ Unit-tested components and services

---

## 🌐 API Integration

- Base URL: `https://localhost:7154/api/video-games`
- Consumes the following model format:

```json
{
  "videoGameId": 1,
  "title": "Game Title",
  "genre": "Genre",
  "releaseDate": "YYYY-MM-DD"
}
````

* Handled via `CatalogService`

---

## 📦 Setup Instructions

### 1. Prerequisites

* [Node.js 20.19.0](https://nodejs.org)
* [Angular CLI](https://angular.io/cli)
* [nvm](https://github.com/nvm-sh/nvm) (recommended)

### 2. Setup

```bash
nvm install 20.19.0
nvm use 20.19.0
npm install -g @angular/cli
npm install
```

### 3. UI Dependencies (if needed)

```bash
npm install bootstrap@^5.3.6
npm install @ng-bootstrap/ng-bootstrap@^19.0.0
```

Ensure this line exists in `src/styles.scss`:

```scss
@import 'bootstrap/scss/bootstrap';
```

---

## ▶️ Running the App

Start the Angular development server:

```bash
ng serve
```

Visit: [http://localhost:4200](http://localhost:4200)

Make sure the backend API is running at:

```
https://localhost:7154/api/video-games
```

---

## 🎥 Live Demo

[Demo Preview](https://github.com/user-attachments/assets/f1d8dbb7-ca3d-4af5-9987-80efc97b94d2)

> Form validation, routing, and game CRUD in action!

---
## 🌐 Routes

| Path           | Description            |
| -------------- | ---------------------- |
| `/catalog`     | View all games         |
| `/catalog/new` | Add new game           |
| `/catalog/:id` | Edit existing game     |
| `/` and `**`   | Redirect to `/catalog` |

---

## 🗂 Project Structure

```bash
src/
├── app/
│   ├── components/
│   │   ├── catalog/              # Catalog list component
│   │   └── catalog-details/      # Game form component
│   ├── models/                   # Catalog interface
│   ├── services/                 # HttpClient logic (e.g. CatalogService)
│   ├── app.routes.ts            # Routing config
│   ├── app.config.ts            # Application providers
│   ├── app.ts                   # Standalone AppComponent
│   └── app.html / app.scss      # Root template and styles
├── styles.scss                  # Global SCSS (with Bootstrap import)
├── index.html                   # Entry point HTML
├── main.ts                      # App bootstrap logic
```

---

## 🧪 Running Unit Tests

```bash
ng test
```

Covers:

* Component logic and validation
* Reactive forms
* API service behavior

---

## 📘 Backend Repo

> 🔗 [Video Game Catalog – Backend API (ASP.NET Core 8)](https://github.com/ParthivP7/video-game-catalog-api)

Built with CQRS, EF Core 8, SQLite, and xUnit.

---

## 🧠 Highlights

* SPA built with Angular 20 standalone architecture
* Fully typed with TypeScript
* Connects cleanly to any RESTful backend
* Uses latest Angular + Bootstrap ecosystem
* Clean and modular file structure
* Unit tested, documented, and developer-friendly
