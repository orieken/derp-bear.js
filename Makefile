cucumber:
	@NODE_ENV=test ./node_modules/.bin/cucumber.js  --format pretty


test:
	@NODE_ENV=test ./node_modules/.bin/mocha tests --reporter spec --growl

test-w:
	@NODE_ENV=test ./node_modules/.bin/mocha tests --reporter list --growl --watch

.PHONY: cucumber test test-w
