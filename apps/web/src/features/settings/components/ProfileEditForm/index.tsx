import type { User } from '@curate/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, Card, TextInput } from '@mantine/core'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FiCamera } from 'react-icons/fi'
import { BasicButton } from '~/components/Buttons/BasicButton'
import { LabelText } from '~/components/Typography/LabelText'
import { useEditProfile } from '~/features/settings/hooks/useEditProfile'
import {
  type EditProfileInputType,
  editProfileSchema,
} from '~/features/settings/types'
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
  const [updateProfile, , isLoading] = useEditProfile()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditProfileInputType>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      displayName: '',
      username: '',
      profileImageUrl: undefined,
    },
  })

  const displayName = watch('displayName')
  const profileImageUrl = watch('profileImageUrl')

  // ユーザー情報が取得できたらフォームに設定
  useEffect(() => {
    setValue('displayName', user.displayName)
    setValue('username', user.username)
    if (user.profileImageUrl) {
      setValue('profileImageUrl', user.profileImageUrl)
    }
  }, [user, setValue])

  /**
   * プロフィール画像アップロード処理
   * TODO: 画像アップロード処理を実装
   */
  const handleImageUpload = () => {
    // TODO: 画像アップロード処理
  }

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

  /**
   * ユーザーID入力時のバリデーション（半角英数字とアンダースコアのみ）
   */
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '')
    setValue('username', value, { shouldValidate: true })
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
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              {profileImageUrl || user.profileImageUrl ? (
                <Image
                  src={profileImageUrl || user.profileImageUrl || ''}
                  alt={displayName || user.displayName}
                  width={80}
                  height={80}
                  className={styles.avatarImage}
                />
              ) : (
                <Avatar size={80} radius="xl" className={styles.avatarFallback}>
                  {(displayName || user.displayName).slice(0, 2)}
                </Avatar>
              )}
              <button
                type="button"
                onClick={handleImageUpload}
                className={styles.cameraButton}
              >
                <FiCamera size={16} />
              </button>
            </div>
          </div>

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
              <span className={styles.atSymbol}>@</span>
              <TextInput
                {...register('username', {
                  onChange: handleUsernameChange,
                })}
                placeholder="user_id"
                error={errors.username?.message}
                className={styles.usernameInput}
              />
            </div>
            <p className={styles.helperText}>
              半角英数字とアンダースコアのみ使用可能
            </p>
          </div>

          <div className={styles.saveButtonWrapper}>
            <BasicButton
              type="submit"
              fullWidth
              loading={isLoading}
              importance="primary"
            >
              保存
            </BasicButton>
          </div>
        </div>
      </form>
    </Card>
  )
}
