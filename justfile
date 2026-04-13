fmt:
  npx nx format --fix

lint:
  npx nx affected:lint

test:
  npx nx affected:test

build:
  npx nx affected:build

website-serve:
  npx nx serve website

website-build:
  npx nx build website
