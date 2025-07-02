"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import EventForm from "./event-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

const CreateEventDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // search params are used to read the url params
  const searchParams = useSearchParams();

// whenever the window is rendered code logic is implemented   which is under the   useffect
  useEffect(() => {
    const create = searchParams.get("create");
    if (create === "true") {
      setIsOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setIsOpen(false);
    if (searchParams.get("create") === "true") {
        // It updates the browser's URL without reloading the page.
        //so basically it takes the currect pathname and update the browser url with it ,so that the query params are removed 
        // It updates the browser's URL without reloading the page.
        //✅ What are Query Parameters?

         // Query parameters are key-value pairs added to the end of a URL to pass data.
         // They start with a ? 
      router.replace(window?.location?.pathname);
    }
  };

  return (
    <>
{/* 
        //This button adds ?create=true to the URL.
//Triggers the useEffect above, which then opens the drawer. */}
      <Button
        variant="outline"
        onClick={() => router.push("?create=true")}
      >
      </Button>

      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>

          <EventForm onSubmitForm={handleClose} />

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateEventDrawer;
