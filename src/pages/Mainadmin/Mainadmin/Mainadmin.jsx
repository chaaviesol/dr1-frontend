import React, { useState } from "react";
import Mainadminsidebar from "../../../components/Mainadminsidebar/Mainadminsidebar";
import Mainadminnavbar from "../../../components/Mainadminnavbar/Mainadminnavbar";
import Mainadmindoctordetails from "../Mainadmindoctor/Mainadmindoctordetails";
import Mainadmindoctorlist from "../Mainadmindoctor/Mainadmindoctorlist";
import Mainadminhospitaldetails from "../Mainadminhospital/Mainadminhospitaldetails";
import Mainadminhospitallist from "../Mainadminhospital/Mainadminhospitallist";
import Mainadminlabsdetails from "../Mainadminlabs/Mainadminlabsdetails";
import Mainadminlabslist from "../Mainadminlabs/Mainadminlabslist";
import Mainadmincustomer from "../Mainadmincustomer/Mainadmincustomer";
import Mainadminfeedback from "../Mainadminfeedback/Mainadminfeedback";
import Mainadminonboarding from "../Mainadminonboarding/Mainadminonboarding";
import Mainadminoverview from "../Mainadminoverview/Mainadminoverview";
import Mainadmincustomerdetails from "../Mainadmincustomer/Mainadmincustomerdetails";
import { MainAdminCategoryEdit } from "../MainAdminCategoryEdit/MainAdminCategoryEdit";
import Adminlist from "../ManageAdmin/Adminlist";
import Addadmins from "../ManageAdmin/Addadmins";
import Prescriptions from "../OrderAndPrescription/Prescriptions";
import Orders from "../OrderAndPrescription/Orders";
import Orderslist from "../OrderAndPrescription/Orderslist";
import Prescriptionlist from "../OrderAndPrescription/Prescriptionlist";
import Addproduct from "../Mainadmindoctor/ProductManagement/Addproduct";
import Productdetail from "../Mainadmindoctor/ProductManagement/Productdetail";
import SecondOpinion from "../../Customer/Mobile/SecondOpinion/SecondOpinion";
import Secondoplist from "../Mainadmindoctor/SecondOpinion/Secondoplist";
import Secondopdetailed from "../Mainadmindoctor/SecondOpinion/Secondopdetailed";
import Productlist from "../Mainadmindoctor/ProductManagement/Productlist";
import Categorymanagement from "../Mainadmindoctor/ProductCategory/Categorymanagement";
import ManageQuery from "../ManageQuery/ManageQuery";
import ViewQueries from "../ManageQuery/ViewQueries";
import { CreateCampaign } from "../Campaign/CreateCampaign";
import Careerlist from "../CareerManage/Careerlist";
import HomeServicelist from "../HomeServiceManage/HomeServicelist";
import HealthPartners from "../HealthPartnerReg/HealthPartners";
import Mainadminhospitalapprove from "../Mainadminhospital/Mainadminhospitalapprove";
import Mainadminlabsapprove from "../Mainadminlabs/Mainadminlabsapprove";
import Mainadmindoctorapprove from "../Mainadmindoctor/Mainadmindoctorapprove";

