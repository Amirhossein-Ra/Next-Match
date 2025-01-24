import {z} from 'zod';

export const messageSchema = z.object({
    text:z.string().min(1,{
        message:"Content is Required"
    })
})

export type MessageSchema = z.infer<typeof messageSchema>