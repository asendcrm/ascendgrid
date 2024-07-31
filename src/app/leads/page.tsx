import { Lead } from "@/db/schema";
import { LeadsColumns } from "./_components/LeadsColumns";
import { LeadsTable } from "@/app/leads/_components/LeadsTable";
import { Metadata } from "next";
import React from "react";
import { db } from "@/db";

const getLeads = async (): Promise<Lead[]> => {
  const response = await db.query.leadsTable.findMany();
  return response as Lead[];
};

export const metadata: Metadata = {
  title: "Leads",
  description: "List of leads",
};

async function LeadsPage() {
  const fetchedLeads = await getLeads();
  return <LeadsTable columns={LeadsColumns} tableData={fetchedLeads} />;
}

export default LeadsPage;
