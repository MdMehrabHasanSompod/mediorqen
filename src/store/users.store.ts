import { create } from "zustand";
import { IUser } from "@/types/user";

interface UsersStore {
  users: IUser[];
  setUsers: (users:IUser[]) => void;
  clearUsers : () => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users : [],
  setUsers: (users) => set({users}),
  clearUsers: () => set({users:[]}) ,
}));