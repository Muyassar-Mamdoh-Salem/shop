import { Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/appSlice";

const Sign = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("/");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUser({
            __id: user.uid,
            userName: user.displayName,
            email: user.email,
          })
        );
        navigate("/");
      })
      .catch((error) => {
        alert("Login failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-300 via-gray-100 to-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative w-full max-w-md bg-gradient-to-tr from-black/70 to-gray-800/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10">
        <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-700 rounded-br-full opacity-40 animate-pulse -z-10"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-purple-300 rounded-tl-full opacity-40 animate-pulse -z-10"></div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 text-center">
          Welcome Back
        </h2>

        <p className="text-center text-gray-200 mb-6">
          Don't have an account?{" "}
          <Link to="/regpage" className="text-indigo-300 underline">
            Register
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleLogin}>
          {[{
            icon: Mail,
            placeholder: "Email Address",
            value: email,
            onChange: setEmail,
            type: "email",
          }, {
            icon: Lock,
            placeholder: "Password",
            value: password,
            onChange: setPassword,
            type: "password",
          }].map(({ icon: Icon, placeholder, value, onChange, type }, i) => (
            <div key={i} className="flex items-center gap-3 bg-gray-900 bg-opacity-50 border border-indigo-500 rounded-xl px-4 py-2">
              <Icon className="w-5 h-5 text-indigo-300" />
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-transparent text-white placeholder-indigo-300 outline-none"
                required
              />
            </div>
          ))}

          <div className="flex justify-between text-sm text-gray-300 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>
            <Link to="/forgot" className="text-indigo-300 underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-500 transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sign;
