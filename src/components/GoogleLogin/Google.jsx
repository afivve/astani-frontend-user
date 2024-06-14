import { useGoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { registerLoginWithGoogleAction } from "../../redux/actions/AuthActions";

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      dispatch(
        registerLoginWithGoogleAction(responseGoogle.access_token, navigate)
      ),
    onError: (errorResponse) => {
      alert(errorResponse.error_description);
    },
  });
  return (
    <button
      onClick={() => loginGoogle()}
      className="flex w-full justify-center gap-2"
    >
      <p className="">
        <FcGoogle className="text-2xl" />
      </p>
      <p className="text-NEUTRAL03 font-bold">Google</p>
    </button>
  );
};

GoogleLogin.propTypes = {
  buttonText: PropTypes.string,
};

export default GoogleLogin;
