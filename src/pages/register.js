import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const register = () => {
  const { currentUser } = useAuth();

  const { replace } = useRouter();

  useEffect(() => {
    currentUser && replace("/dashboard");
  }, []);

  return (
    <>
      <Head>
        <title>REGISTER</title>
        <meta name="description" content="Register Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`bg-gray-50`}>
        <div className={`flex h-screen flex-col items-center justify-center`}>
          <h1 className={`text-3xl font-bold text-gray-900`}>REGISTER</h1>
        </div>
      </div>
    </>
  );
};

export default register;
