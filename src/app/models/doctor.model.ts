import mongoose from "mongoose";
import slugify from "slugify";

type qualification = {
  degree: string;
  institution: string;
};

interface IDoctor {
  userId:mongoose.Schema.Types.ObjectId,
  name: string;
  image: string;
  email: string;
  phone: string;
  slug?:string;
  role: "doctor";
  speciality: string;
  availability:boolean;
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
  { userId:{
  type: mongoose.Schema.Types.ObjectId,
  ref:"User",
  required: true,
  },
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
    role: {
      type: String,
      required:true,
      default: "doctor",
    },
    availability:{
      type: Boolean,
      required:true,
      default:true,
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
     slug: {
      type: String,
      unique: true,
      index: true,
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

doctorSchema.pre("save", async function () {

  if (!this.isModified("name") && !this.isModified("speciality")) {
    return;
  }

  const baseSlug = slugify(
    `${this.name}-${this.speciality}`,
    {
      lower: true,
      strict: true,
    }
  );

  let slug = baseSlug;
  let counter = 1;

while (
  await mongoose.models.Doctor.findOne({
    slug,
    _id: { $ne: this._id },
  })
) {
  slug = `${baseSlug}-${counter}`;
  counter++;
};
this.slug = slug
});


export const Doctor =
  mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", doctorSchema);
