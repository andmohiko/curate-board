import z from 'zod'

export const editProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(20, { message: '20文字以内で入力してください' }),
  profileImageUrl: z.string().url().optional(),
  username: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(20, { message: '20文字以内で入力してください' })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: '半角英数字で入力してください',
    }),
})

export type EditProfileInputType = z.infer<typeof editProfileSchema>
