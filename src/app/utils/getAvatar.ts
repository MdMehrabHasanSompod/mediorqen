import { IAdmin } from "@/types/admin";
import { IDoctor } from "@/types/doctor";
import { ISuperAdmin } from "@/types/super-admin";
import { IUser } from "@/types/user";

const getAvatar = (user: IUser | IAdmin | ISuperAdmin | IDoctor | null) => {
  if (!user) return null;

  if ("avatar" in user && user.avatar) {
    return user.avatar;
  }

  if ("image" in user && user.image) {
    return user.image;
  }

  return null;
}

export default getAvatar