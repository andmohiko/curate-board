import { SegmentedControl as MantineSegmentedControl } from '@mantine/core'
import styles from './style.module.css'

type Props = {
  data: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
}

export const SegmentedControl = ({
  data,
  value,
  onChange,
}: Props): React.ReactNode => {
  return (
    <MantineSegmentedControl
      data={data}
      value={value}
      onChange={onChange}
      classNames={styles}
    />
  )
}