export default function Mainadmin() {
  const [ChangeDashboards, setChangeDashboards] = useState({
    doctor: true,
  });
  const [DetailData, setDetailData] = useState();
  const [passingIdToQueryDetails, setPassingIdToQueryDetails] = useState(null);
  const SentData = (data) => {
    setChangeDashboards({ [data]: true });
  };
  const [changeproduct, setchangeproduct] = useState({});

  console.log("ChangeDashboards>>>>", ChangeDashboards);
  return (
    <div className="mainadminsection">
      <Mainadminnavbar
        data={{ SentData: SentData, selected: ChangeDashboards }}
      />
      <div className="mainadmindoctorsection flex">
        <Mainadminsidebar
          data={{ SentData: SentData, selected: ChangeDashboards }}
        />
        <div className="mainadmindoctordetails mainadmincontainer">
          <div className="scroll">
            {ChangeDashboards?.overview && (
              <>
                {/* <Mainadminoverview />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br /> */}
              </>
            )}

            {ChangeDashboards?.doctor && (
              <>
                <Mainadmindoctorlist
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.doctorDetail && (
              <>
                <Mainadmindoctordetails
                  Data={{ DetailData }}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}

            {ChangeDashboards?.hospital && (
              <>
                <Mainadminhospitallist
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.hospitaldetails && (
              <>
                <Mainadminhospitaldetails
                  Data={{ DetailData }}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}

            {ChangeDashboards?.lab && (
              <>
                <Mainadminlabslist
                  updateState={setChangeDashboards}
                  setLabDetails={setDetailData}
                />
              </>
            )}
            {ChangeDashboards?.singleLabDetails && (
              <>
                <Mainadminlabsdetails
                  labData={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.customer && (
              <>
                <Mainadmincustomer
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.customerDetail && (
              <>
                <Mainadmincustomerdetails
                  Details={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.feedback && (
              <>
                <Mainadminfeedback />
              </>
            )}
            {ChangeDashboards?.onboarding && (
              <>
                <Mainadminonboarding
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.onboardinghospital && (
              <>
                <Mainadminhospitalapprove
                  Details={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.onboardinglab && (
              <>
                <Mainadminlabsapprove
                  Details={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.onboardingdoc && (
              <>
                <Mainadmindoctorapprove
                  Details={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.category && (
              <>
                <MainAdminCategoryEdit />
              </>
            )}

            {ChangeDashboards?.manageadmin && (
              <>
                <Adminlist setChangeDashboards={setChangeDashboards} />
              </>
            )}
            {ChangeDashboards?.addadmin && (
              <>
                <Addadmins />
              </>
            )}
            {ChangeDashboards?.orders && (
              <>
                <Orderslist
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.salesOrderDetail && (
              <>
                <Orders
                  Details={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.prescriptions && (
              <>
                <Prescriptionlist
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.prescriptionOrderDetail && (
              <>
                <Prescriptions
                  Details={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.productmanagement && (
              <>
                <Productlist
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.productmanagementOrderDetail && (
              <>
                <Productdetail
                  updateState={{ setChangeDashboards, setDetailData }}
                  Details={DetailData}
                />
              </>
            )}
            {ChangeDashboards?.categorymanagement && (
              <>
                <Categorymanagement updateState={{ setChangeDashboards }} />
              </>
            )}

            {ChangeDashboards?.addproduct && (
              <>
                <Addproduct
                  updateState={{ setChangeDashboards, setDetailData }}
                  Details={DetailData}
                />
              </>
            )}

            {ChangeDashboards?.secondopinion && (
              <>
                <Secondoplist
                  updateState={{ setChangeDashboards, setDetailData }}
                />
              </>
            )}
            {ChangeDashboards?.secondopinionDetail && (
              <>
                <Secondopdetailed
                  Details={DetailData}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.viewQuery && (
              <>
                <ViewQueries
                  setQueryId={setPassingIdToQueryDetails}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.manageQuery && (
              <>
                <ManageQuery
                  queryId={passingIdToQueryDetails}
                  setChangeDashboards={setChangeDashboards}
                />
              </>
            )}
            {ChangeDashboards?.createCampaign && (
              <>
                <CreateCampaign setChangeDashboards={setChangeDashboards} />
              </>
            )}
            {ChangeDashboards?.careerlist && (
              <>
                <Careerlist setChangeDashboards={setChangeDashboards} />
              </>
            )}
            {ChangeDashboards?.homeservicelist && (
              <>
                <HomeServicelist setChangeDashboards={setChangeDashboards} />
              </>
            )}
            {ChangeDashboards?.healthpartners && (
              <>
                <HealthPartners setChangeDashboards={setChangeDashboards} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
