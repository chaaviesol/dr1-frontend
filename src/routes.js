import HomePage from "./pages/Home/Home";
import { LoginSignin } from "./pages/Login&register/LoginSignin";
import DoctorProfile from "./pages/Customer/doctor/DoctorProfile";
import Labdetails from "./pages/Labs/Labdetails";
import About from "./pages/Aboutus/About";
import Pharmacydetails from "./pages/Pharmacy/Pharmacydetails";
import Userprofile from "./pages/User/Userprofile";
import Hospitaladmin from "./pages/Hospitaladmin/Hospitaladmin";
import Hospitaldetails from "./pages/Hospitaladmin/Hospitaldetails";
import Hospitaladminnotification from "./components/Hospitaladminnotification";
import Hospitaladmindoctorlist from "./pages/Hospitaladmin/Doctors/Hospitaladmindoctorlist";
import Hospitaladmindoctorcard from "./components/Hospitaladmin_doctor_card";
import Hospitaladminregistration2 from "./pages/Hospitaladmin/Hospitaladminregistration2";
import Hospitaladmindoctordetails from "./pages/Hospitaladmin/Hospitaladmindoctordetails";
import Hospitaladminadddoctor from "./pages/Hospitaladmin/Doctors/AddDoctor/Hospitaladminadddoctor";
import Pharmacyadmin from "./pages/Pharmacyadmin/Pharmacyadmin";
import Labadmin from "./pages/Labadmin/Labadmin";
import Doctoradminregistration1 from "./pages/Doctoradmin/registration/Doctoradminregistration1";
import Doctoradminregistration2 from "./pages/Doctoradmin/registration/Doctoradminregistration2";
import Hospitaladminregistration1 from "./pages/Hospitaladmin/Hospitaladminregistration1";
import Labadminregistration1 from "./pages/Labadmin/Labadminregistration1";
import Labadminregistration2 from "./pages/Labadmin/Labadminregistration2";
import Pharmacyadminregister2 from "./pages/Pharmacyadmin/Pharmacyadminregister2";
import Pharmacyregistration1 from "./pages/Pharmacyadmin/Pharmacyregistration1";
import SearchDoc from "./pages/Customer/doctor/DoctorSearch/Index";
import Registerlanding from "./pages/registerlanding/Registerlanding";
import { Connect } from "./pages/Labs/LabFIltering/WebMobileConnect/Connect";
import { Hosconnect } from "./pages/Customer/HospitalFiltering/WebMobileConnect/Hosconnect";

import Mainadmindoctordetails from "./pages/Mainadmin/Mainadmindoctor/Mainadmindoctordetails";
import Mainadmindoctorapprove from "./pages/Mainadmin/Mainadmindoctor/Mainadmindoctorapprove";
import Mainadmindoctorlist from "./pages/Mainadmin/Mainadmindoctor/Mainadmindoctorlist";
import Mainadminhospitallist from "./pages/Mainadmin/Mainadminhospital/Mainadminhospitallist";
import Mainadminhospitaldetails from "./pages/Mainadmin/Mainadminhospital/Mainadminhospitaldetails";
import Mainadminhospitalapprove from "./pages/Mainadmin/Mainadminhospital/Mainadminhospitalapprove";
import Mainadminlabslist from "./pages/Mainadmin/Mainadminlabs/Mainadminlabslist";
import Mainadminlabsdetails from "./pages/Mainadmin/Mainadminlabs/Mainadminlabsdetails";
import Mainadminlabsapprove from "./pages/Mainadmin/Mainadminlabs/Mainadminlabsapprove";
import Mainadminnavbar from "./components/Mainadminnavbar/Mainadminnavbar";
import Mainadminsidebar from "./components/Mainadminsidebar/Mainadminsidebar";
import Mainadmin from "./pages/Mainadmin/Mainadmin/Mainadmin";
import Mainadminfeedback from "./pages/Mainadmin/Mainadminfeedback/Mainadminfeedback";
import Mainadminonboarding from "./pages/Mainadmin/Mainadminonboarding/Mainadminonboarding";
import Mainadmincustomerdetails from "./pages/Mainadmin/Mainadmincustomer/Mainadmincustomerdetails";
import { DocProfileMainSec } from "./pages/Doctoradmin/Dashboard/DocProfileMainSec";
import HospitalDetailed from "./pages/Customer/Hospital/HospitalDetailed/HospitalDetailed";
import HospitalAdminProvider from "./contexts/Doctor/HospitalAdminProvider";
import { DoctorFeedbackList } from "./pages/Mainadmin/Mainadmindoctor/DoctorFeedBacklist/DoctorFeedbackList";
import MainAdminDoctorEditBasic from "./pages/Mainadmin/Mainadmindoctor/MainAdminDoctorEdit/MainAdminDoctorEditBasic";
import { MainAdminDoctorEditFinal } from "./pages/Mainadmin/Mainadmindoctor/MainAdminDoctorEdit/MainAdminDoctorEditFinal";
import Mainadminlabeditlab1 from "./pages/Mainadmin/Mainadminlabs/edit data/LabEdit1";
import Mainadminlabeditlab2 from "./pages/Mainadmin/Mainadminlabs/edit data/LabEdit2";
import { MainAdminHospitalEditBasic } from "./pages/Mainadmin/Mainadminhospital/MainAdminHospitalEdit/MainAdminHospitalEditBasic";
import { MainAdminHospitalEditFinal } from "./pages/Mainadmin/Mainadminhospital/MainAdminHospitalEdit/MainAdminHospitalEditFinal";
import Addadmins from "./pages/Mainadmin/ManageAdmin/Addadmins";
import Adminlist from "./pages/Mainadmin/ManageAdmin/Adminlist";
import Unauthorized from "./components/Routing/UnAuthorized/UnAuthorized";
import CustomerLabMobile from "./pages/Customer/Mobile/Lab/Lab";
import CustomerHospitalMobile from "./pages/Customer/Mobile/Hospital/HospitalMob";
import CustomerDoctorMobile from "./pages/Customer/Mobile/Doctor/CusDoctor";
import CustomerPharamcyMobile from "./pages/Customer/Mobile/Pharmacy/Pharmacy";
import MobileDoctorProfile from "./pages/Customer/Mobile/MobileDoctorProfile/MobileDoctorProfile";
import MobileHospitalProfile from "./pages/Customer/Mobile/MobileHospitalProfile/MobileHospitalProfile";
import MobileLabProfile from "./pages/Customer/Mobile/MobileLabProfile/MobileLabProfile";
import SecondOpinion from "./pages/Customer/Mobile/SecondOpinion/SecondOpinion";
import SecondOpinion2ndpage from "./pages/Customer/Mobile/SecondOpinion/SecondOpinion2ndpage";
import Searchpage from "./pages/Customer/Mobile/Search/Searchpage";
import Profile from "./pages/Customer/Mobile/Profile/Profile";

