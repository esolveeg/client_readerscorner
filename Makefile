build:
	npm run build && npm run generate && rm -rf dist && zip dist app.zip

start:
	npm run start