import React from 'react'
import { useAuth } from '../../../contextApi/auth'
import UserHeader from './UserHeader'
import AdminHeader from '../Headers/AdminHeader'


const Index = () => {
    const [auth]=useAuth();
  return (
    <>
    {
        auth.user && auth.user.isAdmin===true ? <AdminHeader/> : <UserHeader/>
    }
    </>
  )
}

export default Index