import Head from 'next/head'

/**
 * ページのhead情報を設定するコンポーネント
 *
 * @remarks
 * タイトル、説明文、OGPタグなどのhead情報を設定する
 */
export const PageHead = (): React.ReactElement => (
  <Head>
    <title>
      キュレーションリンク | あなたの「好き」をカタチにしてシェアしよう
    </title>
    <meta
      name="description"
      content="あなたの好きなもの（アニメ、ゲーム、食べ物、音楽など）を7行3列のボード形式で整理し、視覚的に表現・共有できるサービス"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    {/* OGPタグ */}
    <meta property="og:title" content="価値観ボード" />
    <meta
      property="og:description"
      content="あなたの「好き」をカタチにしてシェアしよう"
    />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="価値観ボード" />
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="価値観ボード" />
    <meta
      name="twitter:description"
      content="あなたの「好き」をカタチにしてシェアしよう"
    />
  </Head>
)
