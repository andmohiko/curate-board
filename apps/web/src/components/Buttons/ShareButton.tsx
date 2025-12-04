import { BsTwitterX } from 'react-icons/bs'
import { BasicButton } from './BasicButton'

const hashtags = ['キュレーションリンク', 'きゅれりん']

const createShareUrl = (body: string, url: string): string => {
  const shareUrl = new URL('http://x.com/share')
  const urlParams = [
    ['text', body],
    ['url', url],
    ['hashtags', hashtags.join(',')],
  ]
  const params = new URLSearchParams(urlParams)
  shareUrl.search = params.toString()
  return shareUrl.toString()
}

type Props = {
  body: string
  url: string
}

export const ShareButton = ({ body, url }: Props): React.ReactNode => {
  return (
    <BasicButton
      leftSection={<BsTwitterX size={20} />}
      href={createShareUrl(body, url)}
    >
      ポストする
    </BasicButton>
  )
}
