import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { filterData, myCheckbox } from "../../redux/actions/CourseActions";
import { useNavigate, useParams } from "react-router-dom";
import { setErrors, setMyCourse } from "../../redux/reducers/CourseReducer";

function MyChecklist({ hasil, status, setLoading, setAutoPage, pageNumber }) {
  const navigate = useNavigate();
  const checkboxesRef = useRef([]);
  const { filter } = useSelector((state) => state.course);
  const { errors } = useSelector((state) => state.course);
  const { nameCourse } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCheckboxes] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState([]);
  const [typeCourse, setTypeCourse] = useState([]);
  const [autoChecklist, setAutoChecklist] = useState(false);
  const handleTypeCourse = (value) => {
    setTypeCourse((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((item) => item !== value);
      } else {
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
    const categoryParams = selectedCategory
      .map((category) => `${category}`)
      .join("&");
    navigate(`/my-course/${categoryParams}`);
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
    setSelectedCheckboxes([]);
    handleChecklist(nameCourse);
  };
  const applyFilter = () => {
    dispatch(setErrors());
    if (nameCourse && !autoChecklist) {
      handlenamecourse();
      setAutoChecklist(true);
    }
    if (
      selectedCategory.length === 0 &&
      status == `` &&
      typeCourse.length === 0 &&
      selectedLevel.length === 0
    ) {
      handlemyCheckbox();
      setAutoPage(false);
    } else if (selectedCategory.length > 0) {
      handlemyCheckbox();
    } else if (selectedLevel.length > 0) {
      handlemyCheckbox();
    } else if (typeCourse.length > 0) {
      handlemyCheckbox();
    } else if (status) {
      handlemyCheckbox();
    }
  };
  const handlemyCheckbox = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 700);
    dispatch(
      myCheckbox(
        status,
        selectedCategory,
        selectedLevel,
        typeCourse,
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
    applyFilter();
    dispatch(filterData());
    if (selectedCategory.length > 0) {
      navigateToCourses();
    }
    if (errors) {
      dispatch(setMyCourse([]));
      setAutoPage(true);
    }
  }, [selectedCategory, selectedLevel, hasil, typeCourse, status, pageNumber]);

  return (
    <div
      style={{ backgroundColor: `white` }}
      className="w-full px-5 py-2.5 rounded-lg flex flex-col gap-y-2.5 h-max md:sticky top-[9vh] drop-shadow-xl"
    >
      <p className="font-bold text-sm">Filter</p>
      <ul>
        <li className="flex flex-row gap-3">
          <input
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            type="checkbox"
            className="border-inherit rounded-lg"
            checked={typeCourse.includes("latest")}
            onChange={() => handleTypeCourse("latest")}
          />
          <label className="font-Montserrat text-xs">Paling Baru</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={typeCourse.includes("popular")}
            onChange={() => handleTypeCourse("popular")}
          />
          <label className="font-Montserrat text-xs">Paling Populer</label>
        </li>
        <li className="flex flex-row gap-3">
          <input
            type="checkbox"
            className="border-inherit rounded-lg"
            ref={(element) => {
              checkboxesRef.current.push(element);
            }}
            checked={typeCourse.includes("promo")}
            onChange={() => handleTypeCourse("promo")}
          />
          <label className="font-Montserrat text-xs">Paling Promo</label>
        </li>
      </ul>

      <p className="font-bold text-sm">Kategori</p>
      <ul>
        {filter.map((item) => (
          <li className="flex flex-row gap-y-9 gap-x-3 " key={item.id}>
            <input
              type="checkbox"
              className="border-inherit rounded-lg"
              ref={(element) => {
                checkboxesRef.current.push(element);
              }}
              checked={selectedCategory.includes(item.slug)}
              onChange={() => handleChecklist(item.slug)}
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
      <button
        onClick={unCheckAll}
        className="rounded-lg text-red-600 font-Montserrat text-sm"
      >
        Hapus Filter
      </button>
    </div>
  );
}
MyChecklist.propTypes = {
  setHasil: PropTypes.func,
  setAutoPage: PropTypes.func,
  hasil: PropTypes.array,
  status: PropTypes.string,
  data: PropTypes.array,
  pageNumber: PropTypes.number,
  typeButton: PropTypes.string,
  linkFilter: PropTypes.string,
  setLoading: PropTypes.func,
};

export default MyChecklist;
