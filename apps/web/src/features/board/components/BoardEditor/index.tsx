import type { Board } from '@curate/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SegmentedControl } from '~/components/Inputs/SegmentedControl'
import { BoardGrid } from '~/features/board/components/BoardGrid'
import { useCreateBoardMutation } from '~/features/board/hooks/useCreateBoardMutation'
import {
  type BoardItem,
  type EditBoardInputType,
  editBoardSchema,
} from '~/features/board/types'
import { useToast } from '~/hooks/useToast'
import { errorMessage } from '~/utils/errorMessage'
import { EditHeader } from '../EditHeader'
import styles from './style.module.css'

const _emptyTemplate: BoardItem[] = Array.from({ length: 21 }, () => ({
  label: '',
  value: '',
}))

const defaultTemplate: BoardItem[] = [
  { label: '好きなアニメ', value: 'コードギアス' },
  { label: '好きなゲーム', value: 'ドラゴンクエスト' },
  { label: '好きな映画', value: '新劇場版エヴァンゲリオン:破' },
  { label: '好きな音楽', value: 'テイクウィーブ' },
  { label: '好きな食べ物', value: '' },
  { label: '好きな飲み物', value: 'コカ・コーラ' },
  { label: '推しキャラ', value: 'エヴァンゲリオン' },
  { label: '好きな場所', value: '' },
  { label: '趣味', value: 'ゲーム' },
  { label: '好きな季節', value: '' },
  { label: '好きな色', value: '赤' },
  { label: '好きな動物', value: '' },
  { label: '好きな本', value: 'コードギアス' },
  { label: '好きなYouTuber', value: '' },
  { label: '好きなスポーツ', value: 'バスケットボール' },
  { label: '好きなブランド', value: '' },
  { label: '好きなお菓子', value: 'キットカット抹茶限定' },
  {
    label: '休日の過ごし方',
    value: 'カフェとシーシャと古本屋に行ってチルするのがすきだよーん',
  },
  { label: '座右の銘', value: '' },
  { label: '将来の夢', value: 'エンジニア' },
  { label: '自分を一言で', value: '思いついたらやらないと気が済まない性格' },
]

type Props = {
  defaultValues?: Board
}

export const BoardEditor = ({ defaultValues }: Props) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'customize'>('edit')
  const { showErrorToast, showSuccessToast } = useToast()
  const [createBoard] = useCreateBoardMutation()
  const { watch, control, handleSubmit } = useForm<EditBoardInputType>({
    resolver: zodResolver(editBoardSchema),
    defaultValues: defaultValues
      ? {
          backgroundImageUrl: defaultValues?.backgroundImageUrl,
          items: defaultValues?.items,
          title: defaultValues?.title,
          styleBackgroundColor: defaultValues?.styleBackgroundColor,
          styleTextColor: defaultValues?.styleTextColor,
        }
      : {
          backgroundImageUrl: '',
          items: defaultTemplate,
          title: '',
          styleBackgroundColor: '#ffffff',
          styleTextColor: '#323232',
        },
    mode: 'all',
  })

  const styleBackgroundColor = watch('styleBackgroundColor')
  const styleTextColor = watch('styleTextColor')
  const backgroundImageUrl = watch('backgroundImageUrl')

  const onSubmit = async (data: EditBoardInputType) => {
    try {
      await createBoard(data)
      showSuccessToast('ボードを作成しました')
    } catch (e) {
      showErrorToast('ボードの保存に失敗しました', errorMessage(e))
    }
  }

  // const handleSave = async () => {
  //   await createBoard({
  //     backgroundImageUrl:
  //       'https://andmohiko.dev/assets/posts/articles/20251012/images/jungle_shisha.jpg',
  //     items: defaultTemplate,
  //     title: '最強ボード',
  //     styleBackgroundColor: '#fdf4ff',
  //     styleTextColor: '#ffff00',
  //   })
  // }
  return (
    <div className={styles.boardEditor}>
      <EditHeader title="ボード編集" onSave={handleSubmit(onSubmit)} />
      <SegmentedControl
        data={[
          { label: '編集', value: 'edit' },
          { label: 'カスタマイズ', value: 'customize' },
        ]}
        value={activeTab}
        onChange={(value) => {
          setActiveTab(value as 'edit' | 'customize')
        }}
      />
      {activeTab === 'edit' ? (
        <Controller
          control={control}
          name="items"
          render={({ field }) => (
            <BoardGrid
              items={field.value}
              styleBackgroundColor={styleBackgroundColor ?? '#ffffff'}
              styleTextColor={styleTextColor ?? '#323232'}
              backgroundImageUrl={backgroundImageUrl ?? undefined}
              onItemChange={(index, value) => {
                field.onChange(
                  field.value.map((item, i) =>
                    i === index ? { ...item, value } : item,
                  ),
                )
              }}
              onLabelChange={(index, label) => {
                field.onChange(
                  field.value.map((item, i) =>
                    i === index ? { ...item, label } : item,
                  ),
                )
              }}
            />
          )}
        />
      ) : (
        <div>customize</div>
      )}
    </div>
  )
}
