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
- 親プラン
  - フロント
    - デザイン
    - ~~全パーツ実装~~
    - ~~リクエスト~~
    - リファクタリング
  - バックエンド
    - リファクタリング
- 子プラン
  - フロント
    - ~~子プランをそのまま編集できるよう改修~~
    - ~~子プランの順番変更~~
    - ~~parentPlanのAPIに子プランを取得するロジック追加~~
    - ~~子プランをfetch（page.tsx）~~
    - ~~子プランをprops、あるいはproviderとして渡す~~
    - ~~子プランを取得（フロント）~~
    - ~~子プランを表示~~
    - ~~子プランを削除できるようにする（フロント）~~
    - ~~子プランを複製できるようにする（フロント）~~
    - ~~子プランのプラスボタン~~
      - ~~バックエンドで子プラン作成のAPI~~
      - ~~フロントからfetch~~
    - デザイン
    - リファクタリング
  - バックエンド
    - ~~削除のAPI実装~~
    - ~~複製のAPI実装~~
    - ~~作成のAPI実装~~
    - リファクタリング


### ◯記事作成ページ
- 親プラン
  - フロント
    - ~~LocationSelectGroupsをどうにかする~~
    - ~~DateTimePickerGroupsをどうにかする~~
    - ~~createButtonを押下したらpublished, Draftbuttonを押下したらDraftを付加する~~
    - ~~バックエンドへのリクエスト（fetch）~~
    - ~~プランを自動生成するをオフにしたら目的地の数とプラマイボタンを消す~~
    - ~~プランを自動生成する、をOFFにした時に目的地の数のフォームを消す~~
    - ~~子プランを手動で指定してリクエストできるよう改修~~
    - ~~フロントでchildPlanも状態管理しつつ、まとまったらリクエストできるようにする。~~
    - ~~<ChildPlan>の中で呼んでいるuseChildPlansをplan.tsx（親プラン）の方で呼び出し、必要な関数を<ChildPlan>にpropsとして渡す。そのため<ChildPlan>側の型定義も修正~~
    - ~~useChildPlansのhandleChangeも修正する。propsにautoSave = trueを入れておいて、handleChangeの中でif(autoSave){リクエスト処理}に変える。~~
    - ~~親子プラン作成できるようになったし、プラン詳細ページでの変更削除複製もできるようになった。ただ、プラン新規作成中の子プラン複製と削除ができない~~
    - ~~一つ上の課題もクリア。ただ、作成ページを開くとフロントでエラーがでる。処理は問題なく実行できる。このエラーをAIに質問済み（最後の回答参考）~~
    - ~~BasicDateTimePickerとProvidersをmomentからdayjsに変更したら、子プランで時間設定したときにエラーになる~~
    - デザイン
    - リファクタリング
  - バックエンド
    - リファクタリング
- 子プラン
  - 手動作成
    - フロント
      - デザイン
      - ~~全パーツ実装~~
      - ~~リクエスト~~
      - リファクタリング
    - バックエンド
      - リファクタリング
  - 自動作成
    - フロント
      - デザイン
      - ~~全パーツ実装~~
      - ~~リクエスト~~
      - リファクタリング
    - バックエンド
      - 外部API
      - リファクタリング
  

### ◯記事一覧ページ
- 削除
  - フロント
    - デザイン
    - ~~全パーツ実装~~
    - ~~リクエスト~~
    - リファクタリング
  - バックエンド
    - リファクタリング
- 複製
  - フロント
    - デザイン
    - ~~全パーツ実装~~
    - ~~リクエスト~~
    - リファクタリング
  - バックエンド
    - リファクタリング
- フィルター
  - フロント
    - デザイン
    - ~~全パーツ実装~~
    - ~~リクエスト~~
    - リファクタリング
  - バックエンド
    - リファクタリング
- ソート
  - フロント
    - デザイン
    - ~~全パーツ実装~~
    - ~~リクエスト~~
    - リファクタリング
  - バックエンド
    - リファクタリング
- 作成
  - フロント
    - デザイン
    - ~~全パーツ実装~~
    - ~~リクエスト~~
    - ~~作成ボタン~~
    - リファクタリング
  - バックエンド
    - リファクタリング
- ヘッダー
  - フロント
    - デザイン
    - ~~全パーツ実装~~
    - ~~リクエスト~~
    - リファクタリング
  - バックエンド
    - リファクタリング


### ◯MyPage
- 全般
  - フロント
    - デザイン
    - ~~name, image, emailの状態管理と埋め込み~~
    - ~~バックエンドにリクエスト~~
    - リファクタリング
  - バックエンド
    - リファクタリング
  - 他
    - ~~表示するものを決める（メアド、名前、プロフ写真など）~~

### ◯Topページ
- 全般
  - フロント
    - デザイン
    - リファクタリング
  - バックエンド
    - リファクタリング

### ◯サムネ画像実装
- S3デプロイ
- Prismaのモデル修正
- next/imageのsrcにURLが入るよう改修（フロント）
- バックエンド改修


### ◯認証
- バックエンド
  - ~~ログイン・ログアウト（usersController）~~
  - ~~ミドルウェア（authenticate.ts）~~

### ◯アプリデプロイ（20h）
- ECSデプロイ
- ECRデプロイ
