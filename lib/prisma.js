import{ PrismaClient } from "@prisma/client";
export const db = globalThis.Prisma || new PrismaClient();
if(process.env.NODE_ENV !=="production"){
    globalThis.prisma=db;
}


//In development, with hot reloading (like in Next.js, Vite,
//  or other modern dev tools), your files/modules get 
// reloaded frequently. If you create a new Prisma client every time, 
// you'll quickly end up with many database connections, 
// which can crash your app or exceed Neon’s connection limit