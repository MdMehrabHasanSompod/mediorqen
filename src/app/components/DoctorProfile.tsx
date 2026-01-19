"use client"
import { useDoctorStore } from '@/src/store/doctor.store';
import axios from 'axios';
import { Loader2, LogOut, MenuSquare, PlusCircle, RotateCcw, Settings, Trash2, UploadIcon, User, Wrench, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent,useState } from 'react'

interface IQualification {
  degree: string;
  institution: string;
}

type propType = {
  setOpenMobileSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

const DoctorProfile = ({setOpenMobileSidebar}:propType) => {
  const doctor = useDoctorStore((state)=>state.doctor)
  const session = useSession()
  const setDoctor = useDoctorStore((state)=>state.setDoctor)
  const [updateProfile,setUpdateProfile] = useState<boolean>(false)
  const [updatedAvatar,setUpdatedAvatar] = useState<File | null >(null)
  const [displayUpdatedAvatar, setDisplayUpdatedAvatar] = useState<string | undefined>(doctor?.image as string | undefined)
  const [updatedName,setUpdatedName] = useState<string>(doctor?.name as string || "")
  const [updatedPhone,setUpdatedPhone] = useState<string>(doctor?.phone as string || "")
  const [updatedFees,setUpdatedFees] = useState<number>(doctor?.fees as number)
  const [updateLoading,setUpdateLoading] =  useState<boolean>(false)
  const [addAccountLoading,setAddAccountLoading] =  useState<boolean>(false)
  const [deleteLoading,setDeleteLoading] =  useState<boolean>(false)
  const [removeAvatar, setRemoveAvatar] = useState<boolean>(false);
  const router = useRouter();
  const [qualifications, setQualifications] = useState<IQualification[]>(doctor?.qualifications || []);
  const [draftQualification, setDraftQualification] = useState<IQualification>({
      degree: "",
      institution: "",
    });
    const [qualificationError, setQualificationError] = useState("");
  
    const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setDraftQualification((prev) => ({ ...prev, [name]: value }));
    };
  
    const addQualification = () => {
      if (
        !draftQualification.degree.trim() ||
        !draftQualification.institution.trim()
      ) {
        setQualificationError("Both degree and institution are required");
        return;
      }
  
      setQualifications((prev) => [...prev, draftQualification]);
      setDraftQualification({ degree: "", institution: "" });
      setQualificationError("");
    };
  
    const removeQualification = (index: number) => {
      setQualifications((prev) => prev.filter((_, i) => i !== index));
    };

    const removeImage = () => {
      setDisplayUpdatedAvatar(undefined);
      setUpdatedAvatar(null);
      const input = document.getElementById("image") as HTMLInputElement | null;
      if (input) input.value = "";
      setRemoveAvatar(true);
    };
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const file = files[0];
      setUpdatedAvatar(file);
      setDisplayUpdatedAvatar(URL.createObjectURL(file));
    };
  
  const handleUserUpdate = async(e:FormEvent) => {
    e.preventDefault()
    try {
      setUpdateLoading(true)
      const formData = new FormData();
     if (doctor?._id) formData.append("id",doctor._id)
     if (updatedName !== doctor?.name) formData.append("updatedName", updatedName);
     if (updatedPhone !== doctor?.phone) formData.append("updatedPhone", updatedPhone);
     if (updatedFees !== doctor?.fees) formData.append("updatedFees", updatedFees.toString());
     if (updatedPhone !== doctor?.phone) formData.append("updatedPhone", updatedPhone);
     if (updatedAvatar) formData.append("updatedAvatar", updatedAvatar);
     if (removeAvatar) formData.append("removeAvatar", "true");
      
      const result = await axios.patch("/api/user/update-user",formData)

      console.log(result);

      if(result.data.success){
        setDoctor(result.data.updatedDoctor)
        setUpdatedName(result.data.updatedDoctor.name || "");
        setUpdatedPhone(result.data.updatedDoctor.phone || "");
        setDisplayUpdatedAvatar(result.data.updatedDoctor.image || undefined);
        setUpdatedAvatar(null); 
        setRemoveAvatar(false);
      }
      
      setUpdateLoading(false)
      setUpdateProfile(false)


    } catch (error) {
      setUpdateLoading(false)
      console.log(error);
    }
  }

