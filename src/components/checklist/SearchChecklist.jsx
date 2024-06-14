import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filterData, searchCheckbox } from "../../redux/actions/CourseActions";
import typeCourseData from "../../data/TypeCourseData";
import { setData, setErrors } from "../../redux/reducers/CourseReducer";

function SearchChecklist({ typeButton, nameCourse, setAutoPage, setLoading }) {
  const checkboxesRef = useRef([]);
  const { data } = useSelector((state) => state.course);
  const { errors } = useSelector((state) => state.course);
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

  // const navigateToCourses = () => {
  //   const categoryParams = selectedCheckboxes
  //     .map((category) => `${category}`)
  //     .join("&");
  //   // const levelParams = selectedLevel
  //   //   .map((level) => `level=${level}`)
  //   //   .join("&");
  //   navigate(`/course/${categoryParams}`);
  //   // const queryParams = [categoryParams, levelParams].filter(Boolean).join("&");

  //   // navigate(`/course/${queryParams}`);
  // };

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
    if (nameCourse == "populer") {
      setTypeCourse([]);
      handleTypeCourse("popular");
    } else {
      setSelectedCheckboxes([]);
      handleChecklist(nameCourse);
    }
  };

  const applyFilter = () => {
    dispatch(setErrors());
    if (nameCourse && !autoChecklist) {
      handlenamecourse();
      setAutoChecklist(true);
    }
    if (errors) {
      dispatch(setData([]));
    }
    if (
      selectedCheckboxes.length === 0 &&
      selectedLevel.length === 0 &&
      typeButton === "" &&
      typeCourse.length === 0
    ) {
      setAutoPage(false);
      // navigate("/course");
    } else if (
      selectedCheckboxes.length === 0 &&
      typeButton &&
      selectedLevel.length === 0 &&
      typeCourse.length === 0
    ) {
      const filter = data.filter((item) => item.type === typeButton);
      dispatch(setData(filter));
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
    setAutoPage(true);
    dispatch(searchCheckbox(typeButton, selectedLevel, typeCourse, nameCourse));
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
    applyFilter();
    dispatch(filterData());
  }, [
    selectedCheckboxes,
    selectedLevel,
    setData,
    typeCourse,
    nameCourse,
    typeButton,
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
SearchChecklist.propTypes = {
  data: PropTypes.array,
  typeButton: PropTypes.string,
  linkFilter: PropTypes.string,
  errors: PropTypes.func,
  nameCourse: PropTypes.string,
  setAutoPage: PropTypes.func,
  setLoading: PropTypes.func,
};

export default SearchChecklist;
