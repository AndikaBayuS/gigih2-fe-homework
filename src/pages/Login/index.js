import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../reducer/tokenSlice";
import url from "../../helper/spotify";

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
    <div>
      <a
        href={url}
        className="py-2 px-4 bg-blue-600 rounded text-white font-medium uppercase hover:bg-blue-700 text-xs leading-tight"
      >
        Login
      </a>
    </div>
  );
};

export default Login;
