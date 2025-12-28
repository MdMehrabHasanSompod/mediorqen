"use client";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const session = useSession();
  console.log(session);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials",{
        email,password
      })
      console.log(result);
      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-5">
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 mb-3"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <h1 className="text-lg font-semibold text-gray-800 text-center mb-4">
          Login to Continue
        </h1>
        <form className="space-y-3" onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <label className="flex items-start gap-2 text-xs text-gray-600">
            <input type="checkbox" className="mt-1" required />I agree to the
            Terms & Privacy Policy
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer flex items-center justify-center gap-2 text-white text-sm font-medium py-2.5 rounded-lg transition"
          >
            {" "}
            {loading && <Loader2 size={16} className="animate-spin" />}
            Login
          </button>
        </form>

        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition"
          onClick={()=>signIn("google")}
        >
          <Image src="/google.png" alt="Google" width={24} height={24} />
          <span className="text-sm font-medium text-gray-700 cursor-pointer">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-xs text-gray-500 mt-4">
          Don&apos;t have an account?{" "}
          <span onClick={()=>router.push("/register")} className="text-blue-600 font-medium cursor-pointer hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;