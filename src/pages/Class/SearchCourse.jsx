import { useState } from "react";
import CardPickCourse from "../../components/card/CardPopular";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";
import SearchChecklist from "../../components/checklist/SearchChecklist";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
const SearchCourse = () => {
  const [typeButton, setTypeButton] = useState("");
  const [searchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const { hasil } = useSelector((state) => state.course);
  const { data } = useSelector((state) => state.course);
  const { errors } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(true);

  const { nameCourse } = useParams();
  const [pageNumber, setPageNumber] = useState();
  const [autoPage, setAutoPage] = useState(false);

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
            <div className="flex flex-wrap justify-between mt-7 items-center md:sticky md:top-0 z-50  h-14 min-h-fullbg-white/30 backdrop-blur">
              <h1
                style={{
                  fontFamily: `montserrat`,
                }}
                className="text-2xl font-bold"
              >
                Cari Kelas
              </h1>

              <div className="md:w-auto">
                <div className="md:hidden text-blue-400 hover:text-blue-600 text-md">
                  <button onClick={addFilter}>filter....</button>
                </div>
              </div>
            </div>
            {/* bagian 2*/}
            <div className="md:flex mt-5  justify-between gap-20">
              <div className="block md:hidden md:w-auto w-full">
                {filter && (
                  <SearchChecklist
                    hasil={hasil}
                    typeButton={typeButton}
                    nameCourse={nameCourse}
                    setAutoPage={setAutoPage}
                    setLoading={setLoading}
                  />
                )}
              </div>
              <div className="hidden md:block w-72 ">
                <SearchChecklist
                  typeButton={typeButton}
                  hasil={hasil}
                  nameCourse={nameCourse}
                  setAutoPage={setAutoPage}
                  setLoading={setLoading}
                />
              </div>
              <div className="w-full mt-5 md:mt-0 drop-shadow-lg ">
                <div className="flex flex-row justify-between gap-x-5 sticky top-[9vh] ">
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
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 mt-4 mb-12 gap-2">
                    {errors && (
                      <div className="w-full md:w-[200%]">
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
                            <CardPickCourse key={item.id} data={item} />
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

export default SearchCourse;
