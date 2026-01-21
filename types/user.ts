export interface IUser{
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  gender?: string;
  age?: number;
  bloodGroup?: string;
  avatar?: string;
  createdAt: Date;
};