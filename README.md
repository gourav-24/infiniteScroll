# Getting Started with Infinite Scroll
The InfiniteScroll component can be used in following ways.

Specify a value for the height prop if you want your scrollable content to have a specific height, providing scrollbars for scrolling your content and fetching more data.
If your scrollable content is being rendered within a parent element that is already providing overflow scrollbars, you can set the scrollableTarget prop to reference the DOM element and use it's scrollbars for fetching more data.

props
|   name	|   type	|   description                                                                                      |
|-----------|-----------|----------------------------------------------------------------------------------------------------|   
|  getData  | function	| a function which must be called after reaching the bottom. It must trigger some sort of action which fetches the next data. The data is passed as children to the InfiniteScroll component and the data should contain previous items too. e.g. Initial data = [1, 2, 3] and then next load of data should be [1, 2, 3, 4, 5, 6]. |
| hasMore	| boolean	| it tells the InfiniteScroll component on whether to call next function on reaching the bottom and shows an endMessage to the user |
| children | node (list)|	the data items which you need to scroll. |
|dataLength|   number	| set the length of the data.This will unlock the subsequent calls to next.|
| loader   |   node	    | you can send a loader component to show while the component waits for the next load of data. e.g. <h3>Loading...</h3> or any other loader element |
| scrollThreshold| 	number | string	A threshold value defining when InfiniteScroll will call getData. value is in format 0.8. It means the next will be called when user comes below 80% of the total height. If you pass threshold in pixels |
| height | number	| By this you can have fixed height scrolling content |
| scrollableTarget|	node or string | optional, reference to a (parent) DOM element that is already providing overflow scrollbars to the InfiniteScroll component. You should provide the id of the DOM node preferably.|

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

