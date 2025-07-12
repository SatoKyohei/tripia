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
  - 他
    - cuid
      - npm i cuid

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

## アプリ完成（30h）
### ◯記事詳細ページ
- ~~子プランを登録（seed）~~
- ~~子プラン~~
  - ~~parentPlanのAPIに子プランを取得するロジック追加~~
  - ~~子プランをfetch（page.tsx）~~
  - ~~子プランをprops、あるいはproviderとして渡す~~
  - ~~子プランを取得（フロント）~~
  - ~~子プランを表示~~
  - ~~子プランを削除できるようにする（フロント）~~
  - ~~子プランを削除できるようにする（バックエンド）~~
  - ~~子プランを複製できるようにする（フロント）~~
  - ~~子プランを複製できるようにする（バックエンド）~~
  - ~~子プランのプラスボタン~~
    - ~~バックエンドで子プラン作成のAPI~~
    - ~~フロントからfetch~~


### ◯記事編集ページ（詳細ページの各フォームを編集できるように修正）
- ~~子プランをそのまま編集できるよう改修~~
- ~~子プランの順番変更~~
- ~~親プラン専用のhooksも作成~~
    - ~~削除~~
      - ~~フロント（hooks）~~
      - ~~フロント（UI）~~
      - ~~バックエンド~~
    - ~~複製~~
      - ~~フロント（hooks）~~
      - ~~フロント（UI）~~
      - ~~バックエンド~~
    - 変更
      - ~~フロント（hooks）~~
      - ~~フロント（UI）~~
      - ~~バックエンド~~


### ◯記事作成ページ
- ~~記事作成ボタン~~
  - ~~フロント（UI）一覧ページに作成ボタン~~
- 記事作成ページ
  - 親プランのフォーム
    - フロント（UI）
      - ⭐️createのpage.tsxで以下作成中
        - ~~LocationSelectGroupsをどうにかする~~
        - ~~DateTimePickerGroupsをどうにかする~~
        - ~~createButtonを押下したらpublished, Draftbuttonを押下したらDraftを付加する~~
        - ~~バックエンドへのリクエスト（fetch）~~
        - ~~プランを自動生成するをオフにしたら目的地の数とプラマイボタンを消す~~
        - ~~プランを自動生成する、をOFFにした時に目的地の数のフォームを消す~~
        - 子プランを手動で指定してリクエストできるよう改修⭐️
          - フロントでchildPlanも状態管理しつつ、まとまったらリクエストできるようにする。
          - <ChildPlan>の中で呼んでいるuseChildPlansをplan.tsx（親プラン）の方で呼び出し、必要な関数を<ChildPlan>にpropsとして渡す。そのため<ChildPlan>側の型定義も修正
          - useChildPlansのhandleChangeも修正する。propsにautoSave = trueを入れておいて、handleChangeの中でif(autoSave){リクエスト処理}に変える。
          - 最後のAIの回答が参考になる
          - プラン作成できたが、子プランが作成されない
    - フロント（hooks）
    - バックエンド
    - 検証
  - 子プランの手動作成時のフォーム
    - フロント（UI）
    - フロント（hooks）
    - バックエンド
    - 検証
  - 子プランの自動生成時のフォーム
    - フロント（UI）
    - フロント（hooks）
    - バックエンド
    - 外部API
      - タスク細分化
    - 検証
  

### ◯記事一覧ページ
- 削除を実装
  - フロント（hooks）
  - フロント（UI）
  - バックエンド
- 複製を実装
  - フロント（hooks）
  - フロント（UI）
  - バックエンド
- フィルターを実装
  - フロント（hooks）
  - フロント（UI）
  - バックエンド
- ソートを実装
  - フロント（hooks）
  - フロント（UI）
  - バックエンド

### ◯MyPage
- 表示するものを決める（メアド、名前、プロフ写真など）
- フロント実装
- バックエンド実装


### ◯認証機能実装
- タスク細分化


### ◯記事自動生成の外部API実装
- タスク細分化


### ◯サムネ画像実装
- S3デプロイ
- Prismaのモデル修正
- next/imageのsrcにURLが入るよう改修（フロント）
- バックエンド改修

### ◯


### ◯リファクタリング／他実装
- 記事ページのデザインを考える
- 記事詳細／編集ページ
  - デザインに沿ってUI/UX改修
  - コンポーネント化／リファクタリング
- 記事作成ページ
  - デザインに沿ってUI/UX改修
  - コンポーネント化／リファクタリング
- Myページ
  - デザインに沿ってUI/UX改修
  - コンポーネント化／リファクタリング
- ログインフォーム
  - デザインに沿ってUI/UX改修
  - コンポーネント化／リファクタリング
- signupフォーム
  - デザインに沿ってUI/UX改修
  - コンポーネント化／リファクタリング
- 課題を確認
  - タスク細分化
- 削除ボタン押下時の確認ダイアログ


### ◯アプリデプロイ（20h）
- ECSデプロイ
- ECRデプロイ
