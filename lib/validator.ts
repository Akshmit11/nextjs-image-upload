import * as z from "zod";

export const formSchema = z.object({
    imageUrls: z.string().url().array()
});