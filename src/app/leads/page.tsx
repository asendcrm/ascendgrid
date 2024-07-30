import { DataTable } from "@/components/data-table";
import { Leads } from "./leads-columns";
import { LeadsColumns } from "./leads-columns";
import { Metadata } from "next";
import React from "react";
import { db } from "@/db";

const getLeads = async (): Promise<Leads[]> => {
  const response = await db.query.leadsTable.findMany();
  return response as Leads[];
};

export const metadata: Metadata = {
  title: "Leads",
  description: "List of leads",
};

async function LeadsPage() {
  const fetchedLeads = await getLeads();
  return (
    <section className="py-2 px-10">
      <div className="container">
        <h1 className="text-2xl font-bold my-4">Leads</h1>
        <div className="grid grid-cols-0 gap-4 md:grid-cols-0 px-20">
          <DataTable columns={LeadsColumns} tableData={fetchedLeads} />
        </div>
      </div>
    </section>
  );
}

export default LeadsPage;