import ResetPassword from "./pages/Customer/Mobile/Manage User/password/resetpassword1";
import EmailInputPage from "./pages/Customer/Mobile/Manage User/password/EmailInputPage";
import OTPVerification from "./pages/Customer/Mobile/Manage User/password/OTPVerification";
import AllProductsView from "./pages/Pharmacy/Product/AllProductsView";
import SingleProdDetails from "./pages/Pharmacy/Product/SingleProdDetails";
import Cart from "./pages/Pharmacy/Product/Cart";
import Categorymanagement from "./pages/Mainadmin/Mainadmindoctor/ProductCategory/Categorymanagement";
import { LabProfileMainSec } from "./pages/LabnewAdmin/Dashboard/LabProfileMainSec";
import Services from "./pages/Services/Services";
import Community from "./pages/Community/Community";
import MyQueries from "./pages/Customer/MyQueries/MyQueries";
import DoctorPage from "./pages/Home/DoctorPage";
import HospitalPage from "./pages/Home/HospitalPage";
import LabPage from "./pages/Home/LabPage";
import PharmacyPage from "./pages/Home/PharmacyPage";
import SecondOpinions from "./pages/Customer/Second Opinion/SecondOpinions";
import DetailedOpinion from "./pages/Customer/Second Opinion/DetailedOpinion";
import { CreateCampaign } from "./pages/Mainadmin/Campaign/CreateCampaign";
import Careersform from "./pages/Career/Careerform";
export const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/doctor", element: <DoctorPage /> },
  { path: "/hospital", element: <HospitalPage /> },
  { path: "/labs", element: <LabPage /> },
  { path: "/pharmacy", element: <PharmacyPage /> },
  { path: "/customerdocmobile", element: <CustomerDoctorMobile /> },
  { path: "/customerhospitalmobile", element: <CustomerHospitalMobile /> },
  { path: "/customerlabmobile", element: <CustomerLabMobile /> },
  { path: "/customerpharmacymobile", element: <CustomerPharamcyMobile /> },
  { path: "/search", element: <Searchpage /> },
  { path: "/profile", element: <Profile /> },
  { path: "/pharmacyproducts", element: <AllProductsView /> },
  { path: "/productdetails", element: <SingleProdDetails /> },
  { path: "/cart", element: <Cart /> },
  { path: "/createcampaign", element: <CreateCampaign /> },


  { path: "/mobiledoctorprofile", element: <MobileDoctorProfile /> },
  { path: "/mobilehospitalprofile", element: <MobileHospitalProfile /> },
  { path: "/mobilelabprofile", element: <MobileLabProfile /> },
  { path: "/secondopinion", element: <SecondOpinion /> },
  { path: "/secondopinion2", element: <SecondOpinion2ndpage /> },

  { path: "/unauthorized", element: <Unauthorized /> },

  { path: "/login", element: <LoginSignin /> },
  { path: "/doctorprofile", element: <DoctorProfile /> },
  { path: "/labdetails", element: <Labdetails /> },
  { path: "/about", element: <About /> },
  { path: "/pharmacydetails", element: <Pharmacydetails /> },

  { path: "/hosPitalfilter", element: <Hosconnect /> },
  {
    path: "/hospitaladminnotification",
    element: <Hospitaladminnotification />,
  },
  { path: "/hospitaladmindoctorlist", element: <Hospitaladmindoctorlist /> },
  { path: "/hospitaldetails", element: <Hospitaldetails /> },
  { path: "/hospitaladmindoctorcard", element: <Hospitaladmindoctorcard /> },
  {
    path: "/hospitaladmindoctordetails",
    element: <Hospitaladmindoctordetails />,
  },
  {
    path: "/hospitaladminregistration2",
    element: <Hospitaladminregistration2 />,
  },
  { path: "/hospitaladminadddoctor", element: <Hospitaladminadddoctor /> },
  {
    path: "/hospitaladminregistration1",
    element: <Hospitaladminregistration1 />,
  },
  { path: "/searchdoctor", element: <SearchDoc /> },
  { path: "/doctoradminregistration1", element: <Doctoradminregistration1 /> },
  { path: "/doctoradminregistration2", element: <Doctoradminregistration2 /> },
  { path: "/pharmacyadmin", element: <Pharmacyadmin /> },
  { path: "/pharmacyadminregister2", element: <Pharmacyadminregister2 /> },
  { path: "/pharmacyadminregister1", element: <Pharmacyregistration1 /> },
  { path: "/labadminregistration1", element: <Labadminregistration1 /> },
  { path: "/labadminregistration2", element: <Labadminregistration2 /> },
  { path: "/labfiltering", element: <Connect /> },
  { path: "/registration", element: <Registerlanding /> },

  // { path: "/analyzelab", element: <AnalyzeLabAdmin /> },
  // { path: "/editLaboratory", element: <EditLaboratory /> },
  { path: "/hospitaldetailed", element: <HospitalDetailed /> },

  { path: "/forgotpwd", element: <EmailInputPage /> },
  { path: "/resetpassword", element: <ResetPassword /> },
  { path: "/otpverification", element: <OTPVerification /> },

  { path: "/services", element: <Services /> },
  { path: "/community", element: <Community /> },
  { path: "/careers", element: <Careersform /> },
 
];

