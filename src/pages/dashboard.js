import Head from "next/head";
import { useAuth } from "../contexts/AuthContext";

const Dasboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
      <Head>
        <title>DASHBOARD</title>
        <meta name="description" content="Dashboard Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`bg-gray-50`}>
        <div
          className={`flex h-screen flex-col items-center justify-center space-y-8 px-4`}
        >
          <h1 className={`text-center text-3xl text-gray-900`}>
            Welcome{" "}
            <span className={`font-bold capitalize`}>{currentUser?.name}</span>
            <span className={`text-xl capitalize`}>
              {" "}
              ({currentUser?.role?.name ?? "No Role"})
            </span>
          </h1>
          <button
            onClick={logout}
            className="rounded-md bg-blue-700 px-5 py-2.5 text-base font-medium text-white transition-all hover:ring-4 hover:ring-blue-300 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dasboard;
