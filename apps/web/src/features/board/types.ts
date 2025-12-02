import { z } from 'zod'

export type BoardItem = {
  label: string
  value: string
  imageUrl?: string
}

export const editBoardSchema = z.object({
  backgroundImageUrl: z.string().optional(),
  items: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      imageUrl: z.string().optional(),
    }),
  ),
  styleBackgroundColor: z.string().optional(),
  styleTextColor: z.string().optional(),
  title: z.string(),
})

export type EditBoardInputType = z.infer<typeof editBoardSchema>
