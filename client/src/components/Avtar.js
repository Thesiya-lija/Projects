// import React from 'react'
// import { PiUserCircle } from 'react-icons/pi'
// import { useSelector } from 'react-redux'


// function Avtar({ userId, name, width, height, imageUrl }) {
//     const onlineUser = useSelector(state => state?.user?.onlineUser)
//     console.log("online users", onlineUser);
//     let avtarName = ""
//     if (name) {
//         const splitName = name?.split(" ")
//         if (splitName.length > 1) {
//             avtarName = splitName[0][0] + splitName[1][0]
//         }
//         else {
//             avtarName = splitName[0][0]
//         }
//     }
//     const bgColor = [
//         'bg-slate-200',
//         'bg-teal-200',
//         'bg-red-200',
//         'bg-green-200',
//         'bg-yellow-200',
//         'bg-gray-200',
//         "bg-cyan-200",
//         "bg-sky-200",
//         "bg-blue-200"
//     ]
// const isOnline=onlineUser.includes(userId)
// console.log("online",isOnline);
//     const randomNumber = Math.floor(Math.random() * 9)
//     return (
//         <div className={`text-slate-800  rounded-full text-xl font-bold relative `} style={{ width: width + "px", height: height + "px" }} >
//             {
//                 imageUrl ? (
//                     <img src={imageUrl}
//                         width={width} height={height} alt={name} className='overflow-hidden rounded-full' />
//                 ) : (
//                     name ? (
//                         <div style={{ width: width + "px", height: height + "px" }} className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]}`}>
//                             {avtarName}
//                         </div>
//                     ) : (
//                         <PiUserCircle size={width} />
//                     )
//                 )
//             }
//             {
//                 isOnline &&(
//                     <div className='bg-green-400 p-1 absolute bottom-2 -right-2 z-10 rounded-full'></div>
//                 )
//             }
//         </div>
//     )
// }

// export default Avtar

import React from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { useSelector } from 'react-redux';

function Avtar({ userId, name, width, height, imageUrl }) {
  const onlineUser = useSelector(state => state.user.onlineUser);
  console.log('Online users:', onlineUser);

  let avtarName = "";
  if (name) {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
      avtarName = splitName[0][0] + splitName[1][0];
    } else {
      avtarName = splitName[0][0];
    }
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    'bg-cyan-200',
    'bg-sky-200',
    'bg-blue-200'
  ];

  const isOnline = onlineUser.includes(userId);
  console.log(`User ID: ${userId} is online: ${isOnline}`);

  const randomNumber = Math.floor(Math.random() * 9);
  return (
    <div className={`text-slate-800 rounded-full text-xl font-bold relative`} style={{ width: width + "px", height: height + "px" }}>
      {
        imageUrl ? (
          <img src={imageUrl}
            width={width} height={height} alt={name} className='overflow-hidden rounded-full' />
        ) : (
          name ? (
            <div style={{ width: width + "px", height: height + "px" }} className={`overflow-hidden rounded-full flex justify-center items-center ${bgColor[randomNumber]}`}>
              {avtarName}
            </div>
          ) : (
            <PiUserCircle size={width} />
          )
        )
      }
      {
        isOnline && (
          <div className='bg-green-400 p-1 absolute bottom-2 -right-2 z-10 rounded-full'></div>
        )
      }
    </div>
  );
}

export default Avtar;
