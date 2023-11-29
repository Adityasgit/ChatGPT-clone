"use client";

import { useEffect } from "react";
import { Button } from "../../components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Link from "next/link";

export function LoginAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function signInWithGithub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/api/auth/callback`,
      },
    });
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email | phone and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email or Phone</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" onClick={handleSignIn}>
              Login
            </Button>
            <p className="mt-2 text-xs text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <Link
                href={"/register"}
                className=" text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
            <div className="w-[80%] border-b-2 border-gray translate-y-4"></div>
            <p className="text-sm text-gray-400 font-bold z-10 translate-y-1">
              OR
            </p>
          </CardFooter>
          <CardContent>
            <div className="flex flex-col w-full">
              {" "}
              <Button className="w-[70%] p-2 m-2 mx-auto hover:bg-slate-100 bg-white border-black-200 text-black border-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  className="-translate-x-5"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>{" "}
                Continue with Google
              </Button>
              <Button
                onClick={signInWithGithub}
                className="w-[70%] p-2 m-2 mx-auto"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-translate-x-5"
                >
                  <path
                    d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Continue with Github
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export function RegisterAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupclick, setsignupclick] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignUp = async () => {
    const data = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/chat`,
      },
    });
    setsignupclick(true);
  };
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto bg-white lg:max-w-lg">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign up</CardTitle>
            <CardDescription className="text-center">
              Enter your email to sign up
            </CardDescription>
          </CardHeader>
          {!signupclick ? (
            <>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button onClick={handleSignUp} className="w-full">
                  Signup
                </Button>
                <p className="mt-2 text-xs text-center text-gray-700">
                  {" "}
                  Don't have an account?{" "}
                  <Link
                    href={"/login"}
                    className=" text-blue-600 hover:underline"
                  >
                    Log in
                  </Link>
                </p>
                <div className="w-[80%] border-b-2 border-gray translate-y-4"></div>
                <p className="text-sm text-gray-400 font-bold z-10 translate-y-1">
                  OR
                </p>
              </CardFooter>
            </>
          ) : (
            <CardFooter>
              <div className="flex flex-col justify-center align-middle w-full">
                <div className="text-gray-500 m-4 text-center">
                  An Email has been sent to your email
                </div>
                <Button onClick={() => setsignupclick(!signupclick)}>
                  Try again
                </Button>
              </div>
            </CardFooter>
          )}
          <CardContent>
            <div className="flex flex-col w-full">
              {" "}
              <Button className="w-[70%] p-2 m-2 mx-auto hover:bg-slate-100 bg-white border-black-200 text-black border-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  className="-translate-x-5"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>{" "}
                Continue with Google
              </Button>
              <Button className="w-[70%] p-2 m-2 mx-auto">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-translate-x-5"
                >
                  <path
                    d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                Continue with Github
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export const LogSigButt = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row gap-5 w-full justify-center font-bold p-5">
        <Button
          onClick={() => router.push("/login")}
          className="w-[50%] hover:bg-blue-700 bg-blue-600 font-bold text-base py-6"
        >
          Log in
        </Button>

        <Button
          onClick={() => router.push("/register")}
          className="w-[50%] hover:bg-blue-700 bg-blue-600 font-bold text-base py-6"
        >
          Sign up
        </Button>
      </div>
    </>
  );
};

export const Display = () => {
  const questionArrays = [
    [
      "Legal document drafting",
      [
        "How to structure a contract effectively?",
        "What are the best practices for creating agreements?",
      ],
      true,
    ],
    [
      "Case law analysis",
      [
        "How to interpret legal precedents accurately?",
        "What tools aid in comprehensive case research?",
      ],
      true,
    ],
    [
      " planning guidelines?",
      [
        "How to draft a comprehensive will for estate",
        "What considerations for power of attorney for estate",
      ],
      false,
    ],
    [
      "Intellectual property protection",
      ["How to safeguard trademarks?", "What steps ensure copyright security?"],
      true,
    ],
    [
      "for employment law compliance?",
      [
        "How to navigate labor regulations ",
        "What policies mitigate workplace disputes",
      ],
      false,
    ],
    [
      "Employment law compliance",
      [
        "How to navigate labor regulations?",
        "What policies mitigate workplace disputes?",
      ],
      true,
    ],
  ];

  const [question, setQuestion] = useState("");
  const [question2, setQuestion2] = useState("");
  const [message, setMessage] = useState("");
  const [i, setI] = useState(0);
  const [i2, setI2] = useState(0);
  useEffect(() => {
    setQuestion(questionArrays?.[i]?.[2] ? questionArrays?.[i]?.[0] : "");
    setQuestion2(!questionArrays?.[i]?.[2] ? questionArrays?.[i]?.[0] : "");
  }, [i, questionArrays]);
  useEffect(() => {
    setTimeout(() => {
      setI((p) => (p + 1 >= questionArrays.length ? 0 : p + 1));
    }, 7000);
  }, [question]);

  useEffect(() => {
    setMessage(questionArrays?.[i]?.[1]?.[i2]);
  }, [i2, questionArrays]);
  useEffect(() => {
    setTimeout(() => {
      setI2((p) => (p + 1 >= questionArrays[1].length ? 0 : p + 1));
    }, 3500);
  }, [message]);
  return (
    <>
      <div className="absolute top-[50%] left-[5%] text-[#fe7600] ">
        <div className="text-3xl top-[43%] font-extrabold fixed first-letter:text-4xl">
          <div className="animate-top-in">{question}</div>
        </div>

        <p className="text-xl font-bold fixed p-4 animate-type-writer inline-block overflow-hidden h-12">
          {message || "Try to ask "}{" "}
        </p>

        <div className="text-3xl top-[57%] font-extrabold fixed">
          {question2}{" "}
        </div>
      </div>
    </>
  );
};
