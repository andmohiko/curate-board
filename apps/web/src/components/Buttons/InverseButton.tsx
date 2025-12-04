import { Button } from '@mantine/core'
import classNames from 'classnames'
import Link from 'next/link'
import { isExternalLink } from '~/components/Base/LinkItem'

import type { ButtonSize } from '~/components/Buttons/types'
import styles from './style.module.css'

type Props = {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  target?: '_self' | '_blank'
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit'
  width?: string
  fullWidth?: boolean
  shadow?: boolean
  leftSection?: React.ReactNode
}

/**
 * 白い背景のボタンコンポーネント
 *
 * @remarks
 * プライマリカラーの背景に対して使用する白いボタン。
 * 背景が白で、テキストはプライマリカラーになる。
 * ホバー時やクリック時は自然な色になるようにスタイルが設定されている。
 */
export const InverseButton = ({
  children,
  onClick,
  href,
  target = '_self',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  width,
  fullWidth = false,
  shadow = false,
  leftSection,
}: Props): React.ReactElement => {
  const buttonClass = classNames(styles.inverse, {
    [styles.disabled]: disabled,
  })

  // hrefがあるときはaタグとして動作する
  if (href) {
    return isExternalLink(href) ? (
      <Button
        component="a"
        href={href}
        target={target}
        rel="noreferrer noopener"
        variant="filled"
        color="white"
        disabled={disabled}
        loading={loading}
        w={width}
        fullWidth={fullWidth}
        className={buttonClass}
        size={size}
        style={{
          boxShadow: shadow ? '10px 10px 25px rgba(0, 0, 0, 0.25)' : 'none',
        }}
        leftSection={leftSection}
      >
        {children}
      </Button>
    ) : (
      <Link href={href} target={target}>
        <Button
          component="div"
          variant="filled"
          color="white"
          disabled={disabled}
          loading={loading}
          w={width}
          fullWidth={fullWidth}
          className={buttonClass}
          size={size}
          style={{
            boxShadow: shadow ? '10px 10px 25px rgba(0, 0, 0, 0.25)' : 'none',
          }}
          leftSection={leftSection}
        >
          {children}
        </Button>
      </Link>
    )
  }

  // hrefがなければbuttonとして動作する
  return (
    <Button
      onClick={onClick}
      variant="filled"
      color="white"
      disabled={disabled}
      loading={loading}
      type={type}
      w={width}
      fullWidth={fullWidth}
      className={buttonClass}
      size={size}
      style={{
        boxShadow: shadow ? '10px 10px 25px rgba(0, 0, 0, 0.25)' : 'none',
      }}
      leftSection={leftSection}
    >
      {children}
    </Button>
  )
}
