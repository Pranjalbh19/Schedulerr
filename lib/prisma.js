import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"], // Optional: remove if too verbose
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = prisma;

//In development, with hot reloading (like in Next.js, Vite,
//  or other modern dev tools), your files/modules get 
// reloaded frequently. If you create a new Prisma client every time, 
// you'll quickly end up with many database connections, 
// which can crash your app or exceed Neon’s connection limit