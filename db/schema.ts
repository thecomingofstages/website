import { numeric, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const donations = pgTable("donations", {
  id: uuid("id").defaultRandom().primaryKey(),
  transactionRef: text("tr_ref").notNull().unique(),
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  amount: numeric("amount"),
  status: text("status", {
    enum: ["pending", "verified", "failed"],
  }).default("pending"),
});
