"use client";
import Link   from 'next/link';
import { Trash2 } from 'lucide-react';
import { Button } from './button';
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card , CardTitle,CardDescription,CardFooter, CardHeader,CardContent } from './card';
import { deleteEvent } from '@/actions/events';
import usefetch from '@/hooks/use-fetch';





export default function EventCard ({event, username, isPublic = false})  {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window?.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

 const {loading,fn:fnDeleteEvent } = usefetch(deleteEvent)
 const handleDelete = async ()=>{
  if(window?.confirm("Are you sure darling")){
 await fnDeleteEvent(event.id);
 router.refresh();
  }
 }



 const handleCardClick = (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
      window?.open(
        `${window?.location.origin}/${username}/${event.id}`,
        "_blank"
      );
    }
  };

  return (
    <div>
<Card className = "flex flex-col justify-between cursor-pointer" onClick={handleCardClick}>
  <CardHeader>
    <CardTitle className = "text-2xl">{event.title}</CardTitle>
    <CardDescription className = "flex justify-between"> <span>{event.duration } mins | {event.isPrivate?"Private" : "Public "}</span>
    <span>{event._count.bookings} Bookings</span>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>{event.description.substring(0,event.description.indexOf("."))}</p>
  </CardContent>
 
    {!isPublic && (
     <CardFooter className = "  ">
        <Button variant = "outline"
        className = "flex items-center"
          onClick = {handleCopy}
>          
          <Link  href = "" className="mr-5 h-4 w-4 gap-2"/>{" "}
          {isCopied ? "Copied!" : "Copy link"}
</Button>
       <Button variant = "destructive" onClick = {handleDelete}
        disabled = {loading}
       >
        
        <Trash2 className = "ml-2 h-4 w-4"/>
        Delete
       </Button>
 {"  "}
      <p className='ml-10'></p>
  </CardFooter>
    )}
    
</Card>
    </div>
  )
}

