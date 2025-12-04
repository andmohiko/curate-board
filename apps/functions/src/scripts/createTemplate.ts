/**
 * テンプレート作成CLIスクリプト
 *
 * @remarks
 * npm scriptから実行してテンプレートを作成するためのスクリプト。
 * Firebase Admin SDKを使用してFirestoreに直接書き込む。
 * テンプレートの内容はこのスクリプト内でハードコーディングする。
 *
 * 使用方法:
 *   pnpm functions create-template
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import type { CreateTemplateDto } from '@curate/common'
import { templateCollection } from '@curate/common'
import * as admin from 'firebase-admin'
import { programmerBoardLabels } from './templates'

/**
 * サービスアカウントキーファイルのパス
 * apps/functionsディレクトリからの相対パス
 */
const SERVICE_ACCOUNT_KEY_PATH = path.resolve(
  __dirname,
  '..',
  '..',
  'curate-board-firebase-adminsdk.json',
)

/**
 * Firebase Admin SDKを初期化
 */
if (!admin.apps.length) {
  if (!fs.existsSync(SERVICE_ACCOUNT_KEY_PATH)) {
    throw new Error(
      `サービスアカウントキーファイルが見つかりません: ${SERVICE_ACCOUNT_KEY_PATH}`,
    )
  }

  const serviceAccount = JSON.parse(
    fs.readFileSync(SERVICE_ACCOUNT_KEY_PATH, 'utf8'),
  ) as admin.ServiceAccount

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp()

/**
 * テンプレートを作成する
 *
 * @param dto - 作成するテンプレートのDTO
 */
const createTemplate = async (dto: CreateTemplateDto): Promise<void> => {
  if (dto.itemLabels.length !== 18) {
    throw new Error(
      `itemLabelsは18個である必要があります。現在: ${dto.itemLabels.length}個`,
    )
  }

  const docRef = await db.collection(templateCollection).add(dto)
  console.log(`テンプレートを作成しました。ID: ${docRef.id}`)
  console.log(`タイトル: ${dto.title}`)
  console.log(`タイプ: ${dto.type}`)
  console.log(`アイテム数: ${dto.itemLabels.length}`)
}

/**
 * メイン処理
 */
const main = async () => {
  try {
    // テンプレートの内容をここで定義
    const createTemplateDto: CreateTemplateDto = {
      title: 'エンジニアボード',
      itemLabels: [...programmerBoardLabels],
      type: 'official',
      createdBy: null,
      createdAt: serverTimestamp,
      updatedAt: serverTimestamp,
    }

    await createTemplate(createTemplateDto)
    process.exit(0)
  } catch (error) {
    console.error('エラー:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()