export const doctorAdminRoutes = [
  { path: "/doctoradminprofile", element: <DocProfileMainSec /> },
];

export const protectedCustomerRoutes = [
  { path: "/userprofile", element: <Userprofile /> },
  { path: "/myqueries", element: <MyQueries /> },
  { path: "/mysecondopinions", element: <SecondOpinions /> },
  { path: "/mysecondopinions/detailed", element: <DetailedOpinion /> }
];
export const hospitalAdminRoutes = [
  {
    path: "/hospitaladmin",
    element: (
      <HospitalAdminProvider>
        <Hospitaladmin />
      </HospitalAdminProvider>
    ),
  },
];
export const labAdminRoutes = [
  { path: "/labadmin", element: <Labadmin /> },
  { path: "/labprofile", element: <LabProfileMainSec /> },
];
export const superAdminRoutes = [
  { path: "/mainadmin", element: <Mainadmin /> },
  { path: "/addadmin", element: <Addadmins /> },
  { path: "/adminlist", element: <Adminlist /> },
  { path: "/mainadmindoctordetails", element: <Mainadmindoctordetails /> },
  { path: "/mainadmindoctorapprove", element: <Mainadmindoctorapprove /> },
  { path: "/mainadmindoctorlist", element: <Mainadmindoctorlist /> },
  { path: "/mainadminhospitallist", element: <Mainadminhospitallist /> },
  { path: "/mainadminhospitaldetails", element: <Mainadminhospitaldetails /> },
  { path: "/mainadminhospitalapprove", element: <Mainadminhospitalapprove /> },
  { path: "/mainadminlabslist", element: <Mainadminlabslist /> },
  { path: "/mainadminlabsdetails", element: <Mainadminlabsdetails /> },
  { path: "/mainadminlabsapprove", element: <Mainadminlabsapprove /> },
  { path: "/mainadminnavbar", element: <Mainadminnavbar /> },
  { path: "/mainadminsidebar", element: <Mainadminsidebar /> },
  { path: "/mainadminonboading", element: <Mainadminonboarding /> },
  { path: "/mainadminfeedback", element: <Mainadminfeedback /> },
  { path: "/Mainadmincustomerdetails", element: <Mainadmincustomerdetails /> },
  { path: "/doctorfeedbacklist", element: <DoctorFeedbackList /> },
  { path: "/mainadmindoctorEditbasic", element: <MainAdminDoctorEditBasic /> },
  { path: "/mainadmindoctorEditFinal", element: <MainAdminDoctorEditFinal /> },
  { path: "/mainadminlabeditlab1", element: <Mainadminlabeditlab1 /> },
  { path: "/mainadminlabeditlab2", element: <Mainadminlabeditlab2 /> },
  {
    path: "/mainadminhospitalBasicedit",
    element: <MainAdminHospitalEditBasic />,
  },
  {
    path: "/mainadminhospitalFinaledit",
    element: <MainAdminHospitalEditFinal />,
  },
  {
    path: "/categoryedit",
    element: <Categorymanagement />,
  },
];
