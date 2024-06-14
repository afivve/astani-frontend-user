import Start from "../../assets/star.svg";
import PropTypes from "prop-types";
import diamond from "../../assets/diamond.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCourseFree } from "../../redux/actions/CourseActions";
import Verif from "../../assets/verif.svg";
import Type from "../../assets/type.svg";
import Module from "../../assets/module.svg";
import Taken from "../../assets/taken.svg";
import Times from "../../assets/jam.svg";

const CardPickCourse = ({ data }) => {
  const dispatch = useDispatch();

  const buttonStyles = {
    common: "rounded-full py-1 px-8 text-xs font-bold ",
    premium:
      "bg-blue-400 hover:bg-blue-300 text-white font-bold flex justify-between gap-2",
    free: "bg-blue-600 hover:bg-blue-400 text-white ",
  };

  const getClassStyles = (kelas) => {
    switch (kelas) {
      case "Premium":
        return buttonStyles.common + " " + buttonStyles.premium;
      case "Free":
        return buttonStyles.common + " " + buttonStyles.free;
      default:
        return buttonStyles.common;
    }
  };

  const handleCourseFree = async (event, courseID) => {
    event.preventDefault();
    dispatch(getCourseFree(courseID));
  };

  return (
    <div className="mt-2 flex flex-col  bg-white rounded-md m-auto shadow-lg mx-1 ">
      <Link to={`/detail/course/${data.id}`} className="rounded-t-md">
        <img
          className="w-full h-[15vh] rounded-t-md"
          src={data.imageUrl}
          style={{ aspectRatio: "3/2" }}
        />
      </Link>
      <div className="flex flex-col mt-3 px-2 mb-3">
        <div className="flex flex-row justify-between font-Montserrat  text-sm ">
          <div className="flex flex-row gap-1">
            <p>by</p>
            <h3 className="">{data.instructor}</h3>
            <img src={Verif} />
          </div>
          <div className="flex flex-row gap-1">
            <img src={Start} />
            <p>{data.rating}</p>
          </div>
        </div>
        <h3
          className="mt-1 font-Montserrat font-bold text-sm line-clamp-2 "
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {data.title}
        </h3>

        <div className="flex pb-2 flex-col font-Montserrat text-xs mt-2 font-normal">
          <div className="flex flex-row gap-10">
            <div className="flex flex-row gap-1">
              <img src={Type} />
              <p>{data.level}</p>
            </div>
            <div className="flex flex-row gap-1">
              <img src={Taken} />
              <p>{data.taken}</p>
            </div>
          </div>
          <div className="flex flex-row gap-12">
            <div className="flex flex-row gap-1">
              <img src={Module} />
              <p>{data.totalModule}</p>
              <p>Modul</p>
            </div>
            <div className="flex flex-row gap-1">
              <img src={Times} />
              <p>{data.duration}</p>
            </div>
          </div>
        </div>
        <div>
          <button
            className={getClassStyles(data.type)}
            onClick={(event) => {
              handleCourseFree(event, data.id);
            }}
          >
            {data.type === "Premium" ? (
              <Link to="/detail/payment" className="flex flex-row gap-3">
                <img src={diamond} alt="Diamond" /> Premium
              </Link>
            ) : (
              "Mulai Kelas"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

CardPickCourse.propTypes = {
  data: PropTypes.object,
};

export default CardPickCourse;
