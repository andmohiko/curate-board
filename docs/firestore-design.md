<!-- @format -->

# Firestore 設計

- boards[#boards]
- templates[#templates]
- users[#users]

## boards

### 概要

- 価値観ボード一覧
- ID: 自動生成

### 詳細

- backgroundImageUrl: String 背景画像URL
- createdAt: Timestamp 作成日時
- items: Array<Object> ボードアイテムの配列
  - label: String テーマ名
  - value: String テーマ内容
- styleBackgroundColor: String 背景色
- styleTextColor: String 文字色
- title: String タイトル
- updatedAt: Timestamp 更新日時
- userId: String 作成したユーザーのUid

## templates

### 概要

- テンプレート一覧
- ID: 自動生成

### 詳細

- createdAt: Timestamp 作成日時
- createdBy: String | null 作成したユーザーのUid（公式テンプレートの場合はnull）
- itemLabels: Array<String> テーマ名の配列（21個）
- type: String('official' | 'custom') テンプレートタイプ
- updatedAt: Timestamp 更新日時

## users

### 概要

- ユーザー一覧
- ID: Firebase AuthのUid

### 詳細

- createdAt: Timestamp 作成日時
- displayName: String 表示名
- email: String Googleログインに使用したメールアドレス
- profileImageUrl: String プロフィール画像URL
- updatedAt: Timestamp 更新日時
- username: String ユーザーID
