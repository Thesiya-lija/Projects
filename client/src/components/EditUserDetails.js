import React, { useEffect, useRef, useState } from 'react';
import uploadFile from '../helpers/uploadFile';
import Avtar from './Avtar';
import Devider from './Devider';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

function EditUserDetails({ onClose, user }) {
  const [data, setData] = useState({
    
    name: user?.name,
    profile_pic: user?.profile_pic,
  });

  const uploadPhotoRef = useRef();
const dispatch=useDispatch()

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      ...user,
    }));
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadPhoto = await uploadFile(file);
        setData((prev) => ({
          ...prev,
          profile_pic: uploadPhoto?.url,
        }));
      } catch (error) {
        toast.error('Failed to upload photo');
        console.error('Upload error:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-user`;
      const response = await axios({
method:"post",
url:URL,
data:data,
withCredentials:true
      });
      toast.success(response.data.message);
      console.log('response', response);
      if(response.data.success)
      {
dispatch(setUser(response.data.data))
onClose()
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error('Submission error:', error);
    }
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
      <div className='bg-white p-4 py-6 m-1 w-full max-w-sm rounded'>
        <h2 className='font-semibold'>Profile Details</h2>
        <p className='text-sm'>Edit User Details</p>
        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>
              Name:
              <input
                type='text'
                name='name'
                id='name'
                value={data.name}
                onChange={handleOnChange}
                className='w-full py-1 px-2 focus:outline-teal-600 border-0.5'
              />
            </label>
          </div>

          <div>
            <div>Photo:</div>
            <div className='my-1 flex items-center gap-4'>
              <Avtar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
              />
              <button
                type='button'
                className='font-semibold'
                onClick={handleOpenUploadPhoto}
              >
                Change Photo
              </button>
              <input
                type='file'
                id='profile_pic'
                className='hidden'
                ref={uploadPhotoRef}
                onChange={handleUploadPhoto}
              />
            </div>
          </div>

          <Devider />
          <div className='flex gap-2 w-fit ml-auto'>
            <button
              type='button'
              onClick={onClose}
              className='border-teal-400 border text-teal-400 px-4 py-1 rounded'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='border-teal-400 border bg-teal-400 text-white px-4 py-1 rounded'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(EditUserDetails);
