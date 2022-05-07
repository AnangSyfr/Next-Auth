import { useRef, useState, useEffect } from "react";
import axios from "./api/axios";

const register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const REGISTER_URL = "/register";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (user.trim() !== "") {
      setValidName(true);
    } else {
      setValidName(false);
    }
  }, [user]);

  useEffect(() => {
    if (pwd.trim() !== "" && pwd === matchPwd) {
      setValidPwd(true);
      setValidMatchPwd(true);
    } else {
      setValidPwd(false);
      setValidMatchPwd(false);
    }
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        REGISTER_URL,
        { user, pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(res.data);
      console.log(res.accessToken);
      setSuccessMsg(true);

      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (error) {
      if (!err?.response) {
        setErrMsg("No Server Responsee");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  return (
    <div className="w-full h-full absolute bg-slate-400">
      <div className="flex w-full h-full items-center">
        <div className="w-5/12 mx-auto">
          {success ? (
            <a href="login">Login</a>
          ) : (
            <>
              <h1 className="font-bold text-2xl">Register</h1>
              <p ref={errRef} className={errMsg ? "text-red-500" : ""}>
                {errMsg}
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  ref={userRef}
                  type="text"
                  name="username"
                  className="w-full px-3 py-5 mt-5"
                  placeholder="Username"
                  onChange={(e) => setUser(e.target.value)}
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  required
                />
                <input
                  type="text"
                  name="password"
                  className="w-full px-3 py-5 mt-5"
                  placeholder="Password"
                  onChange={(e) => setPwd(e.target.value)}
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  required
                />
                <input
                  type="text"
                  name="matchPassword"
                  className="w-full px-3 py-5 mt-5"
                  placeholder="Confirm Password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  onFocus={() => setMatchPwdFocus(true)}
                  onBlur={() => setMatchPwdFocus(false)}
                  required
                />
                <button
                  className="w-full bg-blue-600 mt-5 px-3 py-5 text-white font-bold"
                  disabled={
                    !validName || !validPwd || !validMatchPwd ? true : false
                  }
                >
                  Register
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default register;
