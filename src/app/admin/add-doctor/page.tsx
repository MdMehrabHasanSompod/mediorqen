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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <Link
          href="/super-admin/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1 className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
          Add Doctor <UserPlus className="w-6 h-6" />
        </h1>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="form-input"
                value={phone}
                minLength={11}
                maxLength={13}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="form-input"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                className="form-select"
                required
              >
                <option value="" className="select-option">Select Speciality</option>
                {specialities.map((item) => (
                  <option key={item} value={item} className="select-option">
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="number"
                placeholder="Consultation Fees"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-sm"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Qualifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
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
              className="w-full md:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-500 hover:border-blue-600 rounded-lg transition"
            >
              <PlusCircle size={18} /> Add Qualification
            </button>
            
            {qualificationError && (
              <p className="text-xs text-red-500 mt-2">{qualificationError}</p>
            )}

            <div className="mt-4 space-y-2">
              {qualifications.map((q, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {q.degree}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{q.institution}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Profile Image</h3>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <label
                htmlFor="image"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-5 py-3 text-sm font-medium text-gray-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition w-full md:w-auto"
              >
                <UploadIcon size={18} />
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                hidden
                onChange={handleImageChange}
              />
              
              {displayImage && (
                <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md border-2 border-blue-600">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 cursor-pointer right-2 z-10 text-red-500 hover:text-red-700 bg-white p-1.5 rounded-full shadow-sm transition"
                  >
                    <Trash2 size={18} />
                  </button>
                  <Image
                    src={displayImage}
                    alt="Doctor preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-white font-medium py-3 px-4 rounded-lg transition text-sm mt-6"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;