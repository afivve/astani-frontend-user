import CardHistoryIdentify from "../../../components/card/CardHistoryIdentify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { HistoryIdentify } from "../../../redux/actions/IdentifyActions";

const HistoryIndetify = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { historyIdentify } = useSelector((state) => state.identify);

  useEffect(() => {
    if (token) {
      dispatch(HistoryIdentify());
    }
  }, [dispatch, token]);
  return (
    <div className="w-full flex justify-center py-10">
      <div className="container">
        <div className="font-bold text-2xl w-full text-center">
          <h1>RIWAYAT HASIL IDENTIFIKASI</h1>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4">
          {historyIdentify.length === 0 ? (
            <p className="text-center font-semibold">Belum ada riwayat</p>
          ) : (
            historyIdentify.map((data) => (
              <CardHistoryIdentify key={data.id} data={data} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryIndetify;
