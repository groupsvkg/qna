# QnA App

This project aims to develop a question-and-answer web app where users can solve the questions posted by other users or the system. They will also have the ability to post their questions. The app will allow users to bookmark or group questions and challenge others.

## Requirements

> - `FR` - Functional Requirement,
> - `NFR` - Non Functional Requirement
> - `ER` - Extended Requirement
> - `SR` - System Requirement

| ID  | Description                                                                                     | Status |
| --- | ----------------------------------------------------------------------------------------------- | ------ |
| FR1 | User must be able to login via email and password, gmail, and others supported by `Supabase`    | DONE   |
| FR2 | User must be able to view list of questions                                                     | TODO   |
| FR3 | User must be able to view and attempt a specific question                                       | TODO   |
| FR4 | User must be able to add new question                                                           | TODO   |
| FR5 | User must be able to delete his question                                                        | TODO   |
| FR6 | User must be able to Group existing questions that further can be shared as challenge to others | TODO   |
| FR7 | User must be able to see his score and activity history                                         | TODO   |
| SR1 | System must handle realtime notification                                                        | TODO   |
| SR2 | System should allow new question ingestion                                                      | TODO   |

## Features

### Login

- Implemented basic login page

### Signup

- Implemented basic signup page

## Capacity Estimate

### Traffic Estimates

TODO

### Storage Estimates

TODO

### Bandwidth Estimates

TODO

### Memory Estimates

TODO

## User Interface

### Flow

<img src='./design/ui/app_flow_iteration_1.png' width='500'>
<img src='./design/ui/wireframe_home_iteration_1.png' width='500'>

### Post Question

<img src='./design/ui/post_question_iteration_5.png' width='400'>
<img src='./design/ui/post_question_iteration_4.png' width='400'>
<img src='./design/ui/post_question_iteration_3.png' width='400'>
<img src='./design/ui/post_question_iteration_2.png' width='400'>
<img src='./design/ui/post_question_iteration_1.png' width='400'>

### Home

<img src='./design/ui/home_iteration_3.png' width='200' height='400'>

<img src='./design/ui/home_iteration_2.png' width='200' height='400'>

<img src='./design/ui/home_iteration_1.png' width='200' height='400'>

### Login

<img src='./design/ui/login_iteration_1.png' width='400'>

### Signup

<img src='./design/ui/signup_iteration_1.png' width='400'>

## Technical Debt

- Improve Login page
- Improve Signup page
- Implement loading page for page transitions

## System APIs

TODO

## Database Design

<img src='./design/db/erd_iteration_1.png'>

### Users

| Name         | Type     | Description              |
| ------------ | -------- | ------------------------ |
| id           | uuid     | system generated user id |
| email        | string   | user email id            |
| phone        | string   | user phone number        |
| provider     | string   | oAuth provider           |
| created      | datetime | user creation date       |
| last_sign_in | datetime | last sign in date        |

### Profiles

| Name       | Type     | Description              |
| ---------- | -------- | ------------------------ |
| id         | uuid     | system generated user id |
| updated_at | datetime | last profile update date |
| username   | string   | username                 |
| full_name  | string   | user full name           |
| avatar_url | url      | user profile pic         |
| website    | url      | user website             |

### Questions

| Name       | Type     | Description                                       |
| ---------- | -------- | ------------------------------------------------- |
| id         | uuid     | question id                                       |
| created_by | uuid     | creators user id                                  |
| created_at | datetime | creation time                                     |
| category   | string   | question category                                 |
| type       | string   | question type - text, url, image, draw, and latex |
| question   | string   | question description                              |
| answer     | string   | single or multi-word answer                       |

### History

| Name           | Type     | Description                                |
| -------------- | -------- | ------------------------------------------ |
| user_id        | uuid     | id of user trying to attempt the question  |
| question_id    | uuid     | question id the user is trying to answer   |
| created_at     | datetime | datetime for first attempt                 |
| updated_at     | datetime | datetime for later attempt till its solved |
| failed_attempt | number   | count for failed attempts                  |
| status         | enum     | status for user attempts                   |

