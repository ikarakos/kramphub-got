## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Libraries Used

This project was implemented using the following liraries:

- Create react app
- React bootstrap table next for the table implementation
- React bootstrap table filter for filtering the columns
- axios for the requests

## Minimizing requests

- For minimizing the requests send to the api, a simple local storage caching solution was implemented.

## Open issues

- Based on the React bootstrap table next implementation I went with, I spent a lot of time investigating how I can add an async api request on the age button click, for fetching the estimated age (many people had the same issue online and there was no solution so far). Though, I couldn't come up with a working solution, so at the moment the same age is displayed for every character that has a name.
  At the end, I think maybe going for the typical table implementation could be better, cause I would be able to implement the estimated age easily.

- Also for the pagination, just for saving time I went with a fixed 10 results per page, and custom simple pagination. Next step is to add variables and calculate the pages based on the user's preferences.

## Improvements

- Use the links from the API (next, prev, last etc) for the API requests (HATEOAS)
- Use Redux for the global state management
- Proper pagination
- Testing
- Use a caching library - solution
- Modularize the code
