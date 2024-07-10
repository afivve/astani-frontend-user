import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DetailIndentify } from "../../../redux/actions/IdentifyActions";
import Circle from "react-circle";
import Header from "../../../components/Navbar/Header";

const DetailIdentify = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { token } = useSelector((state) => state.auth);
  const { detailIdentify } = useSelector((state) => state.identify);

  useEffect(() => {
    if (token) {
      dispatch(DetailIndentify(id));
    }
  }, [dispatch, token, id]);

  return (
    <>
      <Header />
      <div className="w-full justify-center flex py-10">
        <div className="container flex flex-col  items-center">
          <div className="flex justify-center flex-col ">
            <div className="text-center font-bold text-3xl">
              <h1> DETAIL RIWAYAT IDENTIFIKASI PENYAKIT</h1>
            </div>
            <div className="mt-10 flex justify-center">
              <img src={detailIdentify?.imageUrl} className="w-[600px]" />
            </div>
          </div>
          <div className="flex flex-col mt-14 w-full">
            <div className="flex flex-col justify-center items-center w-full ">
              <div className="text-2xl font-bold">
                <h1>Hasil Identifikasi:</h1>
              </div>
              <div className="flex flex-col mt-4  ">
                <div className="w-full">
                  <Circle
                    progress={detailIdentify?.confidence}
                    lineWidth={50}
                    textColor="black"
                    bgColor="black"
                    progressColor="#10B981"
                  />
                </div>
                <span className="text-center w-full mt-4 font-bold">
                  {detailIdentify?.diseaseName}
                </span>
              </div>
            </div>

            <div className="flex flex-col mt-10 gap-4">
              <div className="flex flex-row">
                <div className="w-[40%] font-bold ">Penyebab :</div>
                <div className="w-[60%]">{detailIdentify?.symtomps}</div>
              </div>
              <div className="flex flex-row  ">
                <div className="w-[40%] font-bold">Gejala :</div>
                <div className="w-[60%]">{detailIdentify?.caused}</div>
              </div>
              <div className="flex flex-row ">
                <div className="w-[40%] font-bold">Penanganan :</div>
                <div className="w-[60%]">
                  {detailIdentify?.solutions?.map((data) => (
                    <div key={data.id}>* {data.action}</div>
                  ))}
                </div>
              </div>
              <div className="flex sm:flex-row flex-col">
                <div className="w-[40%] font-bold">Rujukan :</div>
                <div className="sm:w-[60%]">
                  {detailIdentify?.literaturs?.map((data) => (
                    <div key={data.id}>
                      <a
                        href={data.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold"
                      >
                        *
                      </a>{" "}
                      {data.link}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex sm:flex-row flex-col ">
                <div className="w-[40%] font-bold">Youtube</div>
                <div className="sm:w-[60%]">
                  <div className="grid lg:grid-cols-2  w-full gap-4">
                    {detailIdentify?.youtubes?.map((data) => (
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
              {/* <div className="flex flex-row items-center">
              <div className="w-[40%] font-bold">Rujukan</div>
              <div className="w-[60%]">
                {Result.value.literatures.map((data) => (
                  <div key={data.id}>* {data.link}</div>
                ))}
              </div>
            </div> */}
            </div>
            {/* <div className="flex flex-row w-full">
            <div className="w-[40%]">
              <div>Penyebab</div>
              <div>Gejala</div>
              <div>Penanganan</div>
              <div>Rujukan</div>
              <div>YouTube Link</div>
            </div>
            <div className="w-[60%]"></div>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailIdentify;
