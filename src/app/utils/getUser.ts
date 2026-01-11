import { IUser } from "@/types/user";

export async function getUser({id,role}:{id:string,role:string}): Promise<IUser> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-user?id=${id}&role=${role}`, {
    cache:"no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch User");
  }

  const json = await res.json();
  return json.existedUser;
}
