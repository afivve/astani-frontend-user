import Notification from "../../assets/notification.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NotificationUser } from "../../redux/actions/CourseActions";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { notification } = useSelector((state) => state.course);

  useEffect(() => {
    if (token) {
      dispatch(NotificationUser(navigate, null, "/"));
    }
  }, [dispatch, navigate, token]);
  return (
    <>
      <div className="mx-auto w-full relative bg-WHITE05">
        <div className="relative">
          <div className="absolute  flex justify-center   top-0 left-0 right-0 bottom-0">
            <div className="container flex flex-col    ">
              <div className="flex flex-col   border-DARKBLUE05 rounded-2xl">
                <div className="   p-6 font-Montserrat font-bold text-2xl text-start border-b-2">
                  Notifikasi
                </div>
                <div className=" flex flex-col p-9 bg-white gap-4 w-full ">
                  {notification.map((datas) => (
                    <div key={datas?.id}>
                      <div className="flex flex-row  gap-2  justify-between">
                        <div className="flex flex-row gap-4 font-Montserrat">
                          <img src={Notification} />
                          <div className="flex flex-col ">
                            <h3 className="text-DARKBLUE05 font-normal md:text-base text-xs">
                              {datas?.type}
                            </h3>
                            <p className="text-black font-semibold md:text-sm text-[10px]">
                              {datas?.message}
                            </p>
                            <p className="text-DEEPGRAY md:text-sm text-[10px] font-normal">
                              {datas?.keterangan}
                            </p>
                          </div>
                        </div>
                        <div className="md:text-sm text-[10px] font-semibold text-DEEPGRAY">
                          {new Date(datas?.createdAt).toLocaleString() ?? "-"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
