import Start from "../../assets/star.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Verif from "../../assets/verif.svg";
import Type from "../../assets/type.svg";
import Module from "../../assets/module.svg";
import Taken from "../../assets/taken.svg";
import Time from "../../assets/jam.svg";
import { FaCrown } from "react-icons/fa";

const CardCourse = ({ data }) => {
  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(angka);
  };
  return (
    <Link to={`/detail/course/${data.id}`} className="relative">
      <div className="flex flex-col  bg-white rounded-lg border-2 m-auto mr-2 ml-2 mt-2 cursor-pointer max-w-sm ">
        <div className="rounded-t-lg">
          <img
            src={data.imageUrl}
            className="rounded-t-lg"
            style={{ aspectRatio: "3/2" }}
          />
        </div>
        <div className="flex flex-col mt-3 px-2 mb-3">
          <div className="flex flex-row justify-between font-Montserrat  text-sm ">
            <div className="flex flex-row gap-1">
              <p>by</p>
              <h3 className="">{data.instructor}</h3>
              <img src={Verif} />
            </div>
            <div className="flex flex-row gap-1 font-bold">
              <img src={Start} />
              <p>{data.rating}</p>
            </div>
          </div>
          <h3
            className="mt-1 font-Montserrat font-bold text-sm line-clamp-2 "
            style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {data.title}
          </h3>

          <div className="flex flex-row  font-Montserrat text-xs mt-2 font-normal">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex flex-row gap-1">
                <img src={Type} />
                <p>{data.level}</p>
              </div>
              <div className="flex flex-row gap-1">
                <img src={Module} />
                <p>{data.totalModule}</p>
                <p>Modul</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex flex-row gap-1">
                <img src={Taken} />
                <p>{data.taken}</p>
              </div>
              <div className="flex flex-row gap-1">
                <img src={Time} />
                <p>{data.duration}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row text-sm mt-2">
            {data.originalPrice !== data.totalPrice ? (
              <>
                <div className="flex flex-row gap-1">
                  <del className="text-red-500 ">
                    {formatRupiah(data.originalPrice)}
                  </del>
                  <span>{formatRupiah(data.totalPrice)}</span>
                </div>
              </>
            ) : (
              <span>{formatRupiah(data.originalPrice)}</span>
            )}
          </div>
        </div>
        <button className="absolute top-0 w-24 rounded-tl-[40px] rounded-br-[67px] h-7 flex justify-center items-center left-0 text-white">
          {data.type === "Free" ? (
            <>
              <div className="flex bg-[#FF5733] w-full h-full flex-row rounded-tl-[40px] rounded-br-[67px] gap-[3px] justify-center items-center text-sm">
                <FaCrown />
                <span>Gratis</span>
              </div>
            </>
          ) : data.isPromo === true ? (
            <>
              <div className="flex bg-[#F00] w-full h-full flex-row rounded-tl-[40px] rounded-br-[67px] gap-[3px] justify-center items-center text-sm">
                <FaCrown />
                <span>Diskon</span>
              </div>
            </>
          ) : data.taken >= 100 ? (
            <div className="flex bg-[#4CDF49] w-full h-full flex-row rounded-tl-[40px] rounded-br-[67px] gap-[3px] justify-center items-center text-sm">
              <FaCrown />
              <span>Best Seller</span>
            </div>
          ) : (
            ""
          )}
        </button>
      </div>
    </Link>
  );
};

CardCourse.propTypes = {
  data: PropTypes.object,
};

export default CardCourse;
