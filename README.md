## 成果物
.envもあげるのを忘れずに！（gitignore）
リポジトリ名の例：02-Express-TypeScript-SV_JWT-Prisma-bcrypt


<br/>
<br/>

## 説明
旅行プランを自動生成するアプリ。

<br/>
<br/>

## 技術スタック
- 

<br/>
<br/>

## 実行したコマンド（順不同）
- frontend
  - ESLint／Prettier
    - npm i -D eslint-plugin-import eslint-plugin-react typescript-eslint
    - npm i -D prettier
  - MUI
    - デフォルト
      - npm install @mui/material @emotion/react @emotion/styled
    - アイコン
      - npm install @mui/icons-material
    - 日時指定ライブラリ／moment
      - npm install @mui/x-date-pickers moment
    - npm i @toolpad/core
- backend
  - Express環境構築
    - npm init [-y]
    - npm i express dotenv
    - npm i -D @types/express @types/node ts-node nodemon typescript
    - npx tsc --init
    - mkdir src
    - touch src/index.ts
    - npm i cookie-parser
    - npm i -D @types/cookie-parser
  - ESLint
    - npm i -D eslint eslint-plugin-prettier eslint-config-prettier prettier eslint-plugin-import typescript-eslint
  - tsoa/SwaggerUI
    - npm i tsoa swagger-ui-express
    - npm i -D concurrently @types/swagger-ui-express
  - 認証（JWT/bcryptjs）
    - npm i jsonwebtoken bcryptjs
    - npm i -D @types/jsonwebtoken @types/bcryptjs
  - リソース共有
    - npm i cors
    - npm i -D @types/cors

<br/>
<br/>

## 学べる点
- 

<br/>
<br/>

## 使用した外部サービス
- 

<br/>
<br/>

## その他
- 

## 課題
- ボタンの色（特に下書き保存と複製が被ってる）

<br/>
<br/>

## 次の作業
### ◯記事詳細ページ
- ~~子プランを登録（seed）~~
- ~~子プラン（バックエンド）~~
  - ~~parentPlanのAPIに子プランを取得するロジック追加~~
- 子プラン（フロント）
  - ~~子プランをfetch（page.tsx）~~
  - ~~子プランをprops、あるいはproviderとして渡す~~
  - 子プランを表示するためのUI/UXを実装
  - 子プランの内容を表示
  - 子プランのプラスボタン問題

### ◯記事作成ページ
- 記事作成ボタン（Header）
- フォーム
  - 子プラン作成フォームの改修
  - 作成後にDBへの保存（手動作成）
  - 一覧画面に表示

### ◯記事編集ページ