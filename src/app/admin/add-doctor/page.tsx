"use client";
import axios from "axios";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  PlusCircle,
  Trash2,
  UploadIcon,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, FormEvent, useState } from "react";

const specialities: string[] = [
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
];

interface IQualification {
  degree: string;
  institution: string;
}

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fees, setFees] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [displayImage, setDisplayImage] = useState<string | null>();
  const [formImage, setFormImage] = useState<File | null>();
  const [qualifications, setQualifications] = useState<IQualification[]>([]);
  const [draftQualification, setDraftQualification] = useState<IQualification>({
    degree: "",
    institution: "",
  });
  const [qualificationError, setQualificationError] = useState("");

  const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraftQualification((prev) => ({ ...prev, [name]: value }));
  };

  const addQualification = () => {
    if (
      !draftQualification.degree.trim() ||
      !draftQualification.institution.trim()
    ) {
      setQualificationError("Both degree and institution are required");
      return;
    }

    setQualifications((prev) => [...prev, draftQualification]);
    setDraftQualification({ degree: "", institution: "" });
    setQualificationError("");
  };

  const removeQualification = (index: number) => {
    setQualifications((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImage = () => {
    setDisplayImage(null);
    setFormImage(null);
    const input = document.getElementById("image") as HTMLInputElement | null;
    if (input) input.value = "";
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setFormImage(file);
    setDisplayImage(URL.createObjectURL(file));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const validQualifications = qualifications.filter(
      (q) => q.degree.trim() && q.institution.trim()
    );

    if (validQualifications.length === 0) {
      setQualificationError("At least one valid qualification is required*");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("qualifications", JSON.stringify(validQualifications));
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("fees", fees);
      formData.append("password", password);
      formData.append("speciality", speciality);
      if (formImage) formData.append("image", formImage);

      await axios.post("/api/admin/add-doctor", formData);

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setSpeciality("");
      setFormImage(null);
      setDisplayImage(null);
      setQualifications([]);
      setFees("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const addSoftHyphens = (text: string) => text.split("").join("\u00AD");


  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-gray-50">
      <div className="w-full max-w-sm bg-white mx-1  my-2 rounded-xl shadow-lg p-5">
        <Link
          href="/super-admin/dashboard"
          className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 mb-5"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        <h1 className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 text-center mb-4">
          Add Doctor <UserPlus className="w-5 h-5" />
        </h1>

        <form className="space-y-3" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Full Name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="tel"
            placeholder="Phone"
            className="form-input"
            value={phone}
            minLength={11}
            maxLength={13}
            onChange={(e) => setPhone(e.target.value)}
            onInvalid={(e: React.InvalidEvent<HTMLInputElement>) =>
              e.target.setCustomValidity(
                "Phone number must contain 11 to 13 characters"
              )
            }
            onInput={(e: React.FormEvent<HTMLInputElement>) =>
              (e.target as HTMLInputElement).setCustomValidity("")
            }
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="form-input pr-10"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                const t = e.target;
                if (t.validity.valueMissing)
                  t.setCustomValidity("Password is required");
                else if (t.value.length < 8)
                  t.setCustomValidity("Password must be at least 8 characters");
                else if (t.value.length > 24)
                  t.setCustomValidity("Password cannot exceed 24 characters");
                else if (t.validity.patternMismatch)
                  t.setCustomValidity(
                    "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)"
                  );
              }}
              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                (e.target as HTMLInputElement).setCustomValidity("")
              }
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <select
              name="speciality"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              className="form-select"
            >
              <option className="select-option" value="">
                Select Speciality
              </option>
              {specialities.map((item) => (
                <option className="select-option" key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Fees"
              className="form-input"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              name="degree"
              placeholder="Degree (e.g. MBBS)"
              value={draftQualification.degree}
              onChange={handleDraftChange}
              className="form-input"
            />

            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={draftQualification.institution}
              onChange={handleDraftChange}
              className="form-input"
            />
          </div>

          <button
            type="button"
            onClick={addQualification}
            className="flex items-center justify-center gap-1 my-2 px-4 py-2 text-xs w-full rounded-md font-medium text-blue-500 hover:bg-blue-50 border-2 border-blue-500 hover:border-blue-600"
          >
            <PlusCircle size={20} /> Add Qualification
          </button>
          {qualificationError && (
            <p className="text-xs px-1 text-red-500 mt-1">
              {qualificationError}
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {qualifications.map((q, index) => (
              <div
                key={index}
                className="flex justify-between items-center gap-2 p-3 border border-gray-200 rounded-xl bg-gray-50"
              >
                <div className="break-all hyphens-auto flex-1">
                  <p className="text-sm font-medium text-gray-800 break-all hyphens-auto">
                    {addSoftHyphens(q.degree)}
                  </p>
                  <p className="text-xs text-gray-500 break-all hyphens-auto ">{addSoftHyphens(q.institution)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeQualification(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded transition"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-center my-5 gap-5">
            <label
              htmlFor="image"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-gray-300 px-4 py-2 text-xs font-medium text-gray-600 hover:border-blue-500 hover:bg-blue-50 transition"
            >
              Upload Image
              <UploadIcon />
            </label>
            <input
              type="file"
              accept="image/*"
              id="image"
              hidden
              onChange={handleImageChange}
            />
            {displayImage && (
              <div className="relative mt-3 h-37.5 w-37.5 overflow-hidden rounded-xl shadow-md self-center sm:self-start">
                <Trash2
                  size={35}
                  className="absolute top-1 right-1 z-10 text-red-500 hover:text-red-700 hover:bg-red-100 p-1 rounded-full transition cursor-pointer"
                  onClick={() => removeImage()}
                />
                <Image
                  src={displayImage}
                  alt={name || "Doctor Image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2 text-white text-xs font-medium py-2.5 rounded-lg transition"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
