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

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
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
        <Route
          path="/profile"
          element={
            <NoAccesToken>
              <ProfilePage />
            </NoAccesToken>
          }
        />
        {/* <Route path="/detail/course/:courseId" element={<DetailPage />} /> */}
        {/* <Route
          path="/detail/course/:courseId/module/:moduleId/content/:contentId"
          element={<DetailContent />}
        /> */}
        {/* <Route
          path="/detail/payment/:courseId"
          element={<DetailPaymentPage />}
        /> */}
        <Route
          path="/notification"
          element={
            <NoAccesToken>
              <NotificationPage />
            </NoAccesToken>
          }
        />
        {/* <Route
          path="/payment-success"
          element={
            <NoAccesToken>
              <StatusSucces />
            </NoAccesToken>
          }
        /> */}
        <Route path="/reset-password/:id" element={<ResetPasswordPage />} />
        {/* <Route path="/my-course" element={<MyCourse />} /> */}
        {/* <Route path="/my-course/:nameCourse" element={<MyCourse />} />
        <Route path="/course/:nameCourse" element={<Course />} />
        <Route path="/course" element={<Course />} />
        <Route path="/search-course/:nameCourse" element={<SearchCourse />} /> */}
        {/* <Route path="/discussion" element={<DiscussionPage />} /> */}
        <Route
          path="/detailDiscussion/:id/:discussionId"
          element={<DetailDiscussion />}
        />
        <Route
          path="/discussion"
          element={
            <NoAccesToken>
              <DiscussionPage />
            </NoAccesToken>
          }
        />
        <Route
          path="/history"
          element={
            <NoAccesToken>
              <HistoriIndentify />
            </NoAccesToken>
          }
        />
        <Route
          path="/detail-identifikasi/:id"
          element={
            <NoAccesToken>
              <DetailIdentify />
            </NoAccesToken>
          }
        />
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
        <Route
          path="/change-password"
          element={
            <NoAccesToken>
              <ChangePassword />
            </NoAccesToken>
          }
        />
        {/* <Route
          path="/history"
          element={
            <NoAccesToken>
              <HistoryPage />
            </NoAccesToken>
          }
        /> */}

        <Route
          path="/identifikasi"
          element={
            <NoAccesToken>
              <Indentifikasi />
            </NoAccesToken>
          }
        />
        <Route
          path="/dashboard"
          element={
            <NoAccesToken>
              <Dashboard />
            </NoAccesToken>
          }
        />
        <Route
          path="/penyakit"
          element={
            <NoAccesToken>
              <Disease />
            </NoAccesToken>
          }
        />
        <Route
          path="/penyakit/penanganan/:id"
          element={
            <NoAccesToken>
              <HandlingDisease />
            </NoAccesToken>
          }
        />

        <Route
          path="/penyakit/literatur/:id"
          element={
            <NoAccesToken>
              <LiteraturDisease />
            </NoAccesToken>
          }
        />
        <Route
          path="/penyakit/youtube/:id"
          element={
            <NoAccesToken>
              <YoutubeDiseases />
            </NoAccesToken>
          }
        />
        <Route
          path="/history-user"
          element={
            <NoAccesToken>
              <HistoryUser />
            </NoAccesToken>
          }
        />
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
