ngconf-site
===========

ng-conf.gdg.co.il website. Author: Uri Shaked, License: MIT.

## Setup instructions

1. Install node.js (version 0.10.0 or newer), npm, git command-line client (version 1.8.4 or newer)
2. Run the following command (as super-user):
   * `npm install -g gulp`
3. Clone the project and run the following commands in the project directory:
   * `npm install`

## Development instructions

Run `gulp` and then open http://localhost:7000/ in your web-browser.

When ready to deploy, run `gulp publish` to push to the gh-pages branch.
