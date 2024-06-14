import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function Pagination({ autoPage, setPageNumber, pageNumber }) {
  const { page } = useSelector((state) => state.course);

  const { totalPage } = useSelector((state) => state.course);
  const handlePage = (value) => {
    setPageNumber(value);
  };
  return (
    <div>
      {" "}
      {!autoPage && (
        <nav
          aria-label="Page navigation example "
          className="my-10 flex justify-center"
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              {pageNumber > 1 && (
                <button
                  onClick={() =>
                    setPageNumber((prevPageNumber) => prevPageNumber - 1)
                  }
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              )}
            </li>
            {page.map((item) => (
              <li key={item}>
                <button
                  className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${
                    pageNumber === item
                      ? "text-white bg-blue-500 hover:bg-blue-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
                      : "text-gray-500 bg-white hover:bg-blue-400 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white "
                  }`}
                  onClick={() => handlePage(item)}
                >
                  {item}
                </button>
              </li>
            ))}
            <li>
              {pageNumber<totalPage && (
                <button
                  onClick={() =>
                    setPageNumber((prevPageNumber) => prevPageNumber + 1)
                  }
                  className="px-[24px] flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
Pagination.propTypes = {
  autoPage: PropTypes.bool,
  setPageNumber: PropTypes.func,
  pageNumber: PropTypes.number,
};

export default Pagination;
