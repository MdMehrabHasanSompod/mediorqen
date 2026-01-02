export type Qualification = {
  _id: string;
  degree: string;
  institution: string;
};

export interface IDoctor{
  _id: string;
  name: string;
  slug: string;
  image: string;
  email: string;
  phone: string;
  speciality: string;
  availability: boolean;
  fees: number;
  qualifications: Qualification[];
};
