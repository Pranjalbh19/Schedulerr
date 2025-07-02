"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { addMinutes, format } from "date-fns";

export async function getEventAvailability(eventId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      availability: {
        include: { days: true },
      },
    },
  });

  if (!user || !user.availability) return null;

  const availabilityData = { timeGap: user.availability.timeGap };

  [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].forEach((day) => {
    const dayAvailability = user.availability.days.find(
      (d) => d.day === day.toUpperCase()
    );
    availabilityData[day] = {
      isAvailable: !!dayAvailability,
      startTime: dayAvailability
        ? dayAvailability.startTime.toISOString().slice(11, 16)
        : "09:00",
      endTime: dayAvailability
        ? dayAvailability.endTime.toISOString().slice(11, 16)
        : "17:00",
    };
  });

  return availabilityData;
}

export async function getUpcomingAvailability(eventId) {
  if (!eventId) throw new Error("Event ID is required");

  const event = await db.event.findUnique({
    where: { id: eventId },
    include: {
      user: {
        include: {
          availability: {
            select: { days: true, timeGap: true },
          },
          bookings: {
            select: { startTime: true, endTime: true },
          },
        },
      },
    },
  });

  if (!event || !event.user || !event.user.availability) return [];

  const availabilityDays = event.user.availability.days;
  const timeGap = event.user.availability.timeGap;
  const existingBookings = event.user.bookings;

  const upcomingAvailability = [];

  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayName = format(date, "EEEE").toUpperCase();
    const availableDay = availabilityDays.find((d) => d.day === dayName);

    if (availableDay) {
      const slots = [];
      const baseDate = format(date, "yyyy-MM-dd");

      const [startHour, startMinute] = availableDay.startTime
        .toISOString()
        .slice(11, 16)
        .split(":");
      const [endHour, endMinute] = availableDay.endTime
        .toISOString()
        .slice(11, 16)
        .split(":");

      let currentTime = new Date(`${baseDate}T${startHour}:${startMinute}`);
      const endTime = new Date(`${baseDate}T${endHour}:${endMinute}`);

      while (currentTime < endTime) {
        const currentISO = currentTime.toISOString();
        const isBooked = existingBookings.some(
          (b) => new Date(b.startTime).toISOString() === currentISO
        );

        if (!isBooked) {
          slots.push(format(currentTime, "HH:mm"));
        }

        currentTime = addMinutes(currentTime, timeGap);
      }

      if (slots.length > 0) {
        upcomingAvailability.push({
          date: baseDate,
          slots,
        });
      }
    }
  }

  return upcomingAvailability;
}

export async function updateAvailability(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: { availability: true },
  });

  if (!user) throw new Error("User not found");

  const availabilityData = Object.entries(data).flatMap(([day, value]) => {
    if (day === "timeGap") return [];
    const { isAvailable, startTime, endTime } = value;
    if (!isAvailable) return [];

    const baseDate = new Date().toISOString().split("T")[0];

    return [
      {
        day: day.toUpperCase(),
        startTime: new Date(`${baseDate}T${startTime}:00`),
        endTime: new Date(`${baseDate}T${endTime}:00`),
      },
    ];
  });

  if (user.availability) {
    await db.availability.update({
      where: { id: user.availability.id },
      data: {
        timeGap: data.timeGap,
        days: {
          deleteMany: {},
          create: availabilityData,
        },
      },
    });
  } else {
    await db.availability.create({
      data: {
        userId: user.id,
        timeGap: data.timeGap,
        days: {
          create: availabilityData,
        },
      },
    });
  }

  return { success: true };
}