## System Design

TODO

## Purging or DB Cleanup

TODO

## Security and Permissions

TODO

## Technology Stack

- Fullstack Framework - [Next.js](https://nextjs.org/)
- Database - [Supabase](https://supabase.com/)
- Authentication - [Supabase Auth](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs), [Youtube Tutorial](https://www.youtube.com/watch?v=0Fs96oZ4se0&list=PL5S4mPUpp4OtwG-qCxm8gA_hjaBq0OPdz&index=4), [Example](https://github.com/supabase/auth-helpers/tree/main/examples/nextjs-server-components)
- Client State Management - [Zustand](https://zustand-demo.pmnd.rs/)
- Client Data Fetching - [Swr](https://swr.vercel.app/)
- Server Data Fetching - [fetch](https://beta.nextjs.org/docs/data-fetching/fetching)
- CSS framework - [Tailwindcss](https://tailwindcss.com/)
- Tailwindcss Forms Plugin - [Tailwindcss Forms](https://github.com/tailwindlabs/tailwindcss-forms)
- Tailwindcss Prettier Plugin - [Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- Form Validation - [zod](https://zod.dev/)
- Drag and Drop - [dndkit](https://dndkit.com/)
- Icons - [heroicons](https://github.com/tailwindlabs/heroicons)
- Version Control - [GitHub](https://github.com/)
- Deployment - [Vercel](https://vercel.com)

## Tools

- Editor - [VS Code](https://code.visualstudio.com/)
- Wireframe - [Figma](https://www.figma.com/) or [Draw.io](https://app.diagrams.net/)

## Getting Started

First, run the development server:

> Run command `nvm use` to use `node` version configured in `.nvmrc`

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Development Setup

### Create Project

- Create `GitHub` repository
- Create NextJs project on laptop
  - `npx create-next-app@latest --experimental-app`
- Execute the following steps. Final step will push changes to GitHub repository.

### Engine Locking

- Create `.nvmrc` in root directory to specify which node version to be used in this project i.e. `lts/hydrogen - v18.15.0`
- Create `.npmrc` in root directory to indicate which package manager is to be used strictly.

> NextJs use Node `v16.8.0` or `later`. If node version used is lower than `v16.8.0`, then change it using `nvm` by doing following.
>
> - `nvm ls` will show what node version is currently set to.
> - `nvm install v18.15.0` to install `v18.15.0` or anyother you want.
> - `nvm use` if `.nvmrc` is specified with node version or `nvm use v18.15.0`

- Update `package.json` to indicate `node` and `npm` version.

```json
"engines": {
    "node": ">=18.15.0",
    "yarn": "please-use-npm",
    "npm": ">=9.5.0"
  },
```

### Linting

- Create `.eslintrc.json` file in root directory with following content

```json
{
  "extends": ["next", "next/core-web-vitals", "eslint:recommended"],
  "globals": {
    "React": "readonly"
  }
}
```

- Run `npm run lint`

### Formatting

- Install `prettier` as dev dependency. Run `npm add -D prettier`

```json
"devDependencies": {
    "prettier": "^2.8.4"
}
```

- Create `.prettierrc` file in root directory with the following content.

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

- Create `.prettierignore` file in root directory with the following content.

```sh
.yarn
.next
dist
node_modules
```

- Update `package.json`

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prettier": "prettier --write ."
  }
```

- Run `npm run prettier`

### Git

- Install `Husky`
  - Run `npm add -D husky`
  - Run `npx husky install`. It creates `.husky` folder

```json
"devDependencies": {
    "husky": "^8.0.3",
    "prettier": "^2.8.4"
}
```

- Update `package.json` in the scripts section `"prepare": "husky install"` so that `Husky` gets installed automatically when other developers run the project.

```json
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prettier": "prettier --write .",
    "prepare": "husky install"
}
```

- Create following hooks
  - Run `npx husky add .husky/pre-commit "npm run lint"`
  - Run `npx husky add .husky/pre-push "npm run build"`

```zsh
$ > npx husky add .husky/pre-commit "npm run lint"
husky - created .husky/pre-commit
$ > ls  .husky
_          pre-commit

$ > cat .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint

```

```zsh
$ > npx husky add .husky/pre-push "npm run build"
husky - created .husky/pre-push
$ > ls  .husky
_          pre-commit pre-push

$ > cat .husky/pre-push
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run build
```

- Install `commitlint` package as dev dependency
  - Run `npm add -D @commitlint/config-conventional @commitlint/cli`

```json
"devDependencies": {
    "@commitlint/cli": "^17.4.4",
    "@commitlint/config-conventional": "^17.4.4",
    "husky": "^8.0.3",
    "prettier": "^2.8.4"
}
```

- Create `commitlint.config.js` in root directory
- Enable `commitlint` with `Husky`
  - Run `npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`

```zsh
$ > npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
husky - created .husky/commit-msg

$ > ls  .husky
_          commit-msg pre-commit pre-push

$ > cat .husky/commit-msg
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit "$1"
```

### VS Code

- Create `.vscode/settings.json` file with following content

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.organizeImports": true
  }
}
```

### Debugging with VS Code

- Create `.vscode/launch.json` file with following content.

> <https://nextjs.org/docs/advanced-features/debugging>

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

- Install `cross-env` as dev dependency.
  - Run `npm add -D cross-env`

```json
"devDependencies": {
    "@commitlint/cli": "^17.4.4",
    "@commitlint/config-conventional": "^17.4.4",
    "cross-env": "^7.0.3",
    "husky": "^8.0.3",
    "prettier": "^2.8.4"
}
```

- Update `package.json`

```json
"scripts": {
    "dev": "cross-env NODE_OPTIONS='--inspect' next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prettier": "prettier --write .",
    "prepare": "husky install"
}
```

### Environment Variables

- Create `.env.local` in root directory

> `.env.local` always overrides the defaults set.
>
> Note: `.env`, `.env.development`, and `.env.production` files should be included in your repository as they define defaults. `.env*.local` should be added to `.gitignore`, as those files are intended to be ignored. `.env.local` is where secrets can be stored.
>
> `Reference` - [NextJs Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

### Zustand

- Inatall `Zustand` package
  - `npm install zustand`

### Tailwindcss

> [Tailwindcss configuration for NextJS](https://tailwindcss.com/docs/guides/nextjs)

- `npm install -D tailwindcss postcss autoprefixer`
- `npx tailwindcss init -p`
- Update `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- Update `globals.css` in `src/app` folder

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- Update `src/app/page.tsx` to test if tailwind is configured correctly.

```tsx
export default function Home() {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
```

- Run `npm run dev` to test

### Tailwindcss Forms Plugin

- Install `@tailwindcss/forms` package
  - `npm install -D @tailwindcss/forms`
- Update `tailwind.config.js`

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
};
```

> `Reference`: [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)

### Tailwindcss Prettier Plugin

- Install `prettier-plugin-tailwindcss`

  - `npm install -D prettier prettier-plugin-tailwindcss`

- Update `prettier.config.js`

```js
// prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
};
```

> `Reference`: [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

### Zod

- Install `zod` package
  - `npm install zod`

### Dndkit

- Install `dndkit` package
  - `npm install @dnd-kit/core`

### Supabase Cleint

- Install `supabase-js` package
  - `npm install @supabase/supabase-js`

### Icons

- Install `heroicons` package
  - `npm install @heroicons/react`

### Commit and Push Changes to GitHub

- `git add .`
- `git commit -m "ci: configure development environment"`
- `git remote add origin https://github.com/groupsvkg/qna.git`
- `git push -u origin main`

## Errors

### Encoding

`./node_modules/node-fetch/lib/index.js
Module not found: Can't resolve 'encoding' in '/Users/vishalgupta/work/personal/programming/project/qna/qna/node_modules/node-fetch/lib'`

Solution - [Github](https://github.com/vercel/next.js/issues/7621)

> - Delete `.next` folder
> - `npm install -D encoding`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
