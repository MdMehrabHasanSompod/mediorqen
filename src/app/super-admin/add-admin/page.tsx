"use client";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Loader2, UserCog } from "lucide-react";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const AddAdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post("/api/super-admin/add-admin", {
        name,
        email,
        phone,
        password,
        role: "admin"
      });
      console.log(result);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <Link
          href="/super-admin/dashboard"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>
        
        <h1 className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">
          Create Admin <UserCog className="w-6 h-6" />
        </h1>
        
        <form className="space-y-4" onSubmit={submitHandler}>
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
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInvalid={(e: React.InvalidEvent<HTMLInputElement>) => {
                  const target = e.target;

                  if (target.validity.valueMissing) {
                    target.setCustomValidity("Password is required");
                  } else if (target.value.length < 8) {
                    target.setCustomValidity(
                      "Password must be at least 8 characters"
                    );
                  } else if (target.value.length > 24) {
                    target.setCustomValidity(
                      "Password cannot exceed 24 characters"
                    );
                  } else if (target.validity.patternMismatch) {
                    target.setCustomValidity(
                      "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)"
                    );
                  }
                }}
                onInput={(e: React.FormEvent<HTMLInputElement>) =>
                  (e.target as HTMLInputElement).setCustomValidity("")
                }
              />
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-white font-medium py-3 px-4 rounded-lg transition text-sm mt-2"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            Create Admin
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddAdminPage;