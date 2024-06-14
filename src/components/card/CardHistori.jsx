import PropTypes from "prop-types";
import Premium from "../../assets/diamond.svg";

const CardHistori = ({ data }) => {
  const { courses } = data;

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(angka);
  };

  return (
    <div className="mt-2 flex flex-row  bg-[#F9F9F9] rounded-lg m-auto shadow-lg  w-full justify-star gap-4">
      <img
        style={{ aspectRatio: "3/2" }}
        src={courses.imageUrl}
        className="lg:w-40 lg:h-full w-32 rounded-l-lg self-center"
      />
      <div className="flex flex-col mt-3 mb-3 w-full pr-4">
        <div className="flex flex-row justify-between font-Montserrat font-bold text-sm ">
          <h3 className="text-DARKBLUE05">{courses.name}</h3>
        </div>
        <h3
          className="mt-1 font-Montserrat font-bold text-sm line-clamp-2 "
          style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}
        >
          {data.description}
        </h3>
        <p className="my-1 font-Montserrat font-normal text-xs flex flex-row gap-2">
          <p>by</p>
          {courses.instructor}
        </p>
        <div className="text-sm font-Montserrat font-bold">
          {formatRupiah(data.price)}
        </div>
        <div
          className={`flex flex-row max-w-fit gap-2 px-6 py-1 rounded-[4px] font-Montserrat text-xs font-bold mt-3 ${
            data.status === "Success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <div className="flex flex-row gap-1">
            <img src={Premium} />
          </div>
          {data.status}
        </div>
      </div>
    </div>
  );
};

CardHistori.propTypes = {
  data: PropTypes.object,
};

export default CardHistori;
