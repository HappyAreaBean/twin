# Docker Deployment

# Setup
1. Either clone the repo or copy the `docker-compose.prod.yml` to `docker-compose.yml` 
2. Change the db password in `POSTGRES_PASSWORD`
3. Copy `backend/config.def.js` to `config.js`
4. Config the backend config in the `config.js` you copied
5. Your config.js should looks like this:
  ```js
  export default {
    disableDatabase: false,
    database: "postgresql://<user>:<password>@db:5432/<database>",
    fileExpiry: 24 * 60 * 60 * 1000, // 24h
    disabledModules: [],
  };
  ```
6. `docker-compose up -d`
7. Now we need to migrate the database using backend
8. `docker compose exec backend bun migrate`
9. Done!

# Adding twin token

You need to execute sql command on the db

go figure this out yourself im lazy to write this ;)

check [backend/migrations/20181109230605_twin_tokens.mjs](backend/migrations/20181109230605_twin_tokens.mjs) for hint on the table structure
