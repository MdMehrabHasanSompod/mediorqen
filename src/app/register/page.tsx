"use client";
import axios from "axios";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter()

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await axios.post("/api/auth/register", {
        name,
        email,
        phone,
        password,
        age,
      });
      console.log(result);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAge("");
      setLoading(false);
      router.push("/login")
    } catch (error) {
      console.log(error);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAge("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-4 sm:mb-6"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
        
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
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
            </div>

            <div>
              <input
                type="number"
                placeholder="Age"
                min={1}
                max={150}
                className="form-input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="form-input"
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <label className="flex items-start gap-3 text-sm text-gray-600">
            <input type="checkbox" className="mt-0.5 cursor-pointer" required />
            <span>I agree to the Terms & Privacy Policy</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 flex items-center justify-center gap-3 text-white font-medium py-3 px-4 rounded-lg transition text-sm sm:text-base"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            Create Account
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          type="button"
          onClick={()=>signIn("google")}
          className="w-full flex items-center cursor-pointer justify-center gap-4 border border-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 transition"
        >
          <Image src="/google.png" alt="Google" width={22} height={22} />
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <button 
            onClick={()=>router.push("/login")}
            className="text-blue-600 cursor-pointer font-medium hover:underline focus:outline-none"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;