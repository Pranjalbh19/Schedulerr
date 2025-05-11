"use client"

import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";
const UserMenu = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-12 h-15", // Sets width and height to 2.5rem
        },
      }}
    >
  <UserButton.MenuItems>
<UserButton.Link
label ="My Events"
labelIcon={<ChartNoAxesGantt size ={15}/>}
href ="/events"
></UserButton.Link>
<UserButton.Action label="manageAccount"></UserButton.Action>
  </UserButton.MenuItems>
  </UserButton>


  );
};

export default UserMenu;
