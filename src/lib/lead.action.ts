"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { leadsTable } from "@/db/schema";

export const updateLead = async ({
  columnId,
  oldValue,
  newValue,
}: {
  columnId: "name" | "company" | "email";
  oldValue: string;
  newValue: string;
}): Promise<{ success: boolean }> => {
  try {
    // Find a record that matches the provided value
    const record = await db.query.leadsTable.findFirst({
      where: eq(leadsTable[columnId], oldValue),
    });

    // If the record exists, update it
    if (record) {
      const updateResult = await db
        .update(leadsTable)
        .set({ [columnId]: newValue })
        .where(eq(leadsTable.id, record.id));
      return { success: true };
    } else {
      return { success: false }; // Record not found
    }
  } catch (error) {
    console.error("Failed to update lead:", error);
    return { success: false };
  }
};
