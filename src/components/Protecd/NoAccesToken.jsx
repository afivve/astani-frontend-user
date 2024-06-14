import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profile } from "../../redux/actions/AuthActions";

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profile(navigate, null, "/login"));
  }, [dispatch, navigate]);

  return children;
};

export default Protected;
