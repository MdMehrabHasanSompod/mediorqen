import { IAppointment } from "@/types/appointment";


export async function getAppointments({id,role}:{id:string,role:string}): Promise<IAppointment[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/get-appointments?id=${id}&role=${role}`, {
    cache:"no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Appointments");
  }

  const json = await res.json();
  return json.userAppointments;
}
