import React from 'react'
import Avtar from './Avtar';
import {Link} from 'react-router-dom'
function UserCard({user,onClose}) {
  return (
    <Link to={"/"+user?._id}  onClick ={onClose}className='flex items-center gap-3 p-2 border lg:p-4 border-transparent border-t-slate-300 hover:border-green-300 rounded cursor-pointer'>
<div>
    <Avtar width={50} height={50} name={user?.name} userId={user?._id}/>
    </div>
<div>
<div className='font-semibold  text-ellipsis  line-clamp-1'>
    {user.name}
</div>
<p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
</div>

    </Link>
  )
}

export default UserCard