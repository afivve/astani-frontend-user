import ImageSucces from "../../assets/card_shopping.svg";
import { Link } from "react-router-dom";

const StatusSucces = () => {
  return (
    <div className=" flex justify-center  h-screen pt-12">
      <div className="md:w-[60%]   w-full  flex  justify-center ">
        <div className="  w-full items-center flex gap-8 flex-col">
          <h1 className=" font-bold text-center font-Montserrat text-3xl text-DARKBLUE05">
            Selamat
          </h1>
          <div className="flex justify-center ">
            <img src={ImageSucces} className="h-60  w-60" />
          </div>
          <div className="flex flex-col font-Montserrat gap-2">
            <p className="text-center text-base font-bold">
              Transaksi Pembayaran Kelas Premium Berhasil
            </p>
            <p className="text-center text-sm font-medium">
              Silahkan Tunggu Konfirmasi Admin Kelas Premium Yang Anda Ambil
            </p>
          </div>
          <div className="flex flex-col gap-4 w-[50%]">
            <Link
              to="/my-course"
              className="bg-YELLOW05 text-center py-1 px-10 text-white"
            >
              Mulai Belajar
            </Link>
            <Link
              to="/"
              className="border-2 py-1 border-YELLOW05 text-center hover:text-YELLOW05"
            >
              Kembali Ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSucces;
