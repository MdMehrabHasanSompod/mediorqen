import { IAdmin } from "@/types/admin";

export async function getAdmin({id,role}:{id:string,role:string}): Promise<IAdmin> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/get-admin?id=${id}&role=${role}`, {
    cache:"no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Admin");
  }

  const json = await res.json();
  return json.existedAdmin;
}
