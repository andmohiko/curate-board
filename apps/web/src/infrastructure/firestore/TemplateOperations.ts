import type {
  CreateTemplateDto,
  Template,
  TemplateId,
  UpdateTemplateDto,
} from '@curate/common'
import { templateCollection } from '@curate/common'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '~/lib/firebase'
import { convertDate } from '~/utils/convertDate'

const dateColumns = ['createdAt', 'updatedAt'] as const satisfies Array<string>

/**
 * テンプレートを取得するoperation関数
 *
 * @param templateId - 取得するテンプレートのID
 * @returns テンプレートデータ、存在しない場合はnull
 */
export const fetchTemplateByIdOperation = async (
  templateId: TemplateId,
): Promise<Template | null> => {
  const docSnap = await getDoc(doc(db, templateCollection, templateId))
  if (!docSnap.exists()) {
    return null
  }
  const data = docSnap.data()
  const template = {
    templateId: docSnap.id,
    ...convertDate(data, dateColumns),
  } as Template
  return template
}

/**
 * 公式テンプレート一覧を取得するoperation関数
 *
 * @returns 公式テンプレート一覧
 */
export const fetchOfficialTemplatesOperation = async (): Promise<
  Template[]
> => {
  const q = query(
    collection(db, templateCollection),
    where('type', '==', 'official'),
    orderBy('updatedAt', 'desc'),
  )
  const querySnapshot = await getDocs(q)
  const templates: Template[] = []
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data()
    const template = {
      templateId: docSnap.id,
      ...convertDate(data, dateColumns),
    } as Template
    templates.push(template)
  })
  return templates
}

/**
 * テンプレートを作成するoperation関数
 *
 * @param dto - 作成するテンプレートのDTO
 */
export const createTemplateOperation = async (
  dto: CreateTemplateDto,
): Promise<void> => {
  await addDoc(collection(db, templateCollection), dto)
}

/**
 * テンプレートを更新するoperation関数
 *
 * @param templateId - 更新するテンプレートのID
 * @param dto - 更新するテンプレートのDTO（updatedAtは必須）
 */
export const updateTemplateOperation = async (
  templateId: TemplateId,
  dto: UpdateTemplateDto,
): Promise<void> => {
  await updateDoc(doc(db, templateCollection, templateId), dto)
}

/**
 * テンプレートを削除するoperation関数
 *
 * @param templateId - 削除するテンプレートのID
 */
export const deleteTemplateOperation = async (
  templateId: TemplateId,
): Promise<void> => {
  await deleteDoc(doc(db, templateCollection, templateId))
}
