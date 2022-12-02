import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonAuth, Input } from "../components";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { currentUser, login } = useAuth();
  const { replace } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const username = e.target[0].value;
    const password = e.target[1].value;
    await login({ username, password });
    setLoading(false);
  };

  useEffect(() => {
    currentUser && replace("/dashboard");
  }, []);

  return (
    <>
      <Head>
        <title>LOGIN</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bg-gray-50`}>
        <div className={`mx-auto max-w-md`}>
          <div className={`flex h-screen flex-col justify-center p-4`}>
            <form
              onSubmit={handleSubmit}
              className={`w-full space-y-8 rounded-md border border-gray-100 bg-white px-4 py-14`}
            >
              <h1 className={`text-center text-3xl font-bold text-gray-900`}>
                Login Page
              </h1>
              <div className={`space-y-6`}>
                <Input type={`text`} placeholder={`Username`} required />
                <Input type={`password`} placeholder={`Password`} required />
              </div>
              <ButtonAuth
                disabled={loading}
                className={`${loading && "cursor-not-allowed"}`}
              >
                {loading ? "Loading ..." : "Submit"}
              </ButtonAuth>
            </form>
            <Link
              href={`/register`}
              className={`m-4 w-fit text-lg text-blue-500 transition-all hover:underline`}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
