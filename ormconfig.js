module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    "./dist/entities/*.ts"
  ],
  migrations: [
    "./dist/database/migrations/*.ts"
  ],
  cli: {
    migrationsDir: "./src/database/migrations"
  }
}
