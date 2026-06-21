"use server";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function submitLead(formData: FormData) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase Environment Variables!");
      return { error: "Database configuration error. Please check .env.local" };
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Extract the exact keys the frontend is sending
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const location = formData.get("location") as string;
    const projectDetails = formData.get("projectDetails") as string;

    // Validate everything is present
    if (!name || !email || !whatsapp || !location || !projectDetails) {
      return { error: "All fields are required." };
    }

    // Map the frontend keys to the exact Supabase column names
    const { error } = await supabase
      .from("leads")
      .insert([
        { 
          name: name, 
          email: email, 
          whatsapp_number: whatsapp, 
          location: location,
          project_scope: projectDetails 
        }
      ]);

    if (error) {
      console.error("Supabase Insert Error:", error);
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Server Action Exception:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to submit lead.";
    return { error: errorMessage };
  }
}