const handleAddAccount = async () => {
  setAddAccountLoading(true)
  await signOut({ redirect: false });
  router.push("/register");
  setAddAccountLoading(false)
};

const handleDeleteAccount = async() => {
     setDeleteLoading(true)
  try {
    const result = await fetch(`/api/user/delete-account?id=${doctor?._id}&role=${session.data?.user.role}`,{method:"DELETE"})
    setDeleteLoading(false) 
    if(result.ok){
      await signOut({ redirect: false });
       router.push("/")
    }
 
  } catch (error) {
    console.log(error);
    setDeleteLoading(false)
  }
}

const handleCancelUpdate = () => {
  setUpdateProfile(false);
  setUpdatedName(doctor?.name || "");
  setUpdatedPhone(doctor?.phone || "");
  setUpdatedFees(doctor?.fees || 0);
  setDisplayUpdatedAvatar(doctor?.image || undefined);
  setUpdatedAvatar(null);
  setRemoveAvatar(false);
  setQualifications(doctor?.qualifications || []);
  setDraftQualification({ degree: "", institution: "" });
  setQualificationError("");
};

  return (
   <div className='w-full mx-auto'>
      <h1 className='text-xl md:text-2xl lg:text-3xl text-blue-900 font-semibold  bg-blue-300 w-full py-4 px-8 shadow-md rounded-md my-2 flex items-center justify-between gap-4'>Doctor Profile<MenuSquare size={30} className='block lg:hidden cursor-pointer' onClick={()=>setOpenMobileSidebar(prev=> !prev)}/></h1>
      <div className='w-full flex flex-col md:flex-row mt-10 gap-4'>
      <div className='m-2 flex flex-col flex-1 gap-3'>
      <div className='bg-blue-200 p-6 rounded-lg flex flex-col gap-2'>
       {updateProfile ? (<>
          <div className='bg-blue-50 p-6 rounded-lg flex flex-col gap-3'>
            <div>
              <input
                type="text"
                name="updatedName"
                placeholder="New Name"
                className="form-input"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="updatedPhone"
                placeholder="New Phone"
                className="form-input"
                value={updatedPhone}
                onChange={(e) => setUpdatedPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Appointment Fees ($)</h3>
              <input
                type="number"
                placeholder="Consultation Fees"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-sm"
                value={updatedFees}
                onChange={(e) => setUpdatedFees(Number(e.target.value))}
                required
              />
            </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Add Qualifications</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                name="degree"
                placeholder="Degree (e.g. MBBS)"
                value={draftQualification.degree}
                onChange={handleDraftChange}
                className="form-input"
              />

              <input
                type="text"
                name="institution"
                placeholder="Institution"
                value={draftQualification.institution}
                onChange={handleDraftChange}
                className="form-input"
              />
            </div>

            <button
              type="button"
              onClick={addQualification}
              className="w-full md:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-500 hover:border-blue-600 rounded-lg transition"
            >
              <PlusCircle size={18} /> Add Qualification
            </button>
            
            {qualificationError && (
              <p className="text-xs text-red-500 mt-2">{qualificationError}</p>
            )}

            <div className="mt-4 space-y-2">
              {qualifications.map((q, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {q.degree}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{q.institution}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-md transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>            
            <div className='mt-3'>
             <h3 className="text-lg font-semibold text-gray-700 mb-3">Update Avatar</h3>
                        <div className="flex flex-col md:flex-row items-center gap-6">
                          <label
                            htmlFor="image"
                            className="flex cursor-pointer items-center justify-center gap-2  rounded-lg border-2 border-gray-300 px-5 py-3 text-md font-medium text-gray-600 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition w-full md:w-auto"
                          >
                            <UploadIcon size={18} />
                            Upload New Avatar
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            id="image"
                            hidden
                            onChange={handleImageChange}
                          />
                          
                          {displayUpdatedAvatar && (
                            <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md border-2 border-blue-600">
                              <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 cursor-pointer right-2 z-10 text-red-500 hover:text-red-700 bg-white p-1.5 rounded-full shadow-sm transition"
                              >
                                <Trash2 size={18} />
                              </button>
                              <Image
                                src={displayUpdatedAvatar}
                                alt="Doctor preview"
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className='my-10 flex items-center justify-around gap-3'>
                        <button onClick={handleCancelUpdate} className='bg-red-500 shadow-md px-4 py-2 rounded-md text-white font-semibold cursor-pointer hover:bg-red-600'>Cancel Update</button>
                        <button onClick={handleUserUpdate} className='bg-green-500 shadow-md px-4 py-2 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-green-600'>{updateLoading && <Loader2 size={18} className='animate-spin' />}Save Update</button>
                      </div>
          </div>
       </>) :(<>
       <div className='bg-blue-200 p-6 rounded-lg flex flex-col gap-2'>
          <div className="w-36 h-36 sm:w-40 sm:h-40 mt-6 lg:w-50 lg:h-50 rounded-full overflow-hidden border-4 border-blue-400 mb-5 mx-auto">
            {doctor?.image ? <Image className="object-cover w-full h-full" src={doctor?.image} alt={doctor?.name} width={200} height={200}/>
            :<User  className="object-cover w-full h-full bg-blue-600 text-white"/>
          }
          </div>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Name:</span> {doctor?.name}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Speciality:</span> {doctor?.speciality}</p>
          <div>
            <p className="font-semibold text-xl text-blue-900">Qualifications:</p>
                  <div className="flex  flex-col items-start gap-2 my-2">
                    {qualifications.map((q, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white inline-flex   text-sm px-3 py-1 rounded-full shadow"
                      >
                        {q.degree} — {q.institution}
                      </span>
                    ))}
                  </div>
                </div>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Appointment Fees:</span> ${doctor?.fees}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Email:</span> {doctor?.email}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Phone:</span> {doctor?.phone === undefined ? "Not Provided":doctor?.phone}</p>
          <p className='text-xl text-blue-900'><span className='font-semibold'>Joined At:</span> {doctor?.userId.createdAt ? new Date(doctor.userId.createdAt).toLocaleDateString("en-US"):""}</p>
          <button onClick={()=>setUpdateProfile(true)} className='bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-center px-4 py-3 mt-2 cursor-pointer text-md font-semibold'>Update Profile</button>
         </div>
          </>
        )}
     </div>
      </div>
      <div className='m-2 flex flex-col gap-2 flex-1 bg-blue-200 rounded-md p-2'>
      <div className='my-10'>
        <h2 className='text-blue-900 text-2xl font-semibold text-center flex items-center justify-center gap-1'><Wrench size={24}/> Manage Account</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
          <button onClick={()=> signOut()} className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'><LogOut size={18}/>Logout Now</button>
          <button onClick={handleAddAccount} className='bg-yellow-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-yellow-600'>{addAccountLoading?<Loader2 size={18} className='animate-spin' />: <PlusCircle size={18}/>} Add Account</button>
        </div>
     </div>
     <hr className="text-blue-500 bg-blue-500 h-0.5" />
     <div className='mt-10'>
        <h2 className='text-blue-900 text-2xl font-semibold text-center flex items-center justify-center gap-1'><Settings size={24}/> Account Settings</h2>
        <div className='flex flex-col md:flex-row items-center justify-center gap-6 mt-10'>
          <button onClick={()=>router.push("/user/reset-password")} className='bg-blue-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-blue-600'><RotateCcw size={18}/> Reset Password</button>
          <button onClick={handleDeleteAccount} className='bg-red-500 shadow-md p-3 rounded-md flex items-center justify-center gap-1 text-white font-semibold cursor-pointer hover:bg-red-600'>{deleteLoading?<Loader2 size={18} className='animate-spin' />: <Trash2 size={18}/>}  Delete Account</button>
        </div>
     </div>
   
      </div>
    </div>
    </div>
  )
}

export default DoctorProfile