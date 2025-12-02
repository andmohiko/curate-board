import type { ReactElement, ReactNode } from 'react'
import { LoadingContentOverlay } from '~/components/Base/Loading'
import { PageHead } from '~/components/Base/PageHead'
import { FixedHeader } from '~/components/Layouts/FixedHeader'
import { useLoadingContext } from '~/providers/LoadingProvider'
import styles from './style.module.css'

type Props = {
  children?: ReactNode
  title?: string
  isShowBackButton?: boolean
}

export const DefaultLayout = ({
  children,
  title = 'キュレーションボード',
  isShowBackButton = false,
}: Props): ReactElement => {
  const { isLoading } = useLoadingContext()

  return (
    <div className={styles.defaultLayout}>
      <PageHead />
      <div className={styles.headerWrapper}>
        <div className={styles.spWindow}>
          <FixedHeader title={title} isShowBackButton={isShowBackButton} />
        </div>
      </div>

      {isLoading && <LoadingContentOverlay />}
      <main className={styles.main}>{children}</main>
    </div>
  )
}
