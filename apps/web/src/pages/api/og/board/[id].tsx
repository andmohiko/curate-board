import type { Board } from '@curate/common'
import { ImageResponse } from '@vercel/og'
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetchBoardByIdOperation } from '~/infrastructure/firebaseAdmin/BoardOperations'

/**
 * 動的OGP画像生成API
 *
 * @remarks
 * 指定されたボードIDのボードデータを取得し、BoardGridのレイアウトを再現したOGP画像を生成する。
 * OGP画像のサイズは1200x630px（標準的なOGP画像サイズ）。
 * ボードが存在しない場合はデフォルトのOGP画像を返す。
 *
 * @param req - Next.jsのリクエストオブジェクト
 * @param res - Next.jsのレスポンスオブジェクト
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { id } = req.query

    if (!id || typeof id !== 'string') {
      const defaultImage = generateDefaultImage()
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      return res.status(200).send(defaultImage.body)
    }

    // ボードデータを取得
    const board = await fetchBoardByIdOperation(id)

    if (!board) {
      const defaultImage = generateDefaultImage()
      res.setHeader('Content-Type', 'image/png')
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      return res.status(200).send(defaultImage.body)
    }

    // OGP画像を生成
    const image = generateBoardImage(board)
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    return res.status(200).send(image.body)
  } catch (error) {
    console.error('Error generating OGP image:', error)
    const defaultImage = generateDefaultImage()
    res.setHeader('Content-Type', 'image/png')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    return res.status(200).send(defaultImage.body)
  }
}

/**
 * ボードデータからOGP画像を生成する
 *
 * @param board - ボードデータ
 * @returns OGP画像のレスポンス
 */
function generateBoardImage(board: Board): ImageResponse {
  const items = board.items || []
  const gridColumns = 3
  const gridRows = 6
  const cellHeight = 90 // グリッドの高さを計算

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: board.styleBackgroundColor || '#ffffff',
        backgroundImage: board.backgroundImageUrl
          ? `url(${board.backgroundImageUrl})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        padding: '40px',
        borderRadius: '16px',
      }}
    >
      {/* 背景画像のオーバーレイ */}
      {board.backgroundImageUrl && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '16px',
          }}
        />
      )}

      {/* タイトル */}
      {board.title && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '20px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: board.styleTextColor || '#000000',
              textAlign: 'center',
              margin: 0,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {board.title}
          </h1>
        </div>
      )}

      {/* グリッド */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: '8px',
          position: 'relative',
          zIndex: 1,
          flex: 1,
        }}
      >
        {Array.from({ length: gridRows * gridColumns }).map((_, index) => {
          const item = items[index]
          const cellKey = `cell-${index}`
          return (
            <div
              key={cellKey}
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                minHeight: `${cellHeight}px`,
                gap: '4px',
              }}
            >
              {/* ラベル */}
              {item?.label && (
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: board.styleTextColor || '#000000',
                    opacity: 0.8,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.label}
                </div>
              )}

              {/* 値 */}
              {item?.value && (
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: board.styleTextColor || '#000000',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    whiteSpace: 'wrap',
                    overflow: 'hidden',
                    wordBreak: 'break-word',
                  }}
                >
                  {item.value}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}

/**
 * デフォルトのOGP画像を生成する
 *
 * @returns デフォルトのOGP画像のレスポンス
 */
function generateDefaultImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '64px',
          fontWeight: 'bold',
          color: '#000000',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        キュレーションリンク
      </h1>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
