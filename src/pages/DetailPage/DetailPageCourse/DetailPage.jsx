import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BiLogoTelegram, BiSolidLock, BiLink } from "react-icons/bi";
import { FaCirclePlay, FaCircleCheck, FaCircleInfo } from "react-icons/fa6";
import { MdStar, MdStarBorder, MdOutlineClose } from "react-icons/md";
import { putProgress } from "../../../redux/actions/CourseActions";
import { getCourseFree } from "../../../redux/actions/CourseActions";
import {
  getCourseDetail,
  getCheckCourse,
  getTestimonial,
  postTestimonial,
  postCertificate,
} from "../../../redux/actions/DetailActions";
import { toastify } from "../../../utils/toastify";

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseDetail } = useSelector((state) => state.detail) || {};
  const { checkCourse } = useSelector((state) => state.detail);
  const { testimonial } = useSelector((state) => state.detail);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const [testimonialText, setTestimonialText] = useState("");
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [showPopUp, setShowPopUp] = useState(false);

  const { courseId } = useParams();

  useEffect(() => {
    dispatch(getTestimonial(courseId));
    if (token) {
      dispatch(getCourseDetail(courseId, true));
      dispatch(getCheckCourse(courseId));
    } else {
      dispatch(getCourseDetail(courseId, false));
    }
  }, [dispatch, courseId, token]);

  const handleLinkClick = (
    courseId,
    moduleId,
    contentId,
    userCourseId,
    isDemo
  ) => {
    dispatch(putProgress(userCourseId, contentId));
    navigate(
      `/detail/course/${courseId}/module/${moduleId}/content/${contentId}`
    );
    if (userCourseId == null && user !== null && isDemo == true) {
      toastify({
        message: "Ambil Kelas Terlebih Dahulu",
        type: "error",
      });
    } else if (userCourseId == null && user !== null && isDemo == false) {
      navigate(
        `/detail/course/${courseId}/module/${moduleId}/content/${contentId}`
      );
    }
    if (user == null) {
      toastify({
        message: "Silahkan Login Terlebih Dahulu",
        type: "error",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  const handleCourseFree = async (event, courseID) => {
    event.preventDefault();
    dispatch(getCourseFree(courseID));
  };

  const handleTestimonial = (e) => {
    e.preventDefault();

    dispatch(postTestimonial(courseId, testimonialText, number));
    dispatch(getTestimonial(courseId));
    setTestimonialText("");
    setNumber(0);
    setHoverStar(undefined);

    setInterval(setShowPopUp(false), 1000);
  };

  const handleCetakSertifikat = (e) => {
    e.preventDefault();
    dispatch(postCertificate(courseId));
  };

  return (
    <>
      {courseDetail?.learningProgress === 100 && showPopUp && (
        <div className="flex fixed w-full h-full justify-center items-center bg-black/50 z-40">
          <div className="flex flex-col max-w-sm w-full bg-gray-100 rounded-xl p-5 z-50">
            <div className="w-full flex justify-end">
              <button
                onClick={() => {
                  setShowPopUp(false);
                }}
                className="text-2xl"
              >
                <MdOutlineClose />
              </button>
            </div>
            <div className="px-5">
              <div>
                <h1 className="text-center text-2xl font-bold text-BLUE05">
                  Ulas Pengalaman Anda Terkait Course Ini
                </h1>
              </div>
              <form
                onSubmit={handleTestimonial}
                className="flex flex-col text-center"
              >
                <div className="flex w-full justify-center">
                  {Array(5)
                    .fill()
                    .map((_, index) =>
                      number >= index + 1 || hoverStar >= index + 1 ? (
                        <MdStar
                          key={index}
                          size={40}
                          onMouseOver={() => setHoverStar(index + 1)}
                          onMouseLeave={() => setHoverStar(undefined)}
                          className="text-YELLOW05 my-2"
                          onClick={() => setNumber(index + 1)}
                        />
                      ) : (
                        <MdStarBorder
                          key={index}
                          size={40}
                          onMouseOver={() => setHoverStar(index + 1)}
                          onMouseLeave={() => setHoverStar(undefined)}
                          className="text-YELLOW05 my-2"
                          onClick={() => setNumber(index + 1)}
                        />
                      )
                    )}
                </div>
                <textarea
                  className="border border-black/30  py-2 px-4"
                  name="rating"
                  placeholder="Berikan Penilaian disini..."
                  cols="30"
                  rows="4"
                  value={testimonialText}
                  onChange={(e) => setTestimonialText(e.target.value)}
                  required
                ></textarea>
                <button
                  type="submit"
                  className={`${
                    !number
                      ? "bg-BLUE05/50 pointer-events-none text-white mt-4 py-1.5 mb-3"
                      : "bg-BLUE05 text-white mt-4 py-1.5 rounded-sm mb-3"
                  }`}
                  onClick={() => {
                    dispatch(getTestimonial(courseId));
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <button
            className="text-white bg-black bg-opacity-50 absolute border-0  w-full h-full"
            onClick={() => {
              setShowPopUp(false);
            }}
          >
            x
          </button>
        </div>
      )}
      <div className="mb-24 sm:mb-10">
        <div className=" container mx-auto py-5 md:my-5">
          <div className="flex flex-col sm:flex-row border rounded-md  p-6 shadow-sm drop-shadow-sm">
            <div>
              <img
                className="sm:max-w-xs w-full"
                src={courseDetail?.imageUrl}
                alt=""
                style={{ aspectRatio: "3/2" }}
              />
            </div>
            <div className="sm:pl-8 w-full">
              <div className="mb-3">
                <div className="mb-2">
                  <h1 className="text-3xl font-semibold text-gray-800">
                    {courseDetail?.title}
                  </h1>
                  <span>
                    by{" "}
                    <span className="capitalize">
                      {courseDetail?.instructor}
                    </span>
                  </span>
                </div>

                <div className=" flex flex-wrap -mx-4">
                  <div
                    className="w-1/3 p-4 border-r"
                    style={{ borderRight: "1px solid #DEE2E6" }}
                  >
                    <p>Level</p>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#1B1B1B" }}
                    >
                      {courseDetail?.level}
                    </span>
                  </div>
                  <div
                    className="w-1/3 p-4 border-r"
                    style={{ borderRight: "1px solid #DEE2E6" }}
                  >
                    <p>Kategori</p>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#1B1B1B" }}
                    >
                      {courseDetail?.category}
                    </span>
                  </div>
                  <div className="w-1/3  p-4">
                    <p>Durasi</p>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: "#1B1B1B" }}
                    >
                      {courseDetail?.duration} Menit
                    </span>
                  </div>
                </div>
                <hr />
              </div>
              <div className="flex flex-wrap justify-between w-full">
                {courseDetail?.type === "Premium" ? (
                  <>
                    {courseDetail?.discount === null ? (
                      <div
                        className="font-bold text-2xl "
                        style={{ color: "#29303B" }}
                      >
                        Rp.{" "}
                        {parseInt(courseDetail?.originalPrice).toLocaleString()}
                      </div>
                    ) : (
                      <div
                        className="flex items-center font-bold text-2xl whitespace-nowrap"
                        style={{ color: "#29303B" }}
                      >
                        <span className="line-through">
                          Rp.{" "}
                          {parseInt(
                            courseDetail?.originalPrice
                          ).toLocaleString()}
                        </span>
                        <div className="text-red-500">
                          <p className="text-sm">
                            discount {courseDetail?.discount}%
                          </p>
                          <span className="pl-2 ">
                            Rp. {""}
                            {parseInt(
                              courseDetail?.totalPrice
                            ).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div
                    className=" font-bold text-2xl"
                    style={{ color: "#29303B" }}
                  >
                    <span className="line-through">
                      Rp.{" "}
                      {parseInt(courseDetail?.originalPrice).toLocaleString()}
                    </span>
                    <span className="pl-2 text-red-500">
                      {courseDetail?.type}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2.5 mt-3 lg:mt-0">
                  <Link
                    to="https://t.me/+c0MZsCGj2jIzZjdl"
                    target="_blank"
                    alt=""
                    className="flex gap-2 rounded-sm text-YELLOW05 items-center border-2 border-YELLOW05 hover:text-yellow-500 hover:border-yellow-500 w-max py-1.5 px-4"
                  >
                    <span className="font-semibold">Join Group Telegram</span>
                    <BiLogoTelegram className="text-xl" />
                  </Link>

                  {courseDetail.courseDiscussionId !== null && (
                    <Link
                      to={`/discussion-course/${courseId}`}
                      className="flex gap-2 rounded-sm text-white bg-YELLOW05 items-center border-2 hover:bg-yellow-600  w-max py-1.5 px-4"
                    >
                      <span className="font-semibold">Discussion</span>
                      <BiLink className="text-xl" />
                    </Link>
                  )}

                  {courseDetail.userCourseId === null ? (
                    <button className="text-white bg-YELLOW05 hover:bg-yellow-500 px-5 font-semibold py-1.5">
                      {courseDetail?.type === "Free" ? (
                        <button
                          onClick={(event) => {
                            handleCourseFree(event, courseDetail.courseId);
                          }}
                        >
                          Ambil Kelas
                        </button>
                      ) : (
                        <Link
                          to={`/detail/payment/${courseId}`}
                          className="flex flex-row gap-3"
                        >
                          Beli Kelas
                        </Link>
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container flex flex-col-reverse md:flex-row gap-10 mx-auto md:my-8">
          <div className="" style={{ flex: "3" }}>
            <div>
              <h3 className="text-xl font-medium sm:mt-8">Tentang Kelas</h3>
              <p className="indent-8">{courseDetail?.description}</p>
            </div>
            <div>
              <h3 className="text-xl font-medium mt-8 mb-2.5">
                Kelas ini ditujukan untuk
              </h3>
              <ul className="list-decimal list-inside">
                {courseDetail?.requirements?.map((requirements, index) => (
                  <li key={index} className="pl-2 py-1">
                    {requirements?.requirement}
                  </li>
                ))}
              </ul>
            </div>

            {courseDetail?.learningProgress === 100 && (
              <>
                <div className="mt-5 pb-2">
                  <p className="flex gap-2.5">
                    <FaCircleInfo className="text-YELLOW05 mt-1 text-xl" />
                    <div>
                      Anda belum memberikan penilaian untuk kursus ini. Yuk,
                      berikan penilaian sekarang juga!{" "}
                      <button
                        className="text-BLUE05 italic font-semibold"
                        onClick={() => {
                          setShowPopUp(true);
                        }}
                      >
                        Berikan Penilaianmu disini
                      </button>
                    </div>
                  </p>
                </div>
              </>
            )}
            <div>
              <h2 className="text-xl font-semibold my-5">Course Rating</h2>
              <div className="grid grid-cols-2 gap-8">
                {testimonial?.map((testi, index) => (
                  <>
                    <div key={index}>
                      <div className="flex mb-4">
                        <img
                          src={testi?.userPhotoProfile}
                          alt="foto-profil"
                          className="w-10 h-10 rounded-full mr-5 object-cover object-top "
                        />
                        <div>
                          <h3 className="font-bold">{testi?.userName}</h3>
                          <div className="flex">
                            {[...Array(testi.rating)].map((_, starIndex) => (
                              <MdStar
                                key={starIndex}
                                className="text-YELLOW05"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="line-clamp-4">
                        {'"'}
                        {testi?.testimonial}
                        {'"'}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div style={{ flex: "2" }}>
            {courseDetail?.learningProgress === 100 &&
              courseDetail?.type === "Premium" && (
                <>
                  <div className="border shadow-sm drop-shadow-sm ring-offset-1 border-gray-400/20 rounded-sm px-6 py-4 ">
                    <h6 className="text-center font-bold mb-3">
                      Sertifikat Kelulusan
                    </h6>
                    <p className="text-center px-5 mb-5">
                      <p>Selamat atas pencapaian Anda!</p> Sertifikat ini adalah
                      bukti dari perjuangan Anda dalam menyelesaikan kursus ini.
                    </p>
                    <div className="flex gap-5">
                      <button
                        className="border-2 border-YELLOW05 text-YELLOW05 hover:bg-YELLOW05 hover:text-white font-semibold px-4 py-2 w-full "
                        onClick={handleCetakSertifikat}
                      >
                        Cetak Sertifikat
                      </button>
                      <Link
                        to="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=Test%20Certificate&organizationId=1337&issueYear=2018
&issueMonth=2&expirationYear=2020&expirationMonth=5&certUrl=
https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Flearn%2Fcertifications%2Fd365-functional-consultant-sales&certId=1234"
                        target="_blank"
                        className="border-2 text-center border-BLUE05 text-BLUE05 hover:bg-BLUE05 hover:text-white font-semibold px-4 py-2 w-full"
                      >
                        Post to LinkdIn
                      </Link>
                    </div>
                  </div>
                  <div className=" my-5">
                    <button
                      onClick={() => {
                        setShowPopUp(true);
                      }}
                      className="flex items-center gap-3"
                    >
                      <FaCircleInfo className="text-YELLOW05" />
                      <button className="text-BLUE05 font-semibold text-md">
                        Beri rating untuk course ini Kuyyy.
                      </button>
                    </button>
                  </div>
                </>
              )}

            <div className="border shadow-sm drop-shadow-sm ring-offset-1 border-gray-400/20 rounded-sm h-max">
              <div className="py-5 px-6">
                <div className="flex justify-between flex-wrap">
                  <h3 className=" font-bold">Materi Belajar</h3>
                  {courseDetail?.userCourseId === null ? (
                    ""
                  ) : (
                    <div className=" flex flex-wrap items-center bg-gray-200 rounded-sm dark:bg-gray-700 h-full">
                      <p
                        className="bg-YELLOW05 whitespace-nowrap w-full p-1.5 text-sm font-medium text-white align-middle leading-none rounded-sm h-full px-4 z-0"
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
                        <span className=" font-bold text-BLUE05">
                          Chapter {moduleIndex + 1} - {module?.title}
                        </span>
                        <span className="font-medium whitespace-nowrap">
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
                                  courseDetail?.userCourseId,
                                  content?.isDemo
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
                                      <BiSolidLock
                                        className={"text-black/60"}
                                      />
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
      </div>
    </>
  );
};

export default DetailPage;
