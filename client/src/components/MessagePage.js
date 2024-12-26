// // import React, { useEffect, useState } from 'react';
// // import { useSelector } from 'react-redux';
// // import { useParams } from 'react-router-dom';
// // import Avtar from './Avtar';

// // function MessagePage() {
// //   const params = useParams();
// //   const socketConnection = useSelector(state => state?.user?.socketConnection);
// //   const [dataUser, setDataUser] = useState({
// //     _id: "",
// //     name: "",
// //     email: "",
// //     profile_pic: "",
// //     online: false
// //   });

// //   useEffect(() => {
// //     if (socketConnection) {
// //       socketConnection.emit('message-page', params.userId);
// //       socketConnection.on('message-user', (data) => {
// //         console.log("Received user data:", data);
// //         setDataUser(data);
// //       });
// //     }

// //     // Clean up the socket event listener when the component unmounts or params.userId changes
// //     // return () => {
// //     //   if (socketConnection) {
// //     //     socketConnection.off('message-user');
// //     //   }
// //     // };
// //   }, [socketConnection, params?.userId]);

// //   return (
// //     <div>
// //       <header className='sticky top-0 h-16 bg-white'>
// //         <div>
// //           <Avtar width={50} height={50} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id} />
// //           <h3>{dataUser?.name}</h3>
// //           <p>{dataUser.online ? 'Online' : 'Offline'}</p> {/* Display online status */}
// //         </div>
// //       </header>
// //     </div>
// //   );
// // }

// // export default MessagePage;
// import { FaPlus } from "react-icons/fa6";
// import backgroundImg from '../assests/wallapaper.jpeg'
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import Avtar from './Avtar';
// import { HiDotsVertical } from "react-icons/hi";
// import { IoMdSend } from "react-icons/io";
// import Loading from './Loading';
// import moment from 'moment'
// function MessagePage() {
//   const params = useParams();
//   const socketConnection = useSelector(state => state.user.socketConnection);
//   const user = useSelector(state => state?.user)
//   const [dataUser, setDataUser] = useState({
//     _id: "",
//     name: "",
//     email: "",
//     profile_pic: "",
//     online: false
//   });
//   const [message, setMessage] = useState({
//     text: "",

//   })
//   const [loading, setLoading] = useState(false)

//   const [allMessages, setAllMessages] = useState([]);  // Corrected state variable name
//   useEffect(() => {
//     if (socketConnection) {
//       socketConnection.emit('message-page', params.userId);
//       socketConnection.on('message-user', (data) => {
//         console.log('Received user data:', data);
//         setDataUser(data);
//       });
//       socketConnection.on('message', (data) => {
//         console.log('message-data', data);
//         setAllMessages(data)

//       })
//     }

//     // Clean up the socket event listener when the component unmounts or params.userId changes
//     return () => {
//       if (socketConnection) {
//         socketConnection.off('message-user');
//       }
//     };
//   }, [socketConnection, params?.userId, user]);



//   const handleOnChange = (e) => {
//     const { name, value } = e.target
//     setMessage(prev => {
//       return {
//         ...prev,
//         text: value
//       }
//     })

//   }
//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (message.text) {
//       if (socketConnection) {
//         socketConnection.emit('new message', {
//           sender: user?._id,
//           receiver: params.userId,
//           text: message.text,
//           msgByUserId: user?._id
//         })

//         setMessage({ text: "" })
//       }
//     }
//   }
//   return (
//     <div style={{ backgroundImage: `url(${backgroundImg})` }} className="bg-no-repeat bg-cover">
//       <header className='sticky top-0 h-16 bg-white  flex justify-between items-center px-4'>
//         <div className='flex items-center gap-4'>
//           <div>
//             <Avtar width={50} height={50} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id} />
//           </div>
//           <div>
//             <h3 className='font-semibold my-0 text-lg text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
//             <p className='-my-2'> {dataUser.online ? 'Online' : 'Offline'}</p> {/* Display online status */}
//           </div>
//         </div>
//         <div >

//           <button className='cursor-pointer'>
//             <HiDotsVertical />

//           </button>        </div>
//       </header>


