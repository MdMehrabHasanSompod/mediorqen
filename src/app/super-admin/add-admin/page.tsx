"use client";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Loader2, UserCog} from "lucide-react";
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
        role:"admin"
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
    <div className="min-h-screen flex items-center justify-center px-5 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-5">
        <Link
          href="/super-admin/dashboard"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 mb-5"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>
        <h1 className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-800 text-center mb-4">
          Create Admin <UserCog className="w-5 h-5"/>
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
              required
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
                    "Password must contain uppercase, lowercase, number, and special character (@$!%*?&) "
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2 text-white text-sm font-medium py-2.5 rounded-lg transition"
          >
            {" "}
            {loading && <Loader2 size={16} className="animate-spin" />}
            Create Admin
          </button>
        </form>

      </div>
    </div>
  );
};

export default AddAdminPage;