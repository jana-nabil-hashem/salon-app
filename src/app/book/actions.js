"use server";

import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export async function confirmBooking(formData) {
  const serviceId = formData.get("serviceId");
  const staffId = formData.get("staffId");
  const date = formData.get("date");
  const time = formData.get("time");
  const name = formData.get("name");
  const phone = formData.get("phone");

  const { error } = await supabase.rpc("create_booking", {
    p_staff_id: Number(staffId),
    p_service_id: Number(serviceId),
    p_start: time,
    p_name: name,
    p_phone: phone,
  });

  if (error) {
    let reason = "error";
    if (error.message.includes("slot_unavailable")) reason = "taken";
    if (error.message.includes("invalid_")) reason = "invalid";
    redirect(
      `/book?service=${serviceId}&staff=${staffId}&date=${date}&error=${reason}`
    );
  }

  redirect(
    `/book/confirmed?service=${serviceId}&staff=${staffId}&time=${encodeURIComponent(time)}`
  );
}