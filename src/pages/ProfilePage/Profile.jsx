import { Link, useNavigate } from "react-router-dom";
import EditeIcon from "../../assets/edit.svg";
import SettingIcon from "../../assets/setting.svg";
import ShopIcon from "../../assets/shopping_card.svg";
import LogoutIcon from "../../assets/log_out.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { FaCameraRotate } from "react-icons/fa6";
import {
  profile,
  logout,
  UpdateProfile,
  UpdatePicture,
} from "../../redux/actions/AuthActions";
import { provinces } from "../../data/DataProvince";
import { cities } from "../../data/DataCities";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const img = useRef();

  const { user, token } = useSelector((state) => state.auth);
  const [photoProfile, setPhotoProfile] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  //merender user jika terdapat pembaharuan
  useEffect(() => {
    setPhotoProfile(user?.photoProfile);
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setGender(user?.gender || "");
    setAge(user?.age || "");
    setCity(user?.city || "");
    setProvince(user?.province || "");
  }, [user]);

  //fungsi untuk menampilkan profile
  useEffect(() => {
    if (token) {
      dispatch(profile(navigate, null, "/"));
    }
  }, [dispatch, navigate, token]);

  //fungsi untuk update profile
  const handleSubmit = (e) => {
    e.preventDefault();
    if (token) {
      dispatch(UpdateProfile(name, email, phone, city, province, gender, age));
    }
  };

  //fungsi untuk logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChange = (selectedFile) => {
    if (token) {
      dispatch(UpdatePicture(selectedFile));
    }
  };

  const handleChangeProfile = (event) => {
    event.preventDefault();

    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const newProfilePicture = URL.createObjectURL(selectedFile);
      setPhotoProfile(newProfilePicture);

      handleChange(selectedFile);
    }
  };

  const filteredCities = cities.filter((city) => city.provinceId === province);

  return (
    <>
      <div className="mx-auto w-full bg-WHITE05">
        <div className="relative ">
          <div className="absolute  flex justify-center mt-6  top-0 left-0 right-0  ">
            <div className="container flex flex-col  ">
              <div className=" container flex flex-col mb-20   ">
                {/* responsive di mobile */}
                <div className="lg:hidden">
                  <div className="flex flex-row rounded-lg  bg-NEUTRAL02 border-2 border-DARKBLUE05">
                    <Link
                      as={Link}
                      to="/profile"
                      className="bg-NEUTRAL05  w-full   justify-center items-center flex "
                    >
                      <img src={EditeIcon} />
                    </Link>
                    <Link
                      as={Link}
                      to="/change-password"
                      className="py-[24px] w-full  justify-center items-center flex  border-r-2 border-DARKBLUE05"
                    >
                      <img src={SettingIcon} />
                    </Link>
                    <Link
                      as={Link}
                      to="/history"
                      className="py-[24px] w-full justify-center items-center flex  border-r-2 border-DARKBLUE05"
                    >
                      <img src={ShopIcon} />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-[24px] w-full   justify-center items-center flex  "
                    >
                      <img src={LogoutIcon} />
                    </button>
                  </div>
                </div>
                <div className=" flex flex-row  gap-5    py-4 rounded-xl mb-12 bg-white">
                  <div className="hidden lg:block lg:w-[40%] lg:pr-16">
                    <div className="flex flex-col ">
                      <Link
                        as={Link}
                        to="/profile"
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat font-bold text-YELLOW05 "
                      >
                        <img src={EditeIcon} />
                        <div>Profile Saya</div>
                      </Link>
                      <Link
                        as={Link}
                        to="/change-password"
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat"
                      >
                        <img src={SettingIcon} />
                        <div>Ubah Password</div>
                      </Link>
                      <Link
                        as={Link}
                        to="/history"
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat"
                      >
                        <img src={ShopIcon} />
                        <div>Riwayat Pembelian</div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex flex-row py-3 gap-2 border-b-2 font-Montserrat"
                      >
                        <img src={LogoutIcon} />
                        <div>Keluar</div>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col lg:w-[60%] py-4 border-2 rounded-md justify-center w-full gap-4 lg:px-8 px-4 shadow-xl">
                    <div className="border-b-2 font-Montserrat font-bold text-xl pb-2">
                      Profile Saya
                    </div>
                    <div className="w-[90px] h-[90px] relative rounded-full self-center border-[3px] border-DARKBLUE05">
                      <img
                        src={photoProfile}
                        className="w-full h-full rounded-full border-DARKBLUE05 object-cover object-top"
                        alt="Profile"
                      />
                      <button
                        onClick={() => img.current.click()}
                        className="absolute bottom-0 right-1 bg-white p-[5px] rounded-full"
                      >
                        <FaCameraRotate />
                        <input
                          type="file"
                          className="h-4 w-4"
                          ref={img}
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleChangeProfile}
                        />
                      </button>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex flex-col gap-4 font-Poppins ">
                        <div>
                          <p>Nama</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl  "
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div>
                          <p>Email</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl  "
                            value={email}
                            onChange={() => setEmail(user?.email)}
                          />
                        </div>
                        <div>
                          <p>Nomor Telepon</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl "
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                        <div>
                          <p>Umur</p>
                          <input
                            type="text"
                            className="border w-full py-3 px-4 rounded-2xl  "
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Umur anda"
                          />
                        </div>
                        <div>
                          <p>Jenis Kelamin</p>
                          <select
                            className="border w-full py-3 px-4 rounded-2xl"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option value="" disabled>
                              Pilih Jenis Kelamin
                            </option>
                            <option value="laki-laki">Laki-Laki</option>
                            <option value="perempuan">Perempuan</option>
                          </select>
                        </div>
                        <div>
                          <p>Provinsi</p>
                          <select
                            className="border w-full py-2 px-3 rounded-xl"
                            value={province}
                            onChange={(e) => {
                              setProvince(e.target.value);
                              setCity("");
                            }}
                          >
                            <option value="" disabled>
                              Pilih Provinsi
                            </option>
                            {provinces.map((prov) => (
                              <option key={prov.id} value={prov.id}>
                                {prov.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <p>Kota / Kabupaten</p>
                          <select
                            className="border w-full py-2 px-3 rounded-xl"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={!province}
                          >
                            <option value="" disabled>
                              Pilih Kabupaten / Kota
                            </option>
                            {filteredCities.map((city) => (
                              <option key={city.id} value={city.id}>
                                {city.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="bg-YELLOW05 text-white p-3 rounded-xl font-Poppins"
                      >
                        Simpan Profile Saya
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
