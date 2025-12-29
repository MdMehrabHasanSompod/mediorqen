import mongoose from "mongoose";

type qualification = {
  degree: string;
  institution: string;
};

interface IDoctor {
  name: string;
  image: string;
  email: string;
  phone: string;
  password: string;
  role: "doctor";
  speciality: string;
  fees: number;
  qualifications: qualification[];
  createdAt?: Date;
  updatedAt?: Date;
}

const qualificationSchema = new mongoose.Schema<qualification>({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
});


const doctorSchema = new mongoose.Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [40, "Name cannot exceed 40 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      match: [/^\+?01[3-9]\d{8}$/, "Please enter a valid phone number"],
      required:true,
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=\S+$).{8,200}$/,
        "Password validation failed",
      ],
      select: false,
      required:true,
    },
    role: {
      type: String,
      default: "doctor",
    },
    qualifications: {
      type: [qualificationSchema],
      default: [],
    },
    speciality: {
      type: String,
      required: true,
      enum: [
        "Allergy & Immunology",
        "Anesthesiology",
        "Cardiology",
        "Dermatology",
        "Emergency Medicine",
        "Endocrinology",
        "Family Medicine",
        "Gastroenterology",
        "Geriatrics",
        "Hematology",
        "Infectious Disease",
        "Internal Medicine",
        "Nephrology",
        "Neurology",
        "Obstetrics & Gynecology",
        "Oncology",
        "Ophthalmology",
        "Orthopedics",
        "Otolaryngology (ENT)",
        "Pediatrics",
        "Physical Medicine & Rehabilitation",
        "Plastic Surgery",
        "Psychiatry",
        "Pulmonology",
        "Radiology",
        "Rheumatology",
        "Surgery",
        "Urology",
        "Vascular Surgery",
      ],
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Doctor =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", doctorSchema);
