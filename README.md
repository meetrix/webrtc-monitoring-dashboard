# Meetrix WebRTC Monitoring Dashboard

Dashboard that is used to present data captured via [@meetrix/lib-webrtc-monitoring](https://gitlab.com/meetrix/products/webrtc-monitoring/webrtc-monitoring-common-lib)

## Usage and development with `lib`, `backend` and `common-lib`

1. Start `webrtc-monitoring-backend`
2. Start `lib-webrtc-monitoring` and visit [http://localhost:8080/?mockStats=true&clientId=1234]
3. Start `webrtc-monitoring-frontend` and
   1. To set the token visit. This will save the token in local storage, which will be used to connect to the backend [[http://localhost:3000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBtZWV0cml4LmlvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwNTExNTYzLCJleHAiOjE3MjY5MTE1NjMsInN1YiI6IjYxYzZmMjY2Yzc1OTIwMzBkYmM1YjdhMCJ9.9UZSBzIS-JCkF487Sfx3ZRxaoKKM6PxMD37TAn_MoNg]
   2. visit [http://localhost:3000/debugger?clientId=1234]
4. Start a call in `lib-webrtc-monitoring`

## Project setup

1. `rm -rf .git && git init`
2. `npm init`
3. Visit [http://localhost:3000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBtZWV0cml4LmlvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwNTExNTYzLCJleHAiOjE3MjY5MTE1NjMsInN1YiI6IjYxYzZmMjY2Yzc1OTIwMzBkYmM1YjdhMCJ9.9UZSBzIS-JCkF487Sfx3ZRxaoKKM6PxMD37TAn_MoNg]
4. [http://localhost:3000/debugger?mockStats=true&clientId=1234]
### UI Component development with [Storybook](https://storybook.js.org/docs/react/get-started/introduction)

1. Run `npm run storybook`
2. Stories can be found in `src/stories`
3. Reusable components should be located in `src/components`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
