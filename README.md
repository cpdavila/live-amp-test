# amp-live-blog

A simple AMP live blog that demonstrates how AMP sites can be updated in realtime with the help of the [amp-live-list](https://www.ampproject.org/docs/reference/components/amp-live-list) component and a backend server (Node.js).

## Requirements

* [Node.js](http://nodejs.org/)
* A package manager, `npm` or `Yarn`
* [Postman] (https://www.getpostman.com)


## How to run this app

1. Clone the repo - https://github.com/yomete/amp-live-blog.
2. Install all dependencies with `npm install`.
3. Run `node server` to see the application running at `http://localhost:5000`.
4. Open the Postman application.
5. To add content to the blog and see it update in realtime, send a POST request on Postman to `http://localhost:5000/posts/new` with a `body` value.  
