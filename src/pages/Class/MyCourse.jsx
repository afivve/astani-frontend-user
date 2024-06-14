import { useState, useEffect } from "react";
import MyChecklist from "../../components/checklist/MyChecklist";
import CardCourse from "../../components/card/CardCourse";
import Search from "../../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourse } from "../../redux/actions/CourseActions";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Pagination from "../../components/pagination/Pagination";

const MyCourse = () => {
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const { hasil } = useSelector((state) => state.course);
  const { myCourse } = useSelector((state) => state.course);
  const { errors } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const linkFilter = `user-courses`;
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState();
  const [autoPage, setAutoPage] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  const addFilter = () => {
    setFilter(!filter);
  };

  const handleClick = (value) => {
    setStatus(value);
  };

  useEffect(() => {
    dispatch(getMyCourse(errors));
  }, [status]);
  return (
    <>
      <div className="bg-WHITE05 min-h-screen flex justify-center w-full">
        <div className="container">
          <div className="container mx-auto w-auto">
            <div className="flex flex-wrap justify-between mt-7 items-center md:sticky md:top-0 z-50 h-14 min-h-full  backdrop-blur">
              <h1
                style={{
                  fontFamily: `montserrat`,
                }}
                className="text-2xl font-bold "
              >
                Kelas Berjalan
              </h1>

              <div className="md:w-auto">
                <div className=" border-blue-600 md:w-200 w-full  hidden md:block">
                  <form className="relative flex flex-row ">
                    <input
                      type="search"
                      placeholder="Cari Kelas"
                      className="w-full outline-none focus:outline-none px-4 py-[6px] border-2 rounded-2xl border-[#6148FF]"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <button
                      type="submit"
                      className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-[#6148FF] p-1"
                    >
                      <img src={Search} />
                    </button>
                  </form>
                </div>
                <div className="md:hidden text-blue-400 hover:text-blue-600">
                  <button onClick={addFilter}>filter....</button>
                </div>
              </div>
            </div>
            {/* bagian 2*/}
            <div className="md:flex  mt-6  justify-between gap-20">
              <div className="block md:hidden md:w-auto w-full">
                {filter && (
                  <MyChecklist
                    linkFilter={linkFilter}
                    hasil={hasil}
                    status={status}
                    setLoading={setLoading}
                    setAutoPage={setAutoPage}
                    pageNumber={pageNumber}
                  />
                )}
              </div>
              <div className="hidden md:block w-72">
                <MyChecklist
                  linkFilter={linkFilter}
                  hasil={hasil}
                  status={status}
                  setLoading={setLoading}
                  setAutoPage={setAutoPage}
                  pageNumber={pageNumber}
                />
              </div>
              <div className="w-full mt-5 md:mt-0 drop-shadow-lg">
                <div className="flex flex-row justify-between gap-x-5 sticky top-[9vh]">
                  <button
                    className={`rounded-2xl px-2 md:px-4 py-2 w-1/5 hover:bg-YELLOW05 hover:text-white font-semibold text-slate-400 ${
                      status == "" ? "bg-YELLOW05 text-white" : "bg-white"
                    }`}
                    onClick={() => handleClick(``)}
                  >
                    All
                  </button>
                  <button
                    className={`rounded-2xl px-2 md:px-4 py-2 w-3/5 hover:bg-YELLOW05 hover:text-white font-semibold text-slate-400 ${
                      status == "In Progress"
                        ? "bg-YELLOW05 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleClick(`In Progress`)}
                  >
                    Inprogress
                  </button>
                  <button
                    className={`rounded-2xl px-2 md:px-4 py-2 w-3/5 hover:bg-YELLOW05 hover:text-white font-semibold text-slate-400 ${
                      status == "Selesai"
                        ? "bg-YELLOW05 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleClick(`Selesai`)}
                  >
                    Selesai
                  </button>
                </div>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-4 mb-12 gap-2 ">
                    {errors && (
                      <div className="w-full md:w-[310%] ">
                        <label className="flex justify-center self-center bg-blue-100 rounded p-3 font-bold text-gray-600">
                          {errors}
                        </label>
                      </div>
                    )}
                    {errors == null &&
                      myCourse
                        .filter((item) => {
                          const data = item.courses;
                          if (searchTerm === "") {
                            return item;
                          } else if (
                            data.category
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item) => (
                          <div className="w-full" key={item.userCourseId}>
                            <CardCourse
                              key={item.id}
                              data={item.courses}
                              progress={item}
                            />
                          </div>
                        ))}
                  </div>
                )}
                <Pagination
                  autoPage={autoPage}
                  setPageNumber={setPageNumber}
                  pageNumber={pageNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourse;
