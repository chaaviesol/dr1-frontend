import React, { useEffect, useState } from 'react'
import "./MainAdminCategoryEdit.css"
import axios from 'axios'
import { port } from '../../../config'
import { toast } from 'react-toastify'
import { Modal } from '@mui/material'
import { Loader } from "../../../components/Loader/Loader"
import DeleteIcon from '@mui/icons-material/Delete';
export const MainAdminCategoryEdit = () => {

    const [HosSections, setHosSections] = useState({})
    const [DeletePopup, setDeletePopup] = useState({
        index: '',
        delete: false
    })
    const [Loading, setLoading] = useState(false)
    const [LabSections, setLabSections] = useState({})
    const [DocSections, setDocSections] = useState({})
    const [ModalCondition, setModalCondition] = useState({})
    const [ConditionForHos, setConditionForHos] = useState({})
    const [ConditionForLab, setConditionForLab] = useState({})
    const [ConditionForDoc, setConditionForDoc] = useState({})
    const [Hosspecialities, setHosspecialities] = useState([])
    const [Docspecialities, setDocspecialities] = useState([])
    const [LabPrintingItems, setLabPrintingItems] = useState([])
    const [categories, setcategories] = useState([])

    const loadingFn = (condition) => {
        setLoading(condition)
    }

    const arraysEqual = (arr1, arr2) => {
        if (arr1?.length !== arr2?.length) return false;
        return arr1.every((value, index) => value === arr2[index]);
    }


    const CheckingDataInputed = () => {
        const Type = Object.keys(HosSections)
        console.log("Type>>>", Type)
        if (Type[0] === "Features") {
            const FindSecInd = categories?.originalData?.findIndex(ele => ele?.Hospital)
            const originalData = categories?.originalData[FindSecInd]?.Hospital?.features
            if (arraysEqual(originalData, Hosspecialities)) {
                return "success"
            } else {
                toast.info("Please save changes")
                return "false"
            }
        } else {
            const FindDataIndex = categories?.transformedData?.findIndex(ele => ele?.type === Type[0])
            console.log(FindDataIndex)
            const originalData = categories?.transformedData[FindDataIndex].department
            console.log(originalData, Hosspecialities)
            if (arraysEqual(originalData, Hosspecialities)) {
                return "success"
            } else {
                toast.info("Please save changes")
                return "false"
            }
        }
    }
    const CheckingDataInputedDoc = () => {
        const Type = Object.keys(DocSections)
        console.log("Type>>>", Type)
        const FindDataIndex = categories?.transformedData?.findIndex(ele => ele?.type === Type[0])
        console.log(FindDataIndex)
        const originalData = categories?.transformedData[FindDataIndex].department
        console.log(originalData, Hosspecialities)
        if (arraysEqual(originalData, Docspecialities)) {
            return "success"
        } else {
            toast.info("Please save changes")
            return "false"
        }
    }
    const CheckingDataInputedLab = () => {
        const Type = Object.keys(LabSections)
        console.log("Type>>>", Type)
        const FindIndex = categories?.originalData?.findIndex(ele => ele?.Laboratory)
        const originalData = categories?.originalData[FindIndex]?.Laboratory?.[Type[0].toLowerCase()]
        if (arraysEqual(originalData, LabPrintingItems)) {
            return "success"
        } else {
            toast.info("Please save changes")
            return "false"
        }
    }
    console.log("categories>>>>", categories)
    const HosChangeSections = (sec) => {
        const retrunElement = CheckingDataInputed()
        console.log("retrunElement>>>>", retrunElement)
        if (retrunElement === "success") {
            if (sec === "Features") {
                const FindData = categories?.originalData?.find(ele => ele?.Hospital)
                setHosspecialities(FindData?.Hospital?.features)
                setHosSections({ [sec]: true })
                setConditionForHos({ edit: false })
            } else {
                const FindData = categories?.transformedData?.find(ele => ele?.type === sec)
                if (FindData) {
                    setHosSections({ [sec]: true })
                    setConditionForHos({ edit: false })
                    setHosspecialities(FindData?.department)
                }
            }
        }

    }
    const LabChangeSections = (sec) => {
        const retrunElement = CheckingDataInputedLab()
        if (retrunElement === "success") {
            setLabSections({ [sec]: true })
            setConditionForLab({ edit: false })
            if (sec) {
                const LabServices = categories?.originalData?.find(ele => ele?.Laboratory)
                setLabPrintingItems(LabServices.Laboratory?.[sec.toLowerCase()])
            }
        }

    }
    const DocChangeSections = (sec) => {
        const retrunElement = CheckingDataInputedDoc()
        if (retrunElement === "success") {
            setDocSections({ [sec]: true })
            setConditionForDoc({ edit: false })
            if (sec) {
                const FindData = categories?.transformedData?.find(ele => ele?.type === sec)
                if (FindData) {
                    setDocspecialities(FindData?.department)
                }
            }
        }
    }
    const EditFn = () => {
        if (ConditionForHos?.edit) {
            setConditionForHos({ edit: false })
        } else {
            setConditionForHos({ edit: true })
        }

    }
    const EditFnDoc = () => {
        if (ConditionForDoc?.edit) {
            setConditionForDoc({ edit: false })
        } else {
            setConditionForDoc({ edit: true })
        }
    }
    const EditFnLab = () => {
        if (ConditionForDoc?.edit) {
            setConditionForLab({ edit: false })
        } else {
            setConditionForLab({ edit: true })
        }
    }

    const IntialApiCall = () => {
        loadingFn(true)
        axios.get(`${port}/admin/getcategory`).then((res) => {
            setcategories(res?.data?.data)
            console.log(res)
            loadingFn(false)

            if (res?.data?.data) {
                setInitialStateSetting(res?.data?.data)
            }

        })
    }

    const setInitialStateSetting = (Data) => {
        if (Data && Array.isArray(Data.allTypes) && Data.allTypes.length > 0) {
            const firstType = Data.allTypes[0];
            console.log("Data?.allTypes?.[0]>>>>", firstType);
            setDocSections({ [firstType]: true });
            setHosSections({ [firstType]: true });
            setLabSections({ Services: true });
            const FindData = Data?.transformedData?.find(ele => ele?.type === Data.allTypes[0])
            setHosspecialities(FindData?.department)
            setDocspecialities(FindData?.department)
            const LabServices = Data.originalData?.find(ele => ele?.Laboratory)
            setLabPrintingItems(LabServices?.Laboratory?.services)
        } else {
            console.warn("Data?.allTypes is undefined or empty.");
        }
    }

    useEffect(() => {
        IntialApiCall()
    }, [])

    const EditFnBox = (index, which) => {
        const Type = Object.keys(HosSections)
        let Data = {}
        if (Type[0] === "Features") {
            Data = {
                main_type: "Hospital",
                features: which
            }
        } else {
            Data = {
                type: Type[0],
                main_type: "Hospital",
                department: which,
            }
        }
        CheckEdit(Data, index, "Hospital")
    }

    const EditFnBoxDoc = (index, which) => {
        const Type = Object.keys(DocSections)
        let Data = {}
        if (Type[0] === "Features") {
            Data = {
                main_type: "Doctor",
                features: which
            }
        } else {
            Data = {
                type: Type[0],
                main_type: "Doctor",
                department: which,
            }
        }
        if (Data?.main_type) {
            CheckEdit(Data, index, "Doctor")
        } else {

            toast.info("Check Fields")
        }
    }
    const EditFnBoxLab = (index, which) => {
        const Type = Object.keys(LabSections)
        let Data = {}
        if (Type[0] === "Features") {
            Data = {
                main_type: "Laboratory",
                features: which
            }
        } else {
            Data = {
                main_type: "Laboratory",
                services: which
            }
        }
        // console.log(Data)
        if (Data?.main_type) {
            CheckEdit(Data, index, "Laboratory")
        } else {
            toast.info("Check Fields")
        }
    }




    const CheckEdit = async (Data, index, type) => {
        loadingFn(true)
        console.log("coming Data>", index);
        console.log("State Data>", ConditionForHos?.index);
        try {
            const Checking = type === "Hospital" ?
                ConditionForHos?.index === index
                :
                type === "Laboratory" ?
                    ConditionForLab?.index === index
                    :
                    type === "Doctor" ?
                        ConditionForDoc?.index === index
                        :
                        ''

            if (!Checking) {
                console.log("Checking>>>>", Checking)
                const res = await axios.post(`${port}/admin/editcategory`, Data);
                if (res?.data?.success) {
                    if (type === "Laboratory") {
                        console.log("Laboratory");
                        setConditionForLab({ edit: true, index, type });
                    } else if (type === "Hospital") {
                        console.log("Hospital");
                        setConditionForHos({ edit: true, index, type });
                    } else if (type === "Doctor") {
                        console.log("Doctor");
                        setConditionForDoc({ edit: true, index, type });
                    }
                    toast.success(res?.data?.message);
                    loadingFn(false);
                    const passingData = { checking: true }
                    return passingData;
                }
            } else {
                const passingData = { checking: true }
                return passingData
            }
        } catch (err) {
            toast.info(err.response?.data?.message);
            loadingFn(false);
            const passingData = { checking: false }
            return passingData;  // Return the success message
        }
    };
    const OpenDeletePopup = async (index, main_type, which) => {
        console.log("main_type>>>>", main_type, "index>>>>>", index, "which>>>>>", which,)
        let Data = ""
        if (main_type === "Laboratory") {
            const type = Object.keys(LabSections)
            if (type[0] === "Features") {
                Data = {
                    main_type: main_type,
                    features: which
                }
            } else {
                Data = {
                    main_type: main_type,
                    services: which
                }
            }
        } else if (main_type === "Hospital") {
            const type = Object.keys(HosSections)

            if (type[0] === "Features") {
                Data = {
                    main_type: "Hospital",
                    features: which
                }
            } else {
                Data = {
                    type: type[0],
                    main_type: "Hospital",
                    department: which,
                }
            }
        } else {
            const type = Object.keys(DocSections)
            if (type[0] === "Features") {
                Data = {
                    main_type: "Doctor",
                    features: which
                }
            } else {
                Data = {
                    type: type[0],
                    main_type: "Doctor",
                    department: which,
                }
            }
        }

        const Getting = await CheckEdit(Data, index, main_type);
        console.log("Data>>>>>", Getting)
        if (Getting?.checking) {
            setDeletePopup({ ...DeletePopup, delete: true, index: index, main_type })
        }
    }

    const closePopups = () => {
        setDeletePopup({ delete: false })
        loadingFn(false)
    }



    console.log("DeletePopup", DeletePopup)
    const editHosSpeciality = (e, index) => {
        const value = e?.target?.value
        let tempSepeciality = [...Hosspecialities]
        tempSepeciality[index] = value
        setHosspecialities(tempSepeciality)
    }
    const editLabSpeciality = (e, index) => {
        const value = e?.target?.value
        let tempSepeciality = [...LabPrintingItems]
        tempSepeciality[index] = value
        setLabPrintingItems(tempSepeciality)
    }
    const editDocSpeciality = (e, index) => {
        const value = e?.target?.value
        let tempSepeciality = [...Docspecialities]
        tempSepeciality[index] = value
        setDocspecialities(tempSepeciality)
    }
    const SaveDoc = () => {
        // console.log(Object.keys(DocSections))
        const Type = Object.keys(DocSections)
        let Data = {}
        if (Type[0] === "Features") {
            Data = {
                main_type: "Doctor",
                features: Docspecialities
            }
        } else {
            Data = {
                type: Type[0],
                main_type: "Doctor",
                department: Docspecialities,
            }
        }
        if (Data?.main_type) {
            axios.post(`${port}/admin/addcategory`, Data).then((res) => {
                if (res?.data?.success)
                    toast.success(res?.data?.message);
                loadingFn(false)
                IntialApiCall()
            })
        } else {
            toast.success("Check Fields")
        }
        loadingFn(true)
    }
    const SaveHos = () => {
        const Type = Object.keys(HosSections)
        let Data = {}
        if (Type[0] === "Features") {
            Data = {
                main_type: "Hospital",
                features: Hosspecialities
            }
        } else {
            Data = {
                type: Type[0],
                main_type: "Doctor",
                department: Hosspecialities,
            }
        }
        if (Data?.main_type) {
            axios.post(`${port}/admin/addcategory`, Data).then((res) => {
                if (res?.data?.success)
                    toast.success(res?.data?.message);
                loadingFn(false)
                IntialApiCall()

            })
        } else {
            toast.info("Check Fields")
        }
        loadingFn(true)
    }
    const SaveLab = () => {
        const Type = Object.keys(LabSections)
        let Data = {}
        if (Type[0] === "Features") {
            Data = {
                main_type: "Laboratory",
                features: LabPrintingItems
            }
        } else {
            Data = {
                main_type: "Laboratory",
                services: LabPrintingItems
            }

        }
        if (Data?.main_type) {
            axios.post(`${port}/admin/addcategory`, Data).then((res) => {
                if (res?.data?.success)
                    toast.success(res?.data?.message);
                loadingFn(false)
                IntialApiCall()

            })
        } else {
            toast.info("Check Fields")
        }
        loadingFn(true)
    }


    const openModal = (type) => {
        if (ModalCondition?.open) {
            setModalCondition({ open: false })
        } else {
            setModalCondition({ open: true, type: type })
        }
    }

    const AddCategoryOnchange = (e) => {
        const value = e?.target?.value
        setModalCondition({ ...ModalCondition, value: value })
    }
    const AddCategory = () => {
        if (ModalCondition?.value) {
            if (ModalCondition?.type === "Hospital") {
                if (!Hosspecialities.includes(ModalCondition?.value)) {
                    let TempData = [...Hosspecialities]
                    TempData = [...TempData, ModalCondition?.value]
                    setHosspecialities(TempData)
                    setModalCondition({ open: false })
                    toast.info("Click the Save button to apply your changes")
                } else {
                    toast.info("This category has been already added")
                }

            } else if (ModalCondition?.type === "Doctor") {
                let TempData = [...Docspecialities]

                TempData = [...TempData, ModalCondition?.value]
                setDocspecialities(TempData)
                setModalCondition({ open: false })
                toast.info("Click the Save button to apply your changes")
            } else if (ModalCondition?.type === "Laboratory") {
                let TempData = [...LabPrintingItems]
                TempData = [...TempData, ModalCondition?.value]
                setLabPrintingItems(TempData)
                setModalCondition({ open: false })
                toast.info("Click the Save button to apply your changes")
            }
        } else {
            toast.info("Please enter values")
        }

    }

    console.log("DeletePopup>>>>", DeletePopup)


    const ConfirmDelete = () => {
        if (DeletePopup?.main_type === 'Hospital') {
            let TempData = [...Hosspecialities]
            TempData.splice(DeletePopup?.index, 1)
            setHosspecialities(TempData)
            toast.info("Click the Save button to apply your changes")
            closePopups()
        } else if (DeletePopup?.main_type === 'Doctor') {
            let TempData = [...Docspecialities]
            TempData.splice(DeletePopup?.index, 1)
            toast.info("Click the Save button to apply your changes")
            closePopups()
        } else if (DeletePopup?.main_type === 'Laboratory') {
            let TempData = [...LabPrintingItems]
            TempData.splice(DeletePopup?.index, 1)
            setLabPrintingItems(TempData)
            toast.info("Click the Save button to apply your changes")
            closePopups()
        }
    }

    return (
        <div className='MainAdminCategoryEdit'>
            <div className='MainAdminCategoryEditHeader'>
                <p>Edit Category</p>
            </div>

            {categories?.transformedData ?
                <>
                    <div className='MainAdminCategoryContent'>
                        <p className='MainAdminCategoryContentPtag'>Hospital</p>
                        <div className='MainAdminCatSetSec'>
                            <div className='MainAdminCatSetFirstSec'>
                                {categories?.allTypes?.map(sec =>
                                    <div onClick={() => { HosChangeSections(sec) }} className={!HosSections?.[sec] ? 'MainAdminCatSetFirstTile' : "MainAdminCatSetFirstTileBefore"}>
                                        <p>{sec}</p>
                                    </div>
                                )}
                                <div onClick={() => { HosChangeSections("Features") }} className={!HosSections?.["Features"] ? 'MainAdminCatSetFirstTile' : "MainAdminCatSetFirstTileBefore"}>
                                    <p>Features</p>
                                </div>
                            </div>
                            <div className='MainAdminCatSetSecondSec'>
                                <div className='MainAdminCatSetSecondSePtag'>
                                    <p>Speciality</p>
                                </div>

                                <div className='MainAdminCatSetSecondSecAlignItem'>
                                    {Hosspecialities.map((ele, index) =>
                                        ConditionForHos?.index !== index ?
                                            <div className='MainAdminCatSetSecondSecDivIcon'>
                                                {ConditionForHos?.edit &&
                                                    <i onClick={() => { OpenDeletePopup(index, "Hospital", ele) }} class="ri-close-line"></i>}
                                                <div onClick={() => { EditFnBox(index, ele) }} className='MainAdminCatSetSecondSecDiv'>
                                                    <p>{ele}</p>
                                                </div>
                                            </div>
                                            :
                                            ConditionForHos?.edit && ConditionForHos?.index == index &&
                                            < div className='MainAdminCatSetSecondSecDivIcon' >
                                                <i onClick={() => { OpenDeletePopup(index, "Hospital", ele) }} class="ri-close-line"></i>
                                                <input maxLength={90} onChange={(e) => { editHosSpeciality(e, index) }} value={ele} className='MainAdminCatSetSecondSecDiv' />
                                            </div>
                                    )}
                                </div>
                                <div className='MainAdminCatEditSec'>
                                    {ConditionForHos.edit &&
                                        <>
                                            <button className='MainAdminCatEditSecbtn3' onClick={() => { openModal('Hospital') }}>Add more</button>
                                            <button className='MainAdminCatEditSecbtn2' onClick={SaveHos}>Save</button>
                                        </>
                                    }
                                    {!ConditionForHos.edit &&
                                        <button className='MainAdminCatEditSecbtn1' onClick={EditFn}>Edit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='MainAdminCategoryContent'>
                        <p className='MainAdminCategoryContentPtag'>Doctor</p>
                        <div className='MainAdminCatSetSec'>
                            <div className='MainAdminCatSetFirstSec'>
                                {categories?.allTypes?.map(sec =>
                                    <div onClick={() => { DocChangeSections(sec) }} className={!DocSections?.[sec] ? 'MainAdminCatSetFirstTile' : "MainAdminCatSetFirstTileBefore"}>
                                        <p>{sec}</p>
                                    </div>
                                )}
                            </div>
                            <div className='MainAdminCatSetSecondSec'>
                                <div className='MainAdminCatSetSecondSePtag'>
                                    <p>Speciality</p>
                                </div>

                                <div className='MainAdminCatSetSecondSecAlignItem'>
                                    {Docspecialities.map((ele, index) =>
                                        ConditionForDoc?.index !== index ?
                                            <div className='MainAdminCatSetSecondSecDivIcon'>
                                                {ConditionForDoc?.edit &&
                                                    <i onClick={() => { OpenDeletePopup(index, "Doctor", ele) }} class="ri-close-line"></i>}
                                                <div onClick={() => { EditFnBoxDoc(index, ele) }} className='MainAdminCatSetSecondSecDiv'>
                                                    <p>{ele}</p>
                                                </div>
                                            </div>
                                            :
                                            ConditionForDoc?.edit && ConditionForDoc.index == index &&
                                            < div className='MainAdminCatSetSecondSecDivIcon' >
                                                <i onClick={() => { OpenDeletePopup(index, "Doctor", ele) }} class="ri-close-line"></i>
                                                <input maxLength={90} onChange={(e) => { editDocSpeciality(e, index) }} value={ele} className='MainAdminCatSetSecondSecDiv' />
                                            </div>
                                    )}
                                </div>
                                <div className='MainAdminCatEditSec'>
                                    {ConditionForDoc.edit &&
                                        <>
                                            <button className='MainAdminCatEditSecbtn3' onClick={() => { openModal('Doctor') }}>Add more</button>
                                            <button className='MainAdminCatEditSecbtn2' onClick={SaveDoc}>Save</button>
                                        </>
                                    }
                                    {!ConditionForDoc.edit &&
                                        <button className='MainAdminCatEditSecbtn1' onClick={EditFnDoc}>Edit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='MainAdminCategoryContent'>
                        <p className='MainAdminCategoryContentPtag'>Laboratory</p>
                        <div className='MainAdminCatSetSec'>
                            <div className='MainAdminCatSetFirstSec'>
                                <div onClick={() => { LabChangeSections("Services") }} className={!LabSections?.["Services"] ? 'MainAdminCatSetFirstTile' : "MainAdminCatSetFirstTileBefore"}>
                                    <p>Services</p>
                                </div>
                                <div onClick={() => { LabChangeSections("Features") }} className={!LabSections?.["Features"] ? 'MainAdminCatSetFirstTile' : "MainAdminCatSetFirstTileBefore"}>
                                    <p>Features</p>
                                </div>
                            </div>
                            <div className='MainAdminCatSetSecondSec'>
                                <div className='MainAdminCatSetSecondSePtag'>
                                    <p>{LabSections?.Services ? "Services" : "Features"}</p>
                                </div>

                                <div className='MainAdminCatSetSecondSecAlignItem'>
                                    {LabPrintingItems?.map((ele, index) =>
                                        ConditionForLab?.index !== index ?
                                            <div className='MainAdminCatSetSecondSecDivIcon'>
                                                {ConditionForLab?.edit &&
                                                    <i onClick={() => { OpenDeletePopup(index, "Laboratory", ele) }} class="ri-close-line"></i>}
                                                <div onClick={() => { EditFnBoxLab(index, ele) }} className='MainAdminCatSetSecondSecDiv'>
                                                    <p>{ele}</p>
                                                </div>
                                            </div>
                                            :
                                            ConditionForLab?.edit && ConditionForLab.index == index &&
                                            < div className='MainAdminCatSetSecondSecDivIcon' >
                                                <i onClick={() => { OpenDeletePopup(index, "Laboratory", ele) }} class="ri-close-line"></i>
                                                <input maxLength={90} onChange={(e) => { editLabSpeciality(e, index) }} value={ele} className='MainAdminCatSetSecondSecDiv' />
                                            </div>
                                    )}
                                </div>
                                <div className='MainAdminCatEditSec'>
                                    {ConditionForLab.edit &&
                                        <>
                                            <button className='MainAdminCatEditSecbtn3' onClick={() => { openModal('Laboratory') }}>Add more</button>
                                            <button className='MainAdminCatEditSecbtn2' onClick={SaveLab}>Save</button>
                                        </>
                                    }
                                    {!ConditionForLab.edit &&
                                        <button className='MainAdminCatEditSecbtn1' onClick={EditFnLab}>Edit</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal className='MainAdminCatEditSecModal' open={ModalCondition?.open} onClose={openModal}>
                        <>
                            <div className='MainAdminCatEditSecModalDiv'>
                                <p>Add Category</p>
                                <input maxLength={90} onChange={AddCategoryOnchange} type="text" placeholder='Input categories' />
                                <div className='MainAdminCatEditSecModalButton'>
                                    <button onClick={AddCategory}>Add</button>
                                </div>
                            </div>
                        </>
                    </Modal>
                    {DeletePopup?.delete &&
                        <Modal className='EditQuestionsModalSec' open={DeletePopup?.delete} onClose={closePopups}>
                            <div className='EditQuestionsModal'>
                                <DeleteIcon id="EditQuestionsDeleteIcon" />
                                <p>Are you sure you want to proceed with the removal?</p>
                                <div className='EditQuestionsModalFlex'>
                                    <button className='EditQuestionsModalFlex1' onClick={closePopups}>Close</button>
                                    <button className='EditQuestionsModalFlex2' onClick={ConfirmDelete} >Confirm</button>
                                </div>
                            </div>
                        </Modal>
                    }
                    {
                        Loading &&
                        < Loader />
                    }
                </>
                : <>
                    <Loader />
                </>
            }
        </div >



    )
}
