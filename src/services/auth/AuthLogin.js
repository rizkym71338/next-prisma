import axios from "axios";

const AuthLogin = async ({ username, password }) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      data: {
        name: username,
        password,
      },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export default AuthLogin;
