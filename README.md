# Meetrix WebRTC Monitoring Dashboard

Dashboard that is used to present data captured via [@meetrix/lib-monitoring](https://gitlab.com/meetrix/products/webrtc-monitoring/lib-monitoring)

## Project setup

1. Create a [personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token) (required for two-factor authentication (2FA)), with the scope set to `api`. You can save this for future use too.

2. Run the below commands (sets config for the current user; use a `-g` after `set` to set for all users)

   ```sh
   npm config set @meetrix:registry https://gitlab.com/api/v4/packages/npm/
   npm config set -- '//gitlab.com/api/v4/packages/npm/:_authToken' "<your_token>"
   ```

   Alternatively, you can also create a `.npmrc` file in project root with the below command to set it for just the current project

   ```sh
   {
     echo "@meetrix:registry=https://gitlab.com/api/v4/packages/npm/"
     echo "//gitlab.com/api/v4/packages/npm/:_authToken=<your_token>"
   } >> .npmrc
   ```

   Be careful not to accidentally commit `.npmrc`; add it to your `.gitignore` file.

3. `cat .env.example > .env`
4. Visit [http://localhost:3000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBtZWV0cml4LmlvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwNTExNTYzLCJleHAiOjE3MjY5MTE1NjMsInN1YiI6IjYxYzZmMjY2Yzc1OTIwMzBkYmM1YjdhMCJ9.9UZSBzIS-JCkF487Sfx3ZRxaoKKM6PxMD37TAn_MoNg]
5. [http://localhost:3000/debugger?mockStats=true&clientId=1234]

## Usage and development with `lib`, `backend` and `common-lib`

1. Start `webrtc-monitoring-backend`
2. Start `lib-monitoring` and visit [http://localhost:8080/?mockStats=true&clientId=1234]
3. Start `webrtc-monitoring-frontend` and
   1. To set the token visit. This will save the token in local storage, which will be used to connect to the backend [[http://localhost:3000/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBtZWV0cml4LmlvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjQwNTExNTYzLCJleHAiOjE3MjY5MTE1NjMsInN1YiI6IjYxYzZmMjY2Yzc1OTIwMzBkYmM1YjdhMCJ9.9UZSBzIS-JCkF487Sfx3ZRxaoKKM6PxMD37TAn_MoNg]
   2. visit [http://localhost:3000/debugger?clientId=1234]
4. Start a call in `lib-monitoring`

### UI Component development with [Storybook](https://storybook.js.org/docs/react/get-started/introduction)

1. Run `npm run storybook`
2. Stories can be found in `src/stories`
3. Reusable components should be located in `src/components`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.
