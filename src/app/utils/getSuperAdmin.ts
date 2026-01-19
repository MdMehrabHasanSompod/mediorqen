import { ISuperAdmin } from "@/types/super-admin";

export async function getSuperAdmin({id,role}:{id:string,role:string}): Promise<ISuperAdmin> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/super-admin/get-super-admin?id=${id}&role=${role}`, {
    cache:"no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Super Admin");
  }

  const json = await res.json();
  return json.existedSuperAdmin;
}
