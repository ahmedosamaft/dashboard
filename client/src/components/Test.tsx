import axios from "axios";
import React, { useState } from "react";

export default function Test() {
  const [data, setData] = useState<{ email: string; password: string } | { email: string; password: string }>({
    email: "",
    password: "",
  });
  const emailHandler = ({ target }: { target: HTMLInputElement }) => {
    setData({ ...data, email: target.value });
  };
  const passwordHandler = (e) => {
    setData({ ...data, password: e.target.value });
  };
  const handler = async (e) => {
    try {
      let res = await axios("http://localhost:5000/login", {
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "*/*",
        },
      });
      // let res = await fetch("http://localhost:5000/login", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      //   mode: "no-cors",
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      // });
      console.log(res);
    } catch (E) {
      console.log(E);
    }
  };
  return (
    <div>
      <input
        aria-label="Email area"
        type="email"
        name="email"
        onChange={emailHandler}
      />
      <input
        aria-label="Password area"
        type="password"
        name="password"
        onChange={passwordHandler}
      />
      <button onClick={handler}>send</button>
    </div>
  );
}
