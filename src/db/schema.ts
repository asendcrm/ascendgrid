import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const leadsTable = pgTable("leads", {
  id: varchar("id").notNull().primaryKey(),
  name: text("name"),
  company: text("company"),
  email: text("email"),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export type Lead = typeof leadsTable.$inferSelect;