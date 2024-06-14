import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetail } from "../../redux/actions/DetailActions";
import { Label, Select } from "flowbite-react";
import MethodPayment from "../../data/MethodPayment";
import { getCoursePremium } from "../../redux/actions/CourseActions";
import SpinnerLoading from "../../utils/SpinnerLoading";

export default function DetailClassPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setIsLoading] = useState(false);

  const { courseDetail } = useSelector((state) => state.detail);

  useEffect(() => {
    courseId && dispatch(getCourseDetail(courseId));
  }, [dispatch, courseId]);

  const formatRupiah = (angka) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });

    return formatter.format(angka);
  };

  const handleClick = () => {
    dispatch(getCoursePremium(setIsLoading, navigate, paymentMethod, courseId));
  };

  return (
    <>
      <div className=" flex justify-center  h-screen pt-12">
        <div className="md:w-[60%]   w-full  flex  justify-center ">
          <div className="h-10  md:w-[60%]   w-full border-2">
            <img src={courseDetail.imageUrl} className="h-52 w-full" />
            <div className="flex flex-col px-2 lg:px-4 font-Montserrat gap-2">
              <p className="text-xl font-bold text-DARKBLUE05 mt-2">
                {courseDetail.category}
              </p>
              <p className="text-base font-bold">{courseDetail.title}</p>
              <div className="flex flex-row gap-2 text-base font-medium">
                <p>by</p>
                <p>{courseDetail.instructor}</p>
              </div>
            </div>
            <div className="flex flex-row w-full  px-2 lg:px-4 justify-around  mt-2 font-Montserrat font-bold">
              <div className="border-2 border-DARKBLUE05   w-full text-center">
                Harga
              </div>
              <div className="border-2 border-DARKBLUE05  w-full text-center">
                Diskon
              </div>
              <div className="border-2 border-DARKBLUE05  w-full text-center">
                Total
              </div>
            </div>
            <div className="flex flex-row w-full  px-2 lg:px-4 justify-around jus">
              <div className="border-b-2 border-l-2  border-DARKBLUE05   w-full text-center">
                {formatRupiah(courseDetail.originalPrice)}
              </div>
              <div className="border-b-2 border-l-2  border-DARKBLUE05  w-full text-center">
                {formatRupiah(courseDetail.discount || "0")} %
              </div>
              <div className="border-b-2 border-l-2 border-r-2  border-DARKBLUE05  w-full text-center">
                {formatRupiah(courseDetail.totalPrice)}
              </div>
            </div>

            <div className="mt-6 px-2 lg:px-4 w-full">
              <div className=" w-full">
                <div className="mb-2 block ">
                  <Label htmlFor="countries" value="Pilih Metode Pembayaran" />
                </div>
                <Select
                  id="countries"
                  required
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod || ""} // Set the value to the selected payment method
                >
                  <option value="" disabled>
                    Silahkan Pilih
                  </option>
                  {MethodPayment.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-full mt-6 px-2 lg:px-4 ">
              <button
                onClick={handleClick}
                className="flex items-center justify-center py-2 w-full rounded-md bg-YELLOW05 font-Montserrat font-semibold text-white"
              >
                {loading ? <SpinnerLoading /> : "Bayar dan Ikuti Kelas"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
