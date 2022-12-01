import Head from "next/head";
import cookie from "cookie";
import { ButtonAuth, Input } from "../components";
import { Login } from "../services";
import router from "next/router";

export async function getServerSideProps(ctx) {
  const cookies = cookie.parse(ctx.req.headers.cookie || "");
  if (cookies.token) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
}

const login = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = e.target[0].value;
    const password = e.target[1].value;

    const data = { username, password };

    const res = await Login(data);
    if (res.status === 200) {
      router.reload();
    } else {
      alert(`Message : ${res.response.data.msg}`);
    }
  };

  return (
    <>
      <Head>
        <title>LOGIN</title>
        <meta name="description" content="Login Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`bg-gray-50`}>
        <div className={`mx-auto max-w-md`}>
          <div
            className={`flex h-screen flex-col items-center justify-center p-4`}
          >
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
              <ButtonAuth>Submit</ButtonAuth>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