//       <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
//       {
//                     loading && (
//                       <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
//                         <Loading/>
//                       </div>
//                     )
//                   }
// <div className="flex flex-col gap-2 py-2">
//           {Array.isArray(allMessages) && allMessages.map((msg, index) =>{
// return (
//   <div className={`bg-white p-3 py-1 rounded w-fit ${user._id===msg.msgByUserId ? "ml-auto":" bg-white"}`}>
//   <p className="px-2">{msg.text}</p>
//     <p className="text-xs ml-auto w-fit">{moment(msg.createAt).format('hh:mm')}</p>
// </div>
// )
//           } 
          
//           )}
//         </div>

//       </section>
//       <section className='h-16  bg-white flex items-center'>
//         <div>
//           <button className="flex justify-center items-center w-14 h-14 rounded-full">
//             <FaPlus size={20} />
//           </button>
//         </div>
//         <form className="h-full w-full  flex gap-2 " onSubmit={handleSendMessage}>

//           <input type="text" placeholder="Enter you message" className="py-1  px-4 outline-none w-full h-full" value={message.text} onChange={handleOnChange} />
//           <button className="hover:text-green-400">
//             <IoMdSend size={28} />
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }

// export default MessagePage;



import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import { FaTrash, FaChevronDown } from "react-icons/fa";  
import moment from 'moment';
import Avtar from './Avtar';
import Loading from './Loading';
import backgroundImg from '../assests/wallapaper.jpeg';

function MessagePage() {
  const params = useParams();
  const socketConnection = useSelector(state => state.user.socketConnection);
  const user = useSelector(state => state.user);
  const [dataUser, setDataUser] = useState({
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    online: false
  });
  const [message, setMessage] = useState({ text: "" });
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);
      socketConnection.on('message-user', (data) => {
        console.log('Received user data:', data);
        setDataUser(data);
      });
      socketConnection.on('message', (data) => {
        console.log('Received messages:', data);
        setAllMessages(data);
      });

      return () => {
        if (socketConnection) {
          socketConnection.off('message-user');
          socketConnection.off('message');
        }
      };
    }
  }, [socketConnection, params.userId, user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setMessage(prev => ({
      ...prev,
      text: value
    }));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.text.trim()) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          msgByUserId: user?._id
        });

        setMessage({ text: "" });
      }
    }
  };

  const handleDeleteMessage = (messageId) => {
    if (socketConnection) {
      socketConnection.emit('delete message', {
        messageId,
        sender: user._id,
        receiver: params.userId,
      });
    }
  };

  const toggleDropdown = (messageId) => {
    setOpenDropdown(openDropdown === messageId ? null : messageId);
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImg})` }} className="bg-no-repeat bg-cover">
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <div>
            <Avtar width={50} height={50} imageUrl={dataUser?.profile_pic} name={dataUser?.name} userId={dataUser?._id} />
          </div>
          <div>
            <h3 className='font-semibold my-0 text-lg text-ellipsis line-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2'>{dataUser.online ? 'Online' : 'Offline'}</p>
          </div>
        </div>
        <div>
          <button className='cursor-pointer'>
            <HiDotsVertical />
          </button>
        </div>
      </header>

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
        {loading && (
          <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
            <Loading />
          </div>
        )}
        <div className="flex flex-col gap-2 py-2">
          {Array.isArray(allMessages) && allMessages.map((msg, index) => (
            <div key={msg._id} className={`relative bg-white p-3 py-1 rounded w-fit ${user._id === msg.msgByUserId ? "ml-auto" : ""}`}>
              <div className="flex items-center justify-between">
                <p className="px-2">{msg.text}</p>
                {user._id === msg.msgByUserId && (
                  <>
                    <button className="ml-2" onClick={() => toggleDropdown(msg._id)}>
                      <FaChevronDown />
                    </button>
                    {openDropdown === msg._id && (
                      <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded shadow-md">
                        <ul>
                          <li
                            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => {
                              handleDeleteMessage(msg._id);
                              setOpenDropdown(null);  
                            }}
                          >
                            <FaTrash className="mr-2" /> Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
              <p className="text-xs ml-auto w-fit">{moment(msg.createdAt).format('hh:mm')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className='h-16 bg-white flex items-center'>
        <div>
          <button className="flex justify-center items-center w-14 h-14 rounded-full">
            <FaPlus size={20} />
          </button>
        </div>
        <form className="h-full w-full flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Enter your message"
            className="py-1 px-4 outline-none w-full h-full"
            value={message.text}
            onChange={handleOnChange}
          />
          <button className="hover:text-green-400">
            <IoMdSend size={28} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default MessagePage;

