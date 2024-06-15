import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { convertDateFormat } from "../../utils/FormatDate";

const CardHistoryIdentify = ({ data }) => {
  return (
    <Link
      to=""
      className="w-full flex md:flex-row flex-col justify-between border-4 rounded-md border-GREEN01 py-6 px-6 "
    >
      <div className="flex md:flex-row flex-col w-full h-full">
        <div className="flex justify-center">
          <img src={data.imageUrl} className="h-32 w-[300px] rounded-md" />
        </div>
        <div className="flex flex-col justify-center md:ml-6 w-full h-full  mt-4 lg:mt-0">
          <div className="flex md:flex-row flex-col">
            <span className="lg:w-[30%] xl:w-[20%] md:w-[40%]  text-lg text-center md:text-start">
              Hasil Identifikasi
            </span>
            <span className="w-[1%] text-lg hidden md:block">:</span>
            <span className="text-lg text-center"> {data.diseaseName}</span>
          </div>
          <div className="flex md:flex-row flex-col w-full mt-2 ">
            <span className="lg:w-[30%] xl:w-[20%] md:w-[40%] text-lg text-center  md:text-start">
              Akurasi
            </span>
            <span className="w-[1%] text-lg hidden md:block">:</span>
            <span className="text-lg text-center"> {data.confidence}%</span>
          </div>
        </div>
      </div>
      <div className="h-full flex justify-between md:flex-col flex-row mt-10 md:mt-0">
        <div className="flex justify-start w-full h-full">
          {convertDateFormat(data.createdAt)}
        </div>
        <Link to={`/detail-identifikasi/${data.historyId}`} className="flex items-end  ">
          <button className="flex flex-row items-center justify-center  border-b-2 border-black ">
            <span className="font-bold ">Selengkapnya</span>
            <FaArrowRight className="ml-2" />
          </button>
        </Link>
      </div>
    </Link>
  );
};
CardHistoryIdentify.propTypes = {
  data: PropTypes.object,
};

export default CardHistoryIdentify;
