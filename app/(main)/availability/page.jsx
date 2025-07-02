import React from "react";
import AvailabilityForm from "./_components/availability-form";
import { getEventAvailability } from "@/actions/availability";
import { defaultAvailability } from "./data";

export default async function AvailabilityPage() {
  const availability = await getEventAvailability();

  return <AvailabilityForm initialData={availability || defaultAvailability} />;
}