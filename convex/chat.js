import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addItem = mutation({
  args: { message: v.string(), id: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("chat", { text: args.text });
  },
});