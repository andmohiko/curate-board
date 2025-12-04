import z from 'zod'

export const editProfileSchema = z.object({
  displayName: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(20, { message: '20文字以内で入力してください' }),
  profileImageUrl: z.string().optional(),
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'ユーザー名は英数字とアンダースコア( _ )のみで入力してください',
    })
    .min(5, { message: 'ユーザー名は5文字以上で入力してください' })
    .max(15, { message: 'ユーザー名は15文字以内で入力してください' }),
})

export type EditProfileInputType = z.infer<typeof editProfileSchema>
