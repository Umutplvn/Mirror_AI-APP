import { useState, useContext } from "react";
import axios from "axios";
import defaultUser from "../assets/default.jpeg" 
import {FiRotateCw} from "react-icons/fi"
import {toastWarnNotify} from "../helper/ToastNotify"
import { AuthContext } from "../context/AuthContext";

const Mirror = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
const {currentUser}=useContext(AuthContext)


  const getImage = async(e) => {
if(currentUser){
  setLoading(false)

  const file = e?.target?.files[0];
  
  const formData = new FormData();
    formData.append("style", "anime");
    formData.append("photo", file);
  
  try {

   const response = await axios.post("https://public-api.mirror-ai.net/v2/generate", formData, {
        headers: {
          "X-Token": "2a55e7c085ee48b0ac185dbb010effb4",
          "Content-Type": "multipart/form-data",
        },
      })
      setPhoto(response?.data?.face)

  } catch (error) {
console.log(error);
  }finally{
    setLoading(true)
  }
}else{
  toastWarnNotify("Please login first!")
}

}
   

  return (
    <>

    <div className="h-screen flex flex-col gap-[2rem] items-center   bg-indigo-200">
        <div>
        <input type="file"   accept="image/jpg, image/png" className="file-input file-input-bordered w-full max-w-xs" 
        onClick={()=>setPhoto(null)} onChange={getImage}/>
        </div>
      <img src={photo?.url || defaultUser} alt="Icon"  className="w-[300px] rounded-lg"/>
      <h2 className="text-black">{loading ? "Please upload only JPG or PNG!" : <FiRotateCw className="text-black animate-spin text-lg"/> }</h2>
    </div>
    </>
  );
};

export default Mirror;
