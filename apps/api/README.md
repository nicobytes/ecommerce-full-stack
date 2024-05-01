```
npm install
npm run dev
```

```
npm run deploy
```

npx wrangler d1 create nicobytes_store
drizzle-kit generate:sqlite
wrangler d1 migrations list nicobytes_store --local
wrangler d1 migrations apply nicobytes_store --local


https://sat0shi.dev/posts/drizzle-intro/
https://sat0shi.dev/posts/drizzle-migration/
https://github.com/mizchi/d1-drizzle-example/

npx wrangler delete nicobytes_store --local
