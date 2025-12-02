import { useState } from 'react'
import { SegmentedControl } from '~/components/Inputs/SegmentedControl'
import { BoardGrid } from '~/features/board/components/BoardGrid'
import { useCreateBoardMutation } from '~/features/board/hooks/useCreateBoardMutation'
import type { BoardItem } from '~/features/board/types'
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

export const BoardEditor = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'customize'>('edit')
  const [createBoard] = useCreateBoardMutation()

  const handleSave = async () => {
    await createBoard({
      backgroundImageUrl:
        'https://andmohiko.dev/assets/posts/articles/20251012/images/jungle_shisha.jpg',
      items: defaultTemplate,
      title: '最強ボード',
      styleBackgroundColor: '#fdf4ff',
      styleTextColor: '#ffff00',
    })
  }
  return (
    <div className={styles.boardEditor}>
      <EditHeader title="ボード編集" onSave={handleSave} />
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
        <BoardGrid
          items={defaultTemplate}
          styleBackgroundColor="#fdf4ff"
          styleTextColor="#ffff00"
          backgroundImageUrl="https://andmohiko.dev/assets/posts/articles/20251012/images/jungle_shisha.jpg"
          onItemChange={() => {}}
          onLabelChange={() => {}}
        />
      ) : (
        <div>customize</div>
      )}
    </div>
  )
}
