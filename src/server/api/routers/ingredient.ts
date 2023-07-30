import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ingredientCreateSchema } from "@/models/ingredient";

export const ingredientRouter = createTRPCRouter({
  create: publicProcedure
    .input(ingredientCreateSchema)
    .mutation(({ input }) => {
      console.log("From server", input);
      return {
        greeting: `Hello ${input.name}`,
      };
    }),
});
