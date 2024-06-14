import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkbox, filterData } from "../../redux/actions/CourseActions";
import typeCourseData from "../../data/TypeCourseData";
import { setData, setErrors } from "../../redux/reducers/CourseReducer";

function Checklist({
  // hasil,
  typeButton,
  linkFilter,
  nameCourse,
  setAutoPage,
  pageNumber,
  setPageNumber,
  setLoading,
}) {
  const navigate = useNavigate();
  const checkboxesRef = useRef([]);
  const { filter } = useSelector((state) => state.course);
  const { errors } = useSelector((state) => state.course);
  const { data } = useSelector((state) => state.course);
  const { totalPage } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [typeCourse, setTypeCourse] = useState([]);
  // const navigate = useNavigate();
  const [autoChecklist, setAutoChecklist] = useState(false);

  const handleTypeCourse = (value) => {
    setTypeCourse((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
  };

  const handleChecklist = (value) => {
    setSelectedCheckboxes((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
  };

  const navigateToCourses = () => {
    const categoryParams = selectedCheckboxes
      .map((category) => `${category}`)
      .join("&");
    // const levelParams = selectedLevel
    //   .map((level) => `level=${level}`)
    //   .join("&");
    navigate(`/course/${categoryParams}`);
    // const queryParams = [categoryParams, levelParams].filter(Boolean).join("&");

    // navigate(`/course/${queryParams}`);
  };

  const handleLevel = (value) => {
    setSelectedLevel((prevSelected) => {
      if (prevSelected.includes(value)) {
        // If value is already in the array, remove it
        return prevSelected.filter((item) => item !== value);
      } else {
        // Otherwise, add it to the array
        return [...prevSelected, value];
      }
    });
  };
  const handleAllLevel = () => {
    setSelectedLevel([]);
    handleLevel("Beginner");
    handleLevel("Advanced");
    handleLevel("Intermediate");
  };

  const handlenamecourse = () => {
    if (nameCourse === "populer") {
      setTypeCourse([]);
      handleTypeCourse("popular");
    } else if (nameCourse === "promo") {
      setTypeCourse([]);
      handleTypeCourse("promo");
    } else {
      setSelectedCheckboxes([]);
      handleChecklist(nameCourse);
    }
  };

  const applyFilter = () => {
    // if (selectedCheckboxes.length === 0) {
    //   navigate("/course");
    // }
    dispatch(setErrors());
    if (nameCourse && !autoChecklist) {
      handlenamecourse();
      setAutoChecklist(true);
    }
    if (errors) {
      dispatch(setData([]));
      setAutoPage(true);
    }
    if (
      selectedCheckboxes.length === 0 &&
      selectedLevel.length === 0 &&
      typeButton === "" &&
      typeCourse.length === 0
    ) {
      handlecheckbox();
      dispatch(setData(data));
      setAutoPage(false);
      // navigate("/course");
    } else if (
      selectedCheckboxes.length === 0 &&
      typeButton &&
      selectedLevel.length === 0 &&
      typeCourse.length === 0
    ) {
      handlecheckbox();
    } else if (selectedCheckboxes.length > 0) {
      handlecheckbox();
    } else if (selectedLevel.length > 0) {
      handlecheckbox();
    } else if (typeCourse.length > 0) {
      handlecheckbox();
    } else if (typeButton) {
      handlecheckbox();
    }
  };
  const handlecheckbox = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
    dispatch(
      checkbox(
        typeButton,
        selectedCheckboxes,
        selectedLevel,
        typeCourse,
        linkFilter,
        pageNumber
      )
    );
  };

  const unCheckAll = () => {
    checkboxesRef.current.forEach((checkbox) => {
      checkbox.checked = false;
      setSelectedCheckboxes([]);
      setSelectedLevel([]);
      setTypeCourse([]);
    });
  };

  useEffect(() => {
    if (selectedCheckboxes.length > 0) {
      navigateToCourses();
    }
    if (pageNumber == null || pageNumber > totalPage) {
      setPageNumber(1);
    }
    applyFilter();
    dispatch(filterData());
  }, [
    selectedCheckboxes,
    selectedLevel,
    typeCourse,
    typeButton,
    pageNumber,
    totalPage,
  ]);

  return (
    <div
      style={{ backgroundColor: `white` }}
      className="w-full px-5 py-2.5 rounded-lg flex flex-col gap-y-2.5 h-max md:sticky top-[9vh] drop-shadow-xl"
    >
      <p className="font-bold text-sm">Filter</p>
      <ul>
        {typeCourseData.map((item) => (
          <li key={item.id} className="flex flex-row gap-3">
            <input
              ref={(element) => {
                checkboxesRef.current.push(element);
              }}
              type="checkbox"
              className="border-inherit rounded-lg"
              checked={typeCourse.includes(item.id)}
              onChange={() => handleTypeCourse(item.id)}
            />
            <label className="font-Montserrat text-xs">{item.label}</label>
          </li>
        ))}
      </ul>
      <p className="font-bold text-sm">Kategori</p>
      <ul>
        {filter.map((item) => (
          <li className="flex flex-row gap-y-9 gap-x-3 " key={item.id}>
            <input
              type="checkbox"
              className="border-inherit rounded-lg "
              ref={(element) => {
                checkboxesRef.current.push(element);
              }}
              checked={selectedCheckboxes.includes(item.slug)}
              onChange={() => handleChecklist(item.slug)}
              // style={{ backgroundColor: "#10b981" }}
            />
            <label className="font-Montserrat text-xs">{item.name}</label>
          </li>
        ))}
      </ul>
      <p className="font-bold text-sm">Level Kesulitan</p>
      <ul>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            onChange={() => handleAllLevel()}
          />
          <label className="font-Montserrat text-xs">Semua Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={selectedLevel.includes("Beginner")}
            onChange={() => handleLevel("Beginner")}
          />
          <label className="font-Montserrat text-xs">Beginner Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={selectedLevel.includes("Intermediate")}
            onChange={() => handleLevel("Intermediate")}
          />
          <label className="font-Montserrat text-xs">Intermediate Level</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={selectedLevel.includes("Advanced")}
            onChange={() => handleLevel("Advanced")}
          />
          <label className="font-Montserrat text-xs">Advanced Level</label>
        </li>
      </ul>
      <Link to={"/course"} className="flex justify-center">
        <button
          onClick={unCheckAll}
          className="rounded-lg text-red-600 font-Montserrat text-sm"
        >
          Hapus Filter
        </button>
      </Link>
    </div>
  );
}
Checklist.propTypes = {
  setHasil: PropTypes.func,
  setLoading: PropTypes.func,
  hasil: PropTypes.array,
  data: PropTypes.array,
  typeButton: PropTypes.string,
  linkFilter: PropTypes.string,
  errors: PropTypes.func,
  nameCourse: PropTypes.string,
  setAutoPage: PropTypes.func,
  setPageNumber: PropTypes.func,
  pageNumber: PropTypes.number,
};

export default Checklist;
