fmt:
  npx nx format --fix

lint:
  npx nx affected:lint

test:
  npx nx affected:test

ri:
  rm -rf node_modules
  npm install

build:
  npx nx affected:build

website-serve:
  npx nx serve website --port 4300

website-build:
  npx nx build website

api-serve:
  npx nx serve api

api-seed:
  curl --location --request POST 'https://api.escuelajs.co/api/v1/seed/'
