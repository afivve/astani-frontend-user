import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../redux/actions/AuthActions";
import Desktop from "./Desktop";
import Mobile from "./Mobile";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(profile(navigate, null, "/login"));
    }
  }, [dispatch, navigate, token]);

  return (
    <>
      <Desktop user={user} />
      <Mobile user={user} />
    </>
  );
};

export default Header;
