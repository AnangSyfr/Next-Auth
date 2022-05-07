import React from "react";
import useUserStore from "../store/user";
import { auth } from "../config/firebase-config";
import { useRouter } from "next/router";
import { useEffect } from "react";

const dashboard = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore((state) => state);

  const handleLogout = (e) => {
    e.preventDefault();
    auth.signOut();
    setUser([]);
    router.push("/login");
  };

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  });
  console.log(user);

  return (
    <div className="container w-10/12 mx-auto p-10">
      <div className="flex">
        <div className="w-6/12">
          <h1 className="font-bold">Welcome {user && user.displayName}</h1>
        </div>
        <div className="w-6/12">
          <a className="text-right block" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
