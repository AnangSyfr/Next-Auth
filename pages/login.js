import { useEffect, useState } from "react";
import { googleProvider } from "../config/authMehod";
import socialMediaAuth from "../services/auth";
import firebase from "../config/firebase-config";
import useUserStore from "../store/user";
import { useRouter } from "next/router";

const login = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore((state) => state);
  const [loading, setLoading] = useState(false);
  const handleLogin = async (provider) => {
    const res = await socialMediaAuth(provider);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    if (user !== null) {
      setLoading(true);
      router.push("/dashboard");
    }
  }, [user]);

  return (
    <div className="w-full h-full absolute bg-slate-400">
      <div className="flex w-full h-full items-center">
        <div className="w-5/12 mx-auto">
          <h1 className="font-bold text-2xl">Login</h1>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-5 mt-5"
            placeholder="Username"
          />
          <input
            type="text"
            name="password"
            className="w-full px-3 py-5 mt-5"
            placeholder="Password"
          />
          <button className="w-full bg-blue-600 mt-5 px-3 py-5 text-white font-bold">
            Login
          </button>

          <button
            className="w-full bg-blue-600 mt-5 px-3 py-5 text-white font-bold"
            onClick={() => {
              handleLogin(googleProvider);
              setLoading(true);
            }}
          >
            {loading ? "Loading..." : "Login With Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default login;
