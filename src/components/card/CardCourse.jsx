import Start from "../../assets/star.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Verif from "../../assets/verif.svg";
import Type from "../../assets/type.svg";
import Module from "../../assets/module.svg";
import Taken from "../../assets/taken.svg";
import Time from "../../assets/jam.svg";

const CardCourse = ({ data, progress }) => {
  return (
    <Link
      to={`/detail/course/${data.courseId}`}
      className="mt-2 flex flex-col  bg-white rounded-md m-auto shadow-lg  "
    >
      <img
        className="w-full h-[15vh]C rounded-t-md"
        src={data.imageUrl}
        style={{ aspectRatio: "3/2" }}
      />
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
          className="mt-1  font-Montserrat font-bold text-sm line-clamp-2 "
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {data.name}
        </h3>

        <div className="flex flex-row  font-Montserrat text-xs mt-2 font-normal">
          <div className="flex flex-col gap-2 w-[50%]">
            <div className="flex flex-row gap-1">
              <img src={Type} />
              <p>{data.level}</p>
            </div>
            <div className="flex flex-row gap-1">
              <img src={Module} />
              <p>{data.totalModule}</p>
              <p>Modul</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            <div className="flex flex-row gap-1">
              <img src={Taken} />
              <p>{data.taken}</p>
            </div>
            <div className="flex flex-row gap-1">
              <img src={Time} />
              <p>{data.totalDuration}</p>
            </div>
          </div>
        </div>

        {progress?.userCourseId === null ? (
          ""
        ) : (
          <div className="w-full mt-2 flex items-center bg-gray-200 rounded-sm  h-full">
            <p
              className="bg-YELLOW05 whitespace-nowrap w-full p-1.5 text-sm font-medium text-white align-middle leading-none rounded-sm h-full pl-4"
              style={{
                width: `${progress?.progress ?? "0"}%`,
              }}
            >
              {progress?.progress}
              {"% "}completed
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

CardCourse.propTypes = {
  data: PropTypes.object,
  progress: PropTypes.object,
};

export default CardCourse;
