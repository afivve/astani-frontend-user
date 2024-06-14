import { useDispatch, useSelector } from "react-redux";
import chat from "../../assets/chating.svg";
import galery from "../../assets/galery.svg";
import { useEffect, useState } from "react";
import {
  addComment,
  getDetailDiscussion,
} from "../../redux/actions/CourseActions";
import { useParams } from "react-router-dom";
import { useRef } from "react";
export default function DetailDiscussion() {
  const { getData } = useSelector((state) => state.course);
  const { detailDiscussion } = useSelector((state) => state.course);
  const { comentar } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { discussionId } = useParams();
  const img = useRef();
  const [image, setImage] = useState(null);
  const [hasil, setHasil] = useState(null);
  const [jawaban, setJawaban] = useState("");
  const [errors, setErrors] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (jawaban === "") {
      setErrors("Jawaban tidak boleh kosong");
    }
    if (jawaban != "") {
      dispatch(addComment(jawaban, image, id, discussionId));
    }
    if (jawaban == "" && image == null) {
      setErrors("Jawaban atau gambar tidak boleh kosong");

      setTimeout(() => {
        setErrors("");
      }, 2000);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setHasil(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (id) {
      dispatch(getDetailDiscussion(id, discussionId));
    }
  }, [dispatch, discussionId, id]);
  return (
    <div>
      <div className="justify-center flex bg-gradient-to-r bg-white/40 drop-shadow-lg">
        <div className="container m-8">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center gap-5">
              <img className="w-20 fill-white" src={chat} alt="" />
              <div>
                <div className="text-gray-800 text-2xl font-bold">
                  {getData.courseDiscussionName}
                </div>

                <h3 className="text-gray-800 text-xl font-semibold">
                  Selamat Datang Di Forum Diskusi Kelas
                </h3>
                <p className="text-gray-600">Konsultasi seputar materi anda</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center m-3">
          <div className="container">
            <div className="flex justify-between">
              <div className="flex flex-row items-center gap-3">
                <img
                  src={detailDiscussion.userPhoto}
                  className="w-10 rounded-full bg-blue-200 object-top object-cover h-10"
                  alt=""
                />
                <h3 className="font-semibold text-xl">
                  {detailDiscussion.username}
                </h3>
                <p className="font-gray-100 text-xs">
                  {new Date(detailDiscussion.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                {detailDiscussion.closed ? (
                  <p className="text-xs p-1 text-green-600 rounded-lg border-green-500 border-2 bg-green-200">
                    Selesai
                  </p>
                ) : (
                  <p className="text-xs p-1 text-gray-600 rounded-lg border-gray-500 border-2 bg-gray-200">
                    Pembahasan
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="font-semibold text-xl mt-3">
                {detailDiscussion.title}
              </p>
              <p className="font-sm text-current text-xl mt-2">
                {detailDiscussion.question}
              </p>
              <img
                src={detailDiscussion.urlPhoto}
                className="flex self center max-w-[75%]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 border-b-2 border-gray-200"></div>
      <div className="flex justify-center">
        {detailDiscussion.closed == true && (
          <div className="font-bold text-lg text-gray-400">
            Comentar ditutup
          </div>
        )}
        {detailDiscussion.closed == false && (
          <div className="container">
            <div className="flex flex-row items-center gap-3">
              <img
                src={user?.photoProfile}
                className="w-10 rounded-full bg-blue-200 object-top object-cover h-10"
                alt=""
              />
              <h3 className="font-semibold text-xl">{user?.name}</h3>
            </div>
            <div>
              <div
                action=""
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              >
                <label htmlFor="imageInput" className="cursor-pointer ">
                  <div className="flex flex-row items-center">
                    <img
                      src={galery}
                      className="w-8"
                      alt="Select from Gallery"
                    />
                    <p className="text-gray-400 font-semibold">
                      Tambahkan Gambar (png,jpg,svg...)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id="imageInput"
                    ref={img}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {hasil && (
                  <div className="mb-4">
                    <img
                      src={hasil}
                      alt="Preview"
                      className="w-[25%] h-auto rounded-lg"
                    />
                  </div>
                )}
                <input
                  type="text"
                  id=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                  placeholder="Type Something"
                  value={jawaban}
                  onChange={(e) => setJawaban(e.target.value)}
                />
                {jawaban == "" && (
                  <p className="text-red-500 font-bold my-2 p-1">{errors}</p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <button
                    type="submit"
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleSave}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="my-5 border-b-2 border-gray-200"></div>
      <div className="flex justify-center">
        <div className="container">
          <div className="mb-5">
            <div className="flex flex-col gap-3">
              {comentar.map((item) => (
                <div key={item.commentarId}>
                  <div className="border-2 p-5 rounded-lg">
                    <div className="flex justify-between">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center gap-3">
                          <img
                            className="w-10 rounded-full bg-blue-200 object-top object-cover h-10"
                            src={item.userPhoto}
                            alt=""
                          />
                          <h3 className="font-semibold text-lg">
                            {item.username}
                          </h3>
                          <p className="font-gray-100 text-xs">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          {item.instructorId === null ? (
                            <p className="text-xs font-semibold bg-yelow-200 p-1 rounded-lg border-2 border-YELLOW05">
                              user
                            </p>
                          ) : (
                            <p className="text-xs font-semibold bg-blue-200 p-1 rounded-lg border-2 border-blue-600">
                              instructor
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="font-sm text-current">{item.commentar}</p>
                      <img src={item.urlPhoto} className="max-w-[40%]" alt="" />
                    </div>
                    <div className="flex flex-wrap mt-6 gap-5">
                      <img
                        className="w-[50%]"
                        src={item.photoCommentar}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
