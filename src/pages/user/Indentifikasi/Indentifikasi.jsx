import { FaHistory } from "react-icons/fa";
import { PenyakitIndetifikasi } from "../../../data/DataPenyakit";
import Image from "../../../assets/image.svg";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import Result from "../../data/result.json";
import Circle from "react-circle";
import { Link } from "react-router-dom";
import { Indentify } from "../../../redux/actions/IdentifyActions";
import Header from "../../../components/Navbar/Header";

const Indentifikasi = () => {
  const dispatch = useDispatch();
  const img = useRef();

  const [file, setFile] = useState(null);
  const [fileObj, setFileObj] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  // console.log(fileObj);

  const { token } = useSelector((state) => state.auth);
  const { identify } = useSelector((state) => state.identify);

  // const { file, fileObj } = useSelector((state) => state.image);

  const handleIndentifikasi = () => {
    if (token && fileObj && setLoading) {
      const formData = new FormData();
      formData.append("file", fileObj);
      dispatch(Indentify(fileObj, setLoading));
    } else {
      setAlert("Silahkan Upload Gambar Terlebih Dahulu");
    }
  };

  const handleUploadImage = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(URL.createObjectURL(uploadedFile));
    setFileObj(uploadedFile);

    setAlert(null);
  };

  return (
    <>
      <Header />
      <div className="w-full justify-center flex sm:py-10  mb-24 sm:mb-0">
        <div className="container flex flex-col  items-center">
          <Link
            to="/history"
            className="flex flex-row justify-end self-end items-center gap-2"
          >
            <FaHistory className="w-4" />
            <span>Riwayat</span>
          </Link>
          <div className="flex justify-center flex-col  mt-6 md:mt-0">
            <div className="text-center font-bold text-3xl">
              <h1> IDENTIFIKASI PENYAKIT</h1>
            </div>
            <div className="mt-10 flex justify-center">
              <img src={file === null ? Image : file} className="w-[600px]" />
            </div>
            <div className="flex flex-row mt-6 gap-6 justify-between">
              <button
                onClick={() => img.current.click()}
                className="bg-GREEN01 py-2 px- w-full text-white rounded-2xl"
              >
                UPLOAD FOTO
                <input
                  type="file"
                  className="h-4 w-4"
                  ref={img}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleUploadImage}
                />
              </button>
              <button
                onClick={handleIndentifikasi}
                className="bg-GREEN01 py-2 px-4 w-full text-white rounded-2xl"
              >
                {loading === true ? "Loading..." : "IDENTIFIKASI"}
              </button>
            </div>
            {alert && <div className="text-center mt-2 text-red-500">{alert}</div>}
            <div className="flex flex-col mt-6 justify-center items-center gap-2">
              <div>Penyakit Yang Dapat Diindentifikasi:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:grid-cols-4">
                {PenyakitIndetifikasi.map((data) => (
                  <div key={data.id}>
                    <div className="flex flex-row items-center gap-1">
                      <div className="h-3 w-3 bg-GREEN01"></div>
                      <div>{data.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {identify && identify.name ? (
            <div className="flex flex-col mt-14 w-full">
              <div className="flex flex-col justify-center items-center w-full">
                <div className="text-2xl font-bold">
                  <h1>Hasil Identifikasi:</h1>
                </div>
                <div className="flex flex-col mt-4">
                  <div>
                    <Circle
                      progress={identify.confidence} // assuming confidence is a fraction
                      lineWidth={50}
                      textColor="black"
                      bgColor="black"
                      progressColor="#10B981"
                    />
                  </div>
                  <span className="text-center w-full mt-4 font-bold">
                    {identify?.name}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-10 gap-4">
                <div className="flex sm:flex-row flex-col">
                  <div className="w-[40%] font-bold">Penyebab :</div>
                  <div className="sm:w-[60%]">{identify?.symtomps}</div>
                </div>
                <div className="flex sm:flex-row flex-col">
                  <div className="w-[40%] font-bold">Gejala :</div>
                  <div className="sm:w-[60%]">{identify?.caused}</div>
                </div>
                <div className="flex sm:flex-row flex-col">
                  <div className="w-[40%] font-bold">Penanganan :</div>
                  <div className="sm:w-[60%]">
                    {identify?.solutions?.map((data) => (
                      <div key={data.id}>
                        <a className="font-bold ">*</a> {data.action}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col">
                  <div className="w-[40%] font-bold">Rujukan  :</div>
                  <div className="sm:w-[60%]">
                    {identify?.literaturs?.map((data) => (
                      <div key={data.id}>
                        {" "}
                        <a className="font-bold ">*</a> {data.link}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col ">
                  <div className="w-[40%] font-bold">Youtube  :</div>
                  <div className="sm:w-[60%]">
                    <div className="grid lg:grid-cols-2  w-full gap-4">
                      {identify?.youtubes?.map((data) => (
                        <div key={data.id}>
                          <iframe
                            className="w-full aspect-video rounded-md bg-black"
                            src={`https://www.youtube.com/embed/${data.link}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          ></iframe>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Indentifikasi;
