import { IUser } from "@/types/user";

export async function getUsers({id,role}:{id:string,role:string}): Promise<IUser[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${role}/get-users?id=${id}&role=${role}`, {
    cache:"no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Users");
  }

  const json = await res.json();
  return json.Users;
}
