# cvat-ui module

## Description

This is a client UI for Computer Vision Annotation Tool based on React, Redux and Antd

## Versioning

If you make changes in this package, please do following:

- After not important changes (typos, bug fixes, refactoring) do: `yarn version --patch`
- After adding new features do: `yarn version --minor`
- After significant UI redesign do: `yarn version --major`

Important: If you have changed versions for `cvat-core`, `cvat-canvas`, `cvat-data`,
you also need to do `yarn install` to update `package-lock.json`

## Commands

- Installing dependencies:

```bash
cd ../cvat-core && yarn --frozen-lockfile && cd - && yarn --frozen-lockfile
```

- Running development UI server with autorebuild on change

```bash
yarn run start
```

- Building the module from sources in the `dist` directory:

```bash
yarn run build
yarn run build --mode=development     # without a minification
```

Important: You also have to run CVAT REST API server (please read `https://docs.cvat.ai/docs/contributing/`)
to correct working since UI gets all necessary data (tasks, users, annotations) from there

### Running the server

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Note: If you don't have docker installed, see https://docs.docker.com/compose/install/

To see the the UI, navigate to http://localhost:8080/

## Lovenson's changes and files modified:

# Fetching and running on my branch (lovenson)

```bash
git fetch --all
```

# Creating a local copy of the branch

```bash
git checkout -b <branch_name> origin/lovenson
```

# Files created:

- fetch-random-user.ts (cvat/cvat-ui/src/actions/fetch-random-user.ts)
- ai-control.tsx (cvat/cvat-ui/src/components/annotation-page/standard-workspace/controls-side-bar/ai-control.ts)
- process-ai-button.tsx (cvat/cvat-ui/src/components/annotation-page/top-bar/process-ai-button.ts)
- show-random-user.tsx (cvat/cvat-ui/src/components/annotation-page/top-bar/show-random-user.tsx)

# Config files created:

- Jest.config.ts - Jest configuration file
- babel.config.js - Babel configuration file

# Files modified:

- package.json - Modified to include new dependencies and scripts
- left-group.tsx (cvat/cvat-ui/src/components/annotation-page/top-bar/left-group.tsx)
- controls-side-bar.tsx (cvat/cvat-ui/src/components/annotation-page/standard-workspace/controls-side-bar/controls-side-bar.tsx)
- cvat-app.tsx (cvat/cvat-ui/src/components/cvat-app.tsx)
- top-bar.tsx (cvat/cvat-ui/src/components/annotation-page/top-bar/top-bar.tsx)

## Commit list:

# Feature: Show fetched user on UI

- Successfully showed fetched user data on UI
- Added an icon to call the fetch user function and display on ui:

# Feature: Random User Fetching Implementation

- Added fetchRandomUser function with TypeScript interface
- Implemented robust error handling and response validation
- Added unit test cases for success and failure scenarios using Jest

# Feature: ProcessAI function

- Added processAI functionality
- Implemented test cases for AI processing
- Added UI button with RedoIcon

# UI Cleanup Changes

- Removed Header component for cleaner interface
- Cleaned up top right corner icons
- Removed Menu button from top left header
- Removed unnecessary icons from sidebar

## Important directories and their purposes:

Although the codebase is relatively large, it is organized in a way that makes it easy to navigate and understand. Here are some of the important directories and their purposes:

- standard-workspace

  `cvat/cvat-ui/src/components/annotation-page/standard-workspace`

This directory contains the code for the standard workspace, which is the main part of the annotation tool. It includes the canvas, the controls, and the sidebar.

- controls-side-bar

  `cvat/cvat-ui/src/components/annotation-page/standard-workspace/controls-side-bar`

This directory contains the code and icons for the sidebar that contains the controls for the annotation tool.

## Adding a new component:

- Create a new file for the component in the appropriate directory. For example, to add a new icon to the sidebar, you would create a new file (new-icon-control.tsx) in the `controls-side-bar` directory.

## Unit tests:

You need to write unit test for the new component you added. As of now, we're using Jest
for unit testing. Read the docs here https://jestjs.io/docs/getting-started

- Writing tests:
  You can do so by creating a new file in the `tests` directory or create a new `tests` directory if there
  is no tests directory. For example to write a test for the new icon control, you would create a new file (new-icon-control.test.tsx) in the `tests` directory.

- Running the tests:
  Make sure you are the cvat-ui folder and run the following command to run the tests:

```bash
yarn run test
```

## Test coverage percentage:

Tests coverage is a measure of how much of the code is tested by the unit tests. In this project, we aim to have a test coverage of at least 80%. To learn more about test coverage, you can read this article https://www.valentinog.com/blog/jest-coverage/

To run the tests with coverage:

```bash
yarn run test --coverage
```

## Styling conventions:

- We use styled-components for styling.
- We use the BEM naming convention for styling.

Each directory contains one scss file. To add style to new a component, just give the elements a class name that follows the BEM naming convention. and go the scss file and add the style to the class name.

## Finding a file in the codebase:

As the codebase is large, it can be difficult to find a specific file. Here are some tips for finding a file:

- Step 1: - Use the developer console in your browser to inspect the DOM elements and their class names.
- Step 2: Use the search bar in your IDE (CMD + Shift + F) to search for the file name.

## Potential issues and solutions:

When you run this command (which is the command to install the development dependencies):

```bash
pip install -r cvat/requirements/development.txt
```
You may encounter the following error:

```bash
exit code: 1
  ╰─> [12 lines of output]
      Failed `CDLL(libgeos_c.so.1)`
      Failed `CDLL(libgeos_c.so)`
      Traceback (most recent call last):
        File "<string>", line 2, in <module>
        File "<pip-setuptools-caller>", line 34, in <module>
        File "/tmp/pip-install-qoa53efb/shapely_0d7b157d659447d9a3a3f5b77b98f312/setup.py", line 85, in <module>
          from shapely._buildcfg import geos_version_string, geos_version, \
        File "/tmp/pip-install-qoa53efb/shapely_0d7b157d659447d9a3a3f5b77b98f312/shapely/_buildcfg.py", line 169, in <module>
          lgeos = load_dll('geos_c',
        File "/tmp/pip-install-qoa53efb/shapely_0d7b157d659447d9a3a3f5b77b98f312/shapely/_buildcfg.py", line 162, in load_dll
          raise OSError(
      OSError: Could not find library geos_c or load any of its variants ['libgeos_c.so.1', 'libgeos_c.so']
      [end of output]
````

To fix this error, you need to install the `geos` library. You can do so by running the following command:

```bash
sudo apt update && sudo apt install libgeos-dev
```
