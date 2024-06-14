"use client";
import orderCourseIMG from "../../../assets/order-course.png";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BiSolidLock } from "react-icons/bi";
import { FaCirclePlay, FaCircleCheck } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { putProgress } from "../../../redux/actions/CourseActions";
import { resetContentDetail } from "../../../redux/reducers/DetailReducer";
import {
  getCourseDetail,
  getCheckCourse,
  getContentDetail,
} from "../../../redux/actions/DetailActions";

const DetailContent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseDetail } = useSelector((state) => state.detail) || {};
  const { contentDetail } = useSelector((state) => state.detail) || {};
  const { checkCourse } = useSelector((state) => state.detail);
  const { token } = useSelector((state) => state.auth);

  const [showPopUp, setShowPopUp] = useState(false);
  const userCourse = courseDetail?.userCourseId;
  const video = contentDetail?.videoUrl;
  const isDemo = contentDetail?.isDemo;

  const { courseId } = useParams();
  const { contentId } = useParams();
  const { moduleId } = useParams();

  useEffect(() => {
    if (token) {
      dispatch(getCourseDetail(courseId, true));
      dispatch(getContentDetail(courseId, moduleId, contentId, true));
      dispatch(getCheckCourse(courseId));
    } else {
      dispatch(getCourseDetail(courseId, false));
      dispatch(getContentDetail(courseId, moduleId, contentId, false));
    }
  }, [dispatch, courseId, moduleId, contentId, userCourse, token]);

  const handleLinkClick = (courseId, moduleId, contentId, userCourseId) => {
    dispatch(putProgress(userCourseId, contentId));

    dispatch(resetContentDetail());
    if (contentDetail === null || contentDetail.length == 0) {
      setShowPopUp(true);
    }
    if (token) {
      dispatch(getContentDetail(courseId, moduleId, contentId, true));
    } else {
      dispatch(getContentDetail(courseId, moduleId, contentId, false));
    }
    setTimeout(() => {
      navigate(
        `/detail/course/${courseId}/module/${moduleId}/content/${contentId}`
      );
    }, 500);
  };

  const handleClosePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <>
      {checkCourse === null && showPopUp === true && contentDetail === null && (
        <div className="flex lg:flex-row fixed justify-center items-center bg-black bg-opacity-50 w-full h-full z-40">
          <div className="rounded-xl bg-gray-100 max-w-sm w-full z-50">
            <div className="w-full flex justify-end">
              <button onClick={handleClosePopUp} className="text-2xl pt-4 pr-4">
                <MdOutlineClose />
              </button>
            </div>
            <div className="px-10 pb-8">
              <div>
                <h1 className="text-2xl text-center font-bold text-BLUE05">
                  Selangkah lagi menuju
                </h1>
                <h2 className="text-2xl text-center font-bold text-YELLOW05">
                  Kelas Premium
                </h2>
              </div>
              <div className="flex flex-col justify-center items-center ">
                <img src={orderCourseIMG} className="w-2/3" alt="" />
              </div>
              <div className="w-full flex justify-center">
                <Link
                  to={`/detail/payment/${courseId}`}
                  className="flex justify-between items-center bg-BLUE05 w-4/5 text-white font-semibold rounded-full py-1.5 mt-2"
                >
                  <span className="ml-5">{""}</span>
                  Belajar Sekarang Juga <FaArrowRight className="mr-5 mt-0.5" />
                </Link>
              </div>
            </div>
          </div>
          <button
            className="text-white bg-black bg-opacity-50 absolute border-0  w-full h-full"
            onClick={handleClosePopUp}
          >
            x
          </button>
        </div>
      )}
      <div className="mb-24 sm:mb-10">
        <div className="hidden sm:block container font-semibold  mx-auto py-5">
          <Link
            to={`/detail/course/${courseId}`}
            className="flex items-center gap-3"
          >
            <IoMdArrowRoundBack className="text-xl" />{" "}
            <p>{courseDetail?.title}</p>
          </Link>
        </div>
        <div className="container flex flex-col lg:flex-row gap-5 lg:gap-10 mx-auto ">
          <div className="" style={{ flex: "2" }}>
            <iframe
              className="w-full aspect-video rounded-md bg-black"
              src={`${`${
                isDemo
                  ? `https://www.youtube.com/embed/${video}`
                  : `https://www.youtube.com/embed/`
              } `}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <h1 className="text-2xl sm:text-3xl font-semibold mt-1">
              {contentDetail?.title}
            </h1>
            <p className="text-lg">
              by <span className="capitalize">{courseDetail?.instructor}</span>
            </p>
          </div>

          <div
            className="border shadow-sm drop-shadow-sm ring-offset-1 border-gray-400/20 rounded-md h-max"
            style={{ flex: "1" }}
          >
            <div
              className="py-5 px-6 overflow-auto lg:h-96 2xl:h-screen"
              style={{ height: "75vh" }}
            >
              <div className="flex justify-between flex-wrap">
                <h3 className=" font-bold">Materi Belajar</h3>
                {courseDetail?.userCourseId === null ? (
                  ""
                ) : (
                  <div className="flex items-center bg-gray-200 rounded-sm dark:bg-gray-700 h-full">
                    <p
                      className="bg-BLUE05 whitespace-nowrap w-full p-1.5 text-sm font-medium text-white align-middle leading-none rounded-sm h-full px-4"
                      style={{
                        width: `${courseDetail?.learningProgress ?? "0"}%`,
                      }}
                    >
                      {courseDetail?.learningProgress}
                      {"% "}completed
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2.5">
                {courseDetail?.modules?.map((module, moduleIndex) => (
                  <>
                    <div className="flex gap-4 justify-between text-sm w-full mt-5 mb-3">
                      <span className="text-BLUE05 font-bold ">
                        Chapter {moduleIndex + 1} - {module?.title}
                      </span>
                      <span className="font-bold text-DARKBLUE03 whitespace-nowrap">
                        {module?.duration} menit
                      </span>
                    </div>
                    {courseDetail?.modules?.[moduleIndex]?.contents?.map(
                      (content, contentIndex) => (
                        <div className="" key={contentIndex}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(
                                courseDetail?.courseId,
                                module?.moduleId,
                                content?.contentId,
                                courseDetail?.userCourseId
                              );
                            }}
                            className="flex items-center justify-between py-1 w-full"
                          >
                            <div className="flex items-center text-sm">
                              <span className="rounded-full bg-DARKBLUE04 text-sm font-medium py-1 px-3 mr-2.5">
                                {contentIndex + 1}
                              </span>
                              <span className="">{content?.title}</span>
                            </div>
                            <span className="text-xl">
                              {checkCourse?.status === "success" ? (
                                <>
                                  {content?.isFinished ? (
                                    <FaCircleCheck
                                      style={{ color: "#00CF6C" }}
                                    />
                                  ) : (
                                    <FaCirclePlay className="text-BLUE05" />
                                  )}
                                </>
                              ) : (
                                <>
                                  {content?.isDemo ? (
                                    <FaCirclePlay className="text-BLUE05" />
                                  ) : (
                                    <BiSolidLock className={"text-black/60"} />
                                  )}
                                </>
                              )}
                            </span>
                          </button>
                          <hr className="my-1" />
                        </div>
                      )
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailContent;
