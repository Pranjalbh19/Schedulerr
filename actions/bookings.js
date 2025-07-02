// "use server";

// import { db } from "@/lib/prisma";
// import { google } from "googleapis";
// import axios from "axios";

// export async function createBooking(bookingData) {
//   try {
//     // 1. Fetch the event and its creator
//     const event = await db.event.findUnique({
//       where: { id: bookingData.eventId },
//       include: { user: true },
//     });

//     if (!event) {
//       throw new Error("Event not found");
//     }
// console.log("clerkUserId from event:", event.user.clerkUserId);

//     // 2. Fetch Google OAuth token from Clerk REST API using the Clerk Secret Key
//     const response = await axios.get(
//       `https://api.clerk.com/v1/users/${event.user.clerkUserId}/oauth_access_tokens`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         },
//       }
//     );

//     const token = response.data[0]?.token;

//     if (!token) {
//       throw new Error("Event creator has not connected Google Calendar");
//     }

//     // 3. Set up Google OAuth client
//     const oauth2Client = new google.auth.OAuth2();
//     oauth2Client.setCredentials({ access_token: token });

//     const calendar = google.calendar({ version: "v3", auth: oauth2Client });

//     // 4. Create Google Calendar event + Meet link
//     const meetResponse = await calendar.events.insert({
//       calendarId: "primary",
//       conferenceDataVersion: 1,
//       requestBody: {
//         summary: `${bookingData.name} - ${event.title}`,
//         description: bookingData.additionalInfo,
//         start: { dateTime: bookingData.startTime },
//         end: { dateTime: bookingData.endTime },
//         attendees: [
//           { email: bookingData.email },
//           { email: event.user.email },
//         ],
//         conferenceData: {
//           createRequest: { requestId: `${event.id}-${Date.now()}` },
//         },
//       },
//     });

//     const meetLink = meetResponse.data.hangoutLink;
//     const googleEventId = meetResponse.data.id;

//     // 5. Save booking in database
//     const booking = await db.booking.create({
//       data: {
//         eventId: event.id,
//         userId: event.userId,
//         name: bookingData.name,
//         email: bookingData.email,
//         startTime: bookingData.startTime,
//         endTime: bookingData.endTime,
//         additionalInfo: bookingData.additionalInfo,
//         meetLink,
//         googleEventId,
//       },
//     });

//     return { success: true, booking, meetLink };
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     return { success: false, error: error.message };
//   }
// 
"use server";

import { google } from "googleapis";
import { db } from "@/lib/prisma";
import { createClerkClient } from "@clerk/backend"; 

export async function createBooking(bookingData) {
  try {
    // 1. Get the event and its owner from DB
    const event = await db.event.findUnique({
      where: { id: bookingData.eventId },
      include: { user: true },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // 2. Initialize Clerk admin client
    const clerk = createClerkClient({
      secretKey: process.env.CLERK_SECRET_KEY, 
    });

    // 3. Get the user's Google OAuth token
    const { data } = await clerk.users.getUserOauthAccessToken(
      event.user.clerkUserId,     // user ID stored in your DB
      "oauth_google"              // strategy
    );

    const token = data?.[0]?.token;

    if (!token) {
      throw new Error("Event creator has not connected Google Calendar");
    }

    // 4. Set up Google OAuth client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // 5. Create the Google Calendar event + Meet link
    const meetResponse = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: `${bookingData.name} - ${event.title}`,
        description: bookingData.additionalInfo,
        start: { dateTime: bookingData.startTime },
        end: { dateTime: bookingData.endTime },
        attendees: [
          { email: bookingData.email },
          { email: event.user.email },
        ],
        conferenceData: {
          createRequest: { requestId: `${event.id}-${Date.now()}` },
        },
      },
    });

    const meetLink = meetResponse.data.hangoutLink;
    const googleEventId = meetResponse.data.id;

    // 6. Save the booking in your database
    const booking = await db.booking.create({
      data: {
        eventId: event.id,
        userId: event.userId,
        name: bookingData.name,
        email: bookingData.email,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        additionalInfo: bookingData.additionalInfo,
        meetLink,
        googleEventId,
      },
    });

    return { success: true, booking, meetLink };

  } catch (error) {
    console.error("Error creating booking:", error);
    return { success: false, error: error.message };
  }
}
