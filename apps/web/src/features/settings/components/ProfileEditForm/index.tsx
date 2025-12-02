import type { User } from '@curate/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, TextInput } from '@mantine/core'
import { Controller, useForm } from 'react-hook-form'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { ProfileImageInput } from '~/components/Inputs/ProfileImageInput'
import { LabelText } from '~/components/Typography/LabelText'
import { useEditProfile } from '~/features/settings/hooks/useEditProfile'
import {
  type EditProfileInputType,
  editProfileSchema,
} from '~/features/settings/types'
import { useFirebaseAuthContext } from '~/providers/FirebaseAuthProvider'
import styles from './style.module.css'

type ProfileEditFormProps = {
  user: User
}

/**
 * プロフィール編集フォームコンポーネント
 *
 * @param user - 編集対象のユーザー情報
 */
export const ProfileEditForm = ({
  user,
}: ProfileEditFormProps): React.ReactNode => {
  const { uid } = useFirebaseAuthContext()
  const [updateProfile, , isLoading] = useEditProfile()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditProfileInputType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      username: user.username,
      profileImageUrl: user.profileImageUrl || undefined,
    },
  })
  /**
   * プロフィール保存処理
   */
  const onSubmit = async (data: EditProfileInputType) => {
    try {
      await updateProfile(data)
    } catch (error) {
      // エラーはuseEditProfile内でトースト表示される
      console.error('プロフィール更新エラー:', error)
    }
  }

  return (
    <Card
      className={styles.card}
      shadow="md"
      padding="lg"
      radius="md"
      withBorder={false}
    >
      <div className={styles.cardHeader}>
        <LabelText weight="bold" size="md">
          プロフィール
        </LabelText>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.cardContent}>
          {/* プロフィール画像 */}
          <Controller
            control={control}
            name="profileImageUrl"
            render={({ field }) => (
              <ProfileImageInput
                value={field.value || undefined}
                onChange={field.onChange}
                error={errors.profileImageUrl?.message}
                label=""
                storagePath={`/images/${uid}`}
              />
            )}
          />

          {/* 表示名 */}
          <div className={styles.inputSection}>
            <LabelText size="sm">表示名</LabelText>
            <TextInput
              {...register('displayName')}
              placeholder="表示名を入力"
              error={errors.displayName?.message}
              className={styles.input}
            />
          </div>

          {/* ユーザーID */}
          <div className={styles.inputSection}>
            <LabelText size="sm">ユーザーID</LabelText>
            <div className={styles.usernameInputWrapper}>
              <TextInput
                {...register('username')}
                placeholder="user_id"
                error={errors.username?.message}
                className={styles.usernameInput}
                leftSection={<span className={styles.atSymbol}>@</span>}
              />
            </div>
          </div>

          <div className={styles.saveButtonWrapper}>
            <BasicButton
              type="submit"
              fullWidth
              loading={isLoading}
              importance="primary"
              disabled={!isDirty}
            >
              保存
            </BasicButton>
          </div>
        </div>
      </form>
    </Card>
  )
}
