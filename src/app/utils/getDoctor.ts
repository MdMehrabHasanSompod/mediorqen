import { IDoctor } from "@/types/doctor";

export async function getDoctor({id,role}:{id:string,role:string}): Promise<IDoctor> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctor/get-doctor?id=${id}&role=${role}`, {
    cache:"no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Doctor");
  }

  const json = await res.json();
  return json.existedDoctor;
}
