import PeopleHome from "../../../assets/farmer.png";
import "react-multi-carousel/lib/styles.css";
import "../../../utils/CssConfig.css";
import { Link } from "react-router-dom";
import chat from "../../../assets/chating.svg";
import CourseIcon from "../../../assets/identify.png";
import Footer from "../../../components/Navbar/Footers";
import Header from "../../../components/Navbar/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { TopicDiscussionData } from "../../../redux/actions/CourseActions";

const HomePage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { topicDiscussion } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(TopicDiscussionData());
  }, [dispatch]);

  // const handleNavigate = (id) => {
  //   navigate(`/detailDiscussion/${id}`);
  // };
  return (
    <>
      <Header />
      <div className="mx-auto">
        {/* bagian 1 di homepage */}
        <div className="mx-auto flex flex-col lg:flex-row container ">
          <div className="lg:w-[60%]  py-14 flex flex-col w-full  gap-4 ">
            <div>
              <p className="font-bold text-4xl text-BLUE05 font-Montserrat">
                {" "}
                Sahabat Petani,
              </p>
              <p className="font-bold text-4xl text-BLUE05 font-Montserrat">
                {" "}
                Solusi Masa Kini
              </p>
            </div>

            <div className="font-Montserrat text-sm text-justify max-w-lg">
              AsTani hadir dengan sepenuh hati untuk mendampingi petani dalam setiap
              langkahnya. Kami berkomitmen untuk menjadi sahabat terbaik mereka, dengan
              membawa teknologi dan inovasi tepat guna.
            </div>
          </div>
          <div className=" flex lg:w-[40%] ">
            <div className="flex flex-col justify-center lg:gap-4 pl-4 lg:pl-0 gap-2 w-full">
              <img src={PeopleHome} />
            </div>
          </div>
        </div>

        {/* Bagian Kategori Belajar */}
        <div className=" flex mx-auto justify-center bg-WHITE05">
          <div className="flex w-full flex-col pt-[26px] gap-5 container">
            <div className="flex flex-row justify-between "></div>
          </div>
        </div>
      </div>

      <div className="bg-LightBlue5 flex justify-center ">
        <div className="mx-auto flex flex-col lg:flex-row container justify-center">
          <div className="lg:w-[60%] py-7 flex flex-col w-full gap-4 ">
            <div className=" font-bold text-2xl text-BLUE05 font-Montserrat text-center">
              Gunakan Kamera Untuk Identifikasi Penyakit
            </div>
            <div className="flex flex-col justify-center lg:gap-4 pl-4 lg:pl-0 gap-2 w-full">
              <img src={CourseIcon} />
            </div>
            <div className="flex flex-row mx-auto gap-3">
              <Link
                to="/identifikasi"
                className="border-2 text-xl text-white py-2 px-5 font-semibold bg-GREEN01 rounded-xl flex flex-row items-center gap-1"
              >
                Coba Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col py-16  items-center">
        <div className="text-center">
          <h1 className="font-bold text-2xl">Forum Diskusi Teratas</h1>
        </div>
      <div className="container grid lg:grid-cols-3  md:grid-cols-2 grid-cols-1 py-16 gap-6">
        {topicDiscussion.map((item) => (
          <div key={item.id}>
            <div className="bg-[#F1F5F8] rounded-md h-full   p-5 gap-5">
              <div className="flex justify-between">
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row gap-3">
                    <img
                      className="w-8 rounded-full bg-blue-200 object-top object-cover h-8"
                      src={item.photoProfile}
                      alt=""
                    />
                    <h3 className="font-semibold text-lg">{item.username}</h3>
                  </div>

                  <div>
                    <span className="text-sm">{item.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <p className="font-semibold">{item.title}</p>
                <p className="font-sm text-current">{item.question}</p>
              </div>
              <div className="flex flex-wrap mt-6 gap-5">
                <div className="flex flex-row gap-1 items-center font-semibold">
                  <img className="w-5" src={chat} alt="" />
                  <Link to={`/detailDiscussion/${item.id}`}>
                    <p className="text-gray-500">{item.totalComments} Pembahasan</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      <div className="drop-shadow-xl">
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
