"use client"
import { useUser } from '@clerk/nextjs'
import { BarLoader,BarChart,Calendar,Clock } from 'react-spinners';
import React from 'react'

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];
const layout = ({children}) => {
    const isloaded = useUser();
  return (
    <div>
      {!isloaded &&<BarLoader width ={"100%"} color="#36d7b7"/>}

      <div>


        <aside>
    <nav><ul>
        {navItems.map((item)=>(

            <li key ={item.href}>
                <Link href ={item.href}>{item.label}</Link>
                {item.label}
            </li>
        ))}
        
        </ul></nav>

        </aside>
      </div>
      {children}
    </div>
  )
}

export default layout
