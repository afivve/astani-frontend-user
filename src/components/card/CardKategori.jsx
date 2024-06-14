import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardKategori = ({ data }) => {
  return (
    <Link as={Link} to={`/course/${data.slug}`}>
      <div className="flex flex-col justify-center px-1 ">
        <img
          src={data.urlPhoto}
          className="rounded-3xl"
          style={{ aspectRatio: "3/2" }}
        />
        <div className="text-black font-Montserrat font-semibold text-xs py-3 self-center">
          {data.name}
        </div>
      </div>
    </Link>
  );
};

CardKategori.propTypes = {
  data: PropTypes.object,
};

export default CardKategori;
