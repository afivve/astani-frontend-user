import { useState } from "react";
// import { useParams } from "react-router-dom";
import Checklist from "../../components/checklist/Checklist";
import Search from "../../assets/search.svg";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import CardCourse from "../../components/card/CardPopular";

const Course = () => {
  const [typeButton, setTypeButton] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const { hasil } = useSelector((state) => state.course);
  const { data } = useSelector((state) => state.course);
  const { errors } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(true);

  const { nameCourse } = useParams();
  const linkFilter = `courses`;
  const [pageNumber, setPageNumber] = useState();
  const [autoPage, setAutoPage] = useState(false);

  // useEffect(() => {
  //   if (pageNumber == null) {
  //     setPageNumber(1);
  //   }
  //   dispatch(getCourse(pageNumber));
  // }, [typeButton, pageNumber]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  const addFilter = () => {
    setFilter(!filter);
  };

  const handleClick = (value) => {
    setTypeButton(value);
  };
  return (
    <>
      <div className="bg-WHITE05 min-h-screen flex justify-center w-full">
        <div className="container w-full">
          <div className=" mx-auto container w-auto">
            <div className="flex flex-wrap justify-between mt-7 items-center md:sticky md:top-0 z-50  h-14 min-h-full backdrop-blur">
              <h1
                style={{
                  fontFamily: `montserrat`,
                }}
                className="text-2xl font-bold"
              >
                Topik Kelas
              </h1>

              <div className="md:w-auto">
                <div className="border-DARKBLUE05 w-full hidden md:block">
                  <div className="flex flex-row">
                    <input
                      type="search"
                      placeholder="Cari Kelas"
                      className="w-full outline-none  px-4 py-[6px] border-2 rounded-2xl border-[#6148FF]"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <button
                      type="submit"
                      className="absolute bottom-1/2 right-2 translate-y-1/2 rounded-lg bg-[#6148FF] p-1"
                    >
                      <img src={Search} />
                    </button>
                  </div>
                </div>
                <div className="md:hidden text-blue-400 hover:text-blue-600 text-md">
                  <button onClick={addFilter}>filter....</button>
                </div>
              </div>
            </div>
            {/* bagian 2*/}
            <div className="md:flex mt-5  justify-between gap-20">
              <div className="block md:hidden md:w-auto w-full">
                {filter && (
                  <Checklist
                    hasil={hasil}
                    typeButton={typeButton}
                    linkFilter={linkFilter}
                    nameCourse={nameCourse}
                    setAutoPage={setAutoPage}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    setLoading={setLoading}
                  />
                )}
              </div>
              <div className="hidden md:block w-72 ">
                <Checklist
                  typeButton={typeButton}
                  hasil={hasil}
                  linkFilter={linkFilter}
                  nameCourse={nameCourse}
                  setAutoPage={setAutoPage}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                  setLoading={setLoading}
                />
              </div>
              <div className="w-full mt-5 md:mt-0 drop-shadow-lg ">
                <div className="flex flex-row justify-between gap-x-5 sticky top-[9vh] z-50">
                  <button
                    className={`rounded-2xl px-2 md:px-4 py-2 w-1/5 hover:bg-YELLOW05 hover:text-white font-semibold text-slate-400 ${
                      typeButton == "" ? "bg-YELLOW05 text-white" : "bg-white"
                    }`}
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(``)}
                  >
                    All
                  </button>
                  <button
                    className={`rounded-2xl px-2 md:px-4 py-2 w-3/5 hover:bg-YELLOW05 hover:text-white font-semibold text-slate-400  ${
                      typeButton == "Premium"
                        ? "bg-YELLOW05 text-white"
                        : "bg-white"
                    }`}
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`Premium`)}
                  >
                    Kelas Premium
                  </button>
                  <button
                    className={`rounded-2xl px-2 md:px-4 py-2 w-3/5 hover:bg-YELLOW05 hover:text-white font-semibold text-slate-400  ${
                      typeButton == "Free"
                        ? "bg-YELLOW05 text-white"
                        : "bg-white"
                    }`}
                    style={{ fontFamily: `montserrat` }}
                    onClick={() => handleClick(`Free`)}
                  >
                    Kelas Gratis
                  </button>
                </div>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="grid md:grid-cols-3 grid-cols-1 mt-4 mb-12 gap-2">
                    {errors && (
                      <div className="w-full md:w-[310%]">
                        <label className="flex justify-center bg-blue-100 rounded p-3 font-bold text-gray-600">
                          {errors}
                        </label>
                      </div>
                    )}
                    {errors == null &&
                      data
                        .filter((item) => {
                          if (searchTerm === "") {
                            return item;
                          } else if (
                            item.title
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ||
                            item.category
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item) => (
                          <div className=" w-full " key={item.id}>
                            <CardCourse key={item.id} data={item} />
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

export default Course;
