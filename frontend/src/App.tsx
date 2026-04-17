import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import RegisterForm from "./pages/RegisterForm";
import StudentClasses from "./pages/StudentClasses";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import BlogPosts from "./pages/BlogPosts";
import EachBlogPost from "./pages/EachBlogPost";
import Subjects from "./components/Subjects";
import Android from "./components/Android";
import LoginForm from "./pages/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import EmailVerification from "./components/EmailVerification";
import Banner from "./components/Banner";
import MeetStaff from "./pages/MeetStaff";
import SchoolDetails from "./components/SchoolDetails";
import Parentsday from "./components/ParentsDay";
import Quiz from "./components/Quiz";
import PrivacyPolicy from "./components/PrivacyPolicy";
import StudentDashboard from "./components/students/StudentDashbord";
import ExamBoard from "./components/students/studnts/ExamBoard";
import EnrolledSubjects from "./components/students/studnts/EnrolledSubjects";
import * as data from "./data/dashboardData";
import DashboardIndex from "./components/students/studnts/DashboardIndex";
import Exam from "./components/Exam";
import Invest from "./components/Invest";
import Partnership from "./components/partnership";
import SubjectRegistration from "./components/students/SubjectRegistration";
import SchoolFeesPayment from "./components/students/studnts/SchoolFeesPayment";
import Announcement from "./components/students/Announcement";
import Assignments from "./components/students/studnts/Assignments";
import AssignmentsPage from "./components/students/studnts/AssignmentsPage";
import SeeAll from "./components/Teachers";
import CompleteProfile from "./components/students/studnts/CompleteProfile";
import SettingsPage from "./components/students/SettingsPage";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Hero />
                <Welcome />
                <Subjects />
                <Android />
                <Banner />
                <MeetStaff />
                <SchoolDetails />
              </Layout>
            }
          ></Route>
          <Route
            path='/register'
            element={
              <Layout>
                <RegisterForm />
              </Layout>
            }
          ></Route>
          <Route
            path='/our-classes'
            element={
              <Layout>
                <StudentClasses />
              </Layout>
            }
          ></Route>
          <Route
            path='/contact-us'
            element={
              <Layout>
                <Contact />
              </Layout>
            }
          ></Route>
          <Route
            path='/about-us'
            element={
              <Layout>
                <About />
              </Layout>
            }
          ></Route>
          <Route
            path='/faq'
            element={
              <Layout>
                <Faqs />
              </Layout>
            }
          ></Route>
          <Route
            path='/blog-&-articles'
            element={
              <Layout>
                <BlogPosts />
              </Layout>
            }
          ></Route>
          <Route
            path='/eachblogpost/:id'
            element={
              <Layout>
                <EachBlogPost />
              </Layout>
            }
          ></Route>
          <Route
            path='/login'
            element={
              <Layout>
                <LoginForm />
              </Layout>
            }
          ></Route>
          <Route
            path='/forgot-password'
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          ></Route>
          <Route
            path='/reset-password/:token'
            element={
              <Layout>
                <ResetPassword />
              </Layout>
            }
          ></Route>
          <Route
            path='/verify-email'
            element={
              <Layout>
                <EmailVerification />
              </Layout>
            }
          ></Route>
          <Route
            path='/parents-day'
            element={
              <Layout>
                <Parentsday />
              </Layout>
            }
          ></Route>
          <Route
            path='/quiz'
            element={
              <Layout>
                <Quiz />
              </Layout>
            }
          ></Route>
          <Route
            path='/privacy-policy'
            element={
              <Layout>
                <PrivacyPolicy />
              </Layout>
            }
          ></Route>
          <Route
            path='/exam'
            element={
              <Layout>
                <Exam />
              </Layout>
            }
          ></Route>
          <Route
            path='/invest-with-us'
            element={
              <Layout>
                <Invest />
              </Layout>
            }
          ></Route>
          <Route
            path='/partnerships'
            element={
              <Layout>
                <Partnership />
              </Layout>
            }
          ></Route>
          <Route
            path='/teachers'
            element={
              <Layout>
                <SeeAll />
              </Layout>
            }
          ></Route>
          // Add this alongside your other public routes
          <Route
            path='/complete-profile'
            element={
              <Layout>
                <CompleteProfile />
              </Layout>
            }
          />
          {isLoggedIn && (
            <Route path='/student-dashboard' element={<StudentDashboard />}>
              <Route
                index
                element={<Navigate to='dashboard-index' replace />}
              />
              <Route
                index
                path='dashboard-index'
                element={<DashboardIndex />}
              ></Route>

              <Route path='enrolled-subjects' element={<EnrolledSubjects />} />

              <Route path='settings' element={<SettingsPage />} />

              <Route
                path='/student-dashboard/assignments'
                element={<Assignments />}
              />

              <Route
                path='/student-dashboard/assignments/:assignmentId'
                element={<AssignmentsPage />}
              />

              <Route
                path='exam-board'
                element={<ExamBoard exams={data.exams} />}
              />

              <Route
                path='register-subjects'
                element={<SubjectRegistration />}
              ></Route>

              <Route path='announcements' element={<Announcement />} />

              <Route path='school-fees' element={<SchoolFeesPayment />} />

              <Route
                path='forgot-password'
                element={<ForgotPassword />}
              ></Route>
            </Route>
          )}
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
