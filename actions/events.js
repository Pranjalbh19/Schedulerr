"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { eventSchema } from "@/app/lib/validators";
// Simple this is an function getting data , if userid taken from auth , if it does not exist then throw an error
export async function createEvent(data){
    const {userId} =  await auth();
    if(!userId){
        throw new Error("Unauthorized")
    }


const validatedData = eventSchema.parse(data);

const user  =  await db.user.findUnique({
    where:{
        clerkUserId:userId
    },
})

if(!user){
    throw new Error("user not found")
}
const event = await db.event.create({
    data:{
        ...validatedData,
        userId:user.id,
    }
})
 return event;}
