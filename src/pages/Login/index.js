import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducer/tokenSlice";
import url from "../../helper/spotify";
import logo from "../../assets/spotify-logo.png";
const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(getToken()));
  }, [dispatch]);

  const getToken = () => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");

    return accessToken;
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-neutral-800 p-5 rounded-lg text-center">
        <img src={logo} className="h-32 w-32 mb-5" />
        <a
          href={url}
          className="py-2 px-4 bg-green-600 rounded text-white font-medium uppercase hover:bg-green-700 text-xs leading-tight"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Login;
