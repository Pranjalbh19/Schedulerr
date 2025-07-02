"use server";

import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend"; // ✅ Correct import
import { db } from "@/lib/prisma";

const { users } = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY, // ✅ Must be set in your .env file
});

export async function updateUsername(username) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { username },
  });

  if (existingUser && existingUser.clerkUserId !== userId) {
    throw new Error("Username is already taken");
  }

  await db.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  await users.updateUser(userId, {
    username,
  });

  return { success: true };
}

export async function getUserByUsername(username) {
  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      email: true,
      imageUrl: true,
      events: {
        where: {
          isPrivate: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          description: true,
          duration: true,
          isPrivate: true,
          _count: {
            select: { bookings: true },
          },
        },
      },
    },
  });

  return user;
}
