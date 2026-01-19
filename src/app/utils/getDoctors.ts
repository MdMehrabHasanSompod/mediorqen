import { IPublicDoctor } from "@/types/public-doctor";

export async function getDoctors(): Promise<IPublicDoctor[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch doctors");
  }

  const json = await res.json();
  return json.Doctors;
}
