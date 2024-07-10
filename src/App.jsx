import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/user/HomePage/Home";
import RegisterPage from "./pages/user/RegisterPage/Register";
import LoginPage from "./pages/LoginPage/Login";
// import DetailPage from "./pages/DetailPage/DetailPageCourse/DetailPage";
import ProfilePage from "./pages//user/ProfilePage/Profile";
import NotificationPage from "./pages/user/NotificationPage/Notifications";
import ResetPasswordPage from "./pages/user/PasswordPage/ResetPassword";
// import MyCourse from "./pages/Class/MyCourse";
// import Course from "./pages/Class/Course";
import OtpPage from "./pages/user/OtpPage/Otp";
import VerifyEmail from "./pages/user/PasswordPage/VerifyEmail";
// import DetailPaymentPage from "./pages/PaymentPage/DetailClassPayment";
import ChangePassword from "./pages/user/ProfilePage/ChangePassword";
// import DetailContent from "./pages/DetailPage/DetailContentPage/DetailContent";
// import HistoryPage from "./pages/ProfilePage/Histori";
import Proctected from "./components/Protecd/Proctected";
import NoAccesToken from "./components/Protecd/NoAccesToken";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SearchCourse from "./pages/Class/SearchCourse";
import DiscussionPage from "./pages/user/DiscussionPage/DiscussionPage";
import DetailDiscussion from "./pages/user/DiscussionPage/DetailDiscussion";
// import Header from "./components/Navbar/Header";
import Indentifikasi from "./pages/user/Indentifikasi/Indentifikasi";
// import StatusSucces from "./pages/PaymentPage/StatusSucces";
import HistoriIndentify from "./pages/user/History/HistoryIndetify";
import DetailIdentify from "./pages/user/Detail/DetailIdentify";

import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Disease from "./pages/Admin/disease/Disease.jsx";
import HandlingDisease from "./pages/Admin/disease/DiseaseHandling.jsx";
import LiteraturDisease from "./pages/Admin/disease/DiseaseLiteratur.jsx";
import YoutubeDiseases from "./pages/Admin/disease/DiseaseYoutube.jsx";
import HistoryUser from "./pages/Admin/HistoryUser/HistooryUser.jsx";
import { ProtectedRouteAdmin } from "./security/ProtectRoleAdmin.jsx";
import { ProtectedRouteUser } from "./security/ProtectRoleUser.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route element={<ProtectedRouteUser />}>
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/profile"
            element={
              <NoAccesToken>
                <ProfilePage />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/change-password"
            element={
              <NoAccesToken>
                <ChangePassword />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/identifikasi"
            element={
              <NoAccesToken>
                <Indentifikasi />
              </NoAccesToken>
            }
          />

          <Route
            exact
            path="/notification"
            element={
              <NoAccesToken>
                <NotificationPage />
              </NoAccesToken>
            }
          />
          <Route exact path="/discussion" element={<DiscussionPage />} />
          <Route
            exact
            path="/history"
            element={
              <NoAccesToken>
                <HistoriIndentify />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/detail-identifikasi/:id"
            element={
              <NoAccesToken>
                <DetailIdentify />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/identifikasi"
            element={
              <NoAccesToken>
                <Indentifikasi />
              </NoAccesToken>
            }
          />
          <Route exact path="/detailDiscussion/:id" element={<DetailDiscussion />} />
          <Route
            exact
            path="/change-password"
            element={
              <NoAccesToken>
                <ChangePassword />
              </NoAccesToken>
            }
          />
        </Route>
        {/* <Route path="/discussion" element={<DiscussionPage />} />
        <Route path="/detailDiscussion/:id" element={<DetailDiscussion />} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route
          path="/register"
          element={
            <Proctected>
              <RegisterPage />
            </Proctected>
          }
        />
        <Route
          path="/login"
          element={
            <Proctected>
              <LoginPage />
            </Proctected>
          }
        />

        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/otp"
          element={
            <Proctected>
              <OtpPage />
            </Proctected>
          }
        />
        <Route
          path="/verify-email"
          element={
            <Proctected>
              <VerifyEmail />
            </Proctected>
          }
        />

        <Route element={<ProtectedRouteAdmin />}>
          <Route
            exact
            path="/dashboard"
            element={
              <NoAccesToken>
                <Dashboard />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/penyakit"
            element={
              <NoAccesToken>
                <Disease />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/penyakit/penanganan/:id"
            element={
              <NoAccesToken>
                <HandlingDisease />
              </NoAccesToken>
            }
          />

          <Route
            exact
            path="/penyakit/literatur/:id"
            element={
              <NoAccesToken>
                <LiteraturDisease />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/penyakit/youtube/:id"
            element={
              <NoAccesToken>
                <YoutubeDiseases />
              </NoAccesToken>
            }
          />
          <Route
            exact
            path="/history-user"
            element={
              <NoAccesToken>
                <HistoryUser />
              </NoAccesToken>
            }
          />
        </Route>
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
