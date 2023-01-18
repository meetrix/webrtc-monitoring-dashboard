# Meetrix WebRTC Monitoring Dashboard

Dashboard that is used to present data captured via [@meetrix/lib-monitoring](https://gitlab.com/meetrix/products/webrtc-monitoring/lib-monitoring)

## Project can be run on following OS

1. Ubuntu
2. MacOS
3. Windows

## Prerequisites

The following pre-requisites should be setup through your terminal on your development machine. Please refer to tool installation guides by the developers to set these up. 

1. Git
2. Node 16

## Project setup
   ```shell
   # Copy the .env.example contents into the .env
   1. cat .env.example > .env
   
   2. npm install

   3. npm start
   ```
## Usage and development with `lib`, `backend` and `common-lib`

1. Start `webrtc-monitoring-backend`
2. Start `webrtc-monitoring-dashboard` and go to login and create account

### UI Component development with [Storybook](https://storybook.js.org/docs/react/get-started/introduction)

1. Run `npm run storybook`
2. Stories can be found in `src/stories`
3. Reusable components should be located in `src/components`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
