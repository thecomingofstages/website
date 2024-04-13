import { Client } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";

config({ path: ".env.local" });

const url = `${process.env.DATABASE_URL}?options=project%3D${process.env.PROJECT_NAME}`;
const client = new Client(process.env.DATABASE_URL);
const db = drizzle(client);
const main = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
  process.exit(0);
};
main();
