export interface ISuperAdmin{
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender?: string;
  age?: number;
  bloodGroup?: string;
  avatar?: string;
  createdAt: Date;
};