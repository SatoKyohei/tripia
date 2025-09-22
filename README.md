## 成果物

.env もあげるのを忘れずに！（gitignore）
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

-   frontend

    -   ESLint／Prettier
        -   npm i -D eslint-plugin-import eslint-plugin-react typescript-eslint
        -   npm i -D prettier
    -   MUI
        -   デフォルト
            -   npm install @mui/material @emotion/react @emotion/styled
        -   アイコン
            -   npm install @mui/icons-material
        -   日時指定ライブラリ／moment
            -   npm install @mui/x-date-pickers moment
        -   npm i @toolpad/core
    -   他
        -   cuid
            -   npm i cuid

-   backend
    -   Express 環境構築
        -   npm init [-y]
        -   npm i express dotenv
        -   npm i -D @types/express @types/node ts-node nodemon typescript
        -   npx tsc --init
        -   mkdir src
        -   touch src/index.ts
        -   npm i cookie-parser
        -   npm i -D @types/cookie-parser
    -   ESLint
        -   npm i -D eslint eslint-plugin-prettier eslint-config-prettier prettier eslint-plugin-import typescript-eslint
    -   tsoa/SwaggerUI
        -   npm i tsoa swagger-ui-express
        -   npm i -D concurrently @types/swagger-ui-express
    -   認証（JWT/bcryptjs）
        -   npm i jsonwebtoken bcryptjs
        -   npm i -D @types/jsonwebtoken @types/bcryptjs
    -   リソース共有
        -   npm i cors
        -   npm i -D @types/cors

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

-   ボタンの色（特に下書き保存と複製が被ってる）

<br/>
<br/>

## アプリ完成（30h）

### ◯Top ページ

-   ~~設計から~~
-   ~~実装~~

### ◯ 記事一覧ページ

-   ~~フィルター~~
-   ~~ソート~~
-   ~~ヘッダー~~

### ◯ 記事作成ページ

-   ~~親プラン~~
    -   ~~フロント実装~~
        -   ~~LocationSelectGroups をどうにかする~~
        -   ~~DateTimePickerGroups をどうにかする~~
        -   ~~createButton を押下したら published, Draftbutton を押下したら Draft を付加する~~
        -   ~~バックエンドへのリクエスト（fetch）~~
        -   ~~プランを自動生成するをオフにしたら目的地の数とプラマイボタンを消す~~
        -   ~~プランを自動生成する、を OFF にした時に目的地の数のフォームを消す~~
        -   ~~子プランを手動で指定してリクエストできるよう改修~~
        -   ~~フロントで childPlan も状態管理しつつ、まとまったらリクエストできるようにする。~~
        -   ~~<ChildPlan>の中で呼んでいる useChildPlans を plan.tsx（親プラン）の方で呼び出し、必要な関数を<ChildPlan>に props として渡す。そのため<ChildPlan>側の型定義も修正~~
        -   ~~useChildPlans の handleChange も修正する。props に autoSave = true を入れておいて、handleChange の中で if(autoSave){リクエスト処理}に変える。~~
        -   ~~親子プラン作成できるようになったし、プラン詳細ページでの変更削除複製もできるようになった。ただ、プラン新規作成中の子プラン複製と削除ができない~~
        -   ~~一つ上の課題もクリア。ただ、作成ページを開くとフロントでエラーがでる。処理は問題なく実行できる。このエラーを AI に質問済み（最後の回答参考）~~
        -   ~~BasicDateTimePicker と Providers を moment から dayjs に変更したら、子プランで時間設定したときにエラーになる~~
    -   ~~バックエンド実装~~
-   子プラン
    -   ~~手動作成~~
        -   ~~フロント実装~~
        -   ~~バックエンド実装~~
    -   自動作成
        -   外部 API
        -   リファクタリング

### ◯ 記事詳細ページ

-   ~~親プラン~~
    -   ~~フロント実装~~
    -   ~~バックエンド実装~~
-   ~~子プラン~~
    -   ~~フロント実装~~
        -   ~~子プランをそのまま編集できるよう改修~~
        -   ~~子プランの順番変更~~
        -   ~~parentPlan の API に子プランを取得するロジック追加~~
        -   ~~子プランを fetch（page.tsx）~~
        -   ~~子プランを props、あるいは provider として渡す~~
        -   ~~子プランを取得（フロント）~~
        -   ~~子プランを表示~~
        -   ~~子プランを削除できるようにする（フロント）~~
        -   ~~子プランを複製できるようにする（フロント）~~
        -   ~~子プランのプラスボタン~~
            -   ~~バックエンドで子プラン作成の API~~
            -   ~~フロントから fetch~~
    -   ~~バックエンド実装~~
        -   ~~削除の API 実装~~
        -   ~~複製の API 実装~~
        -   ~~作成の API 実装~~

### ◯MyPage

-   プロフィール
    -   ~~name, image, email の状態管理と埋め込み~~
    -   ~~バックエンドにリクエスト~~
    -   サムネ画像（その他の「サムネ画像実装」の後）
-   他
    -   ~~表示するものを決める（メアド、名前、プロフ写真など）~~

### ◯ 認証/ユーザー

-   新規登録
    -   ~~通常ログイン~~
        -   ~~フロント実装~~
        -   ~~バックエンド実装~~
    -   Google ログイン（参考になるかも？https://note.com/junglehuman/n/n4530a7a96b4f）
-   ログイン
    -   ~~通常ログイン~~
    -   Google ログイン
-   ~~ログアウト~~
    -   ~~サインインページに遷移しない~~
-   ~~ミドルウェア~~
    -   ~~authenticate.ts 作成~~
-   ~~非ログイン状態でページ遷移できないように設定~~

### ◯ アプリデプロイ（20h）

-   ECS デプロイ
-   ECR デプロイ

### ◯ その他

-   ~~サムネ画像実装~~
    -   ~~S3 デプロイ~~
    -   ~~Prisma のモデル修正~~
    -   ~~next/image の src に URL が入るよう改修（フロント）~~
    -   ~~バックエンド改修~~
-   開始・終了時間のバリデーション（終了時間を開始より早くできないよう設定）
-   ログイン時に URL にパスワード等がクエリパラメータとして表示されてしまう

### 続き

-   次（以下どの順からやっても OK）
    -   Google の新規登録
    -   Google のログイン
    -   バックエンド
        -   seed.ts
        -   コメント入れる
    -   フロントエンドリファクタリング
        -   page.tsx:詳細
        -   page.tsx:create
            -   PlanDetailで作ったコンポーネントに差し替え
        -   page.tsx:一覧
        -   page.tsx:signin
        -   page.tsx:signup
        -   page.tsx:dashboard
        -   data ディレクトリ
        -   libs ディレクトリ
        -   types ディレクトリ
        -   eslint
        -   コメント入れる
-   対応済み
    -   子プランも認証ありに変更
    -   ヘッダー
        -   リンクを増やした（ただし、いくつかのリンクは#にしている）
        -   ログイン状態によって表示するリンクを分ける
        -   ログイン状態をグローバル状態管理（AuthProvider.tsx）
    -   トップページの UI 作成
    -   AWS IAM ユーザー作成
    -   AWS S3 バケット作成
    -   S3 関連のコード実装（s3Client, s3Service）
        -   プラン詳細ページの UI 修正
    -   プラン一覧ページの UI 修正
    -   サムネ画像の実装（AWS S3）
        -   ImageUploadService.ts 作成
        -   ImageUploader.tsx 作成
        -   PlanDetail.tsx 調整
        -   plan 一覧ページで画像の反映
    -   プラン詳細ページの UI 修正
    -   プラン作成ページの UI 修正
    -   サムネアップロードの分岐（作成ページ・詳細ページ）
    -   ダッシュボードの UI 修正
    -   ヘッダーの UI 修正
    -   非ログイン状態でページ遷移できないように設定
        -   Auth 作成
    -   ログアウトしてもトップページに遷移しないのを改修
    -   バックエンドリファクタリング
        -   ESLint
        -   ステータスコード
    -   フロントエンドリファクタリング
        -   Button コンポーネント
        -   Select コンポーネント
        -   Filter
        -   Sort
        -   Logo
        -   Menu
        -   StatusSelect
        -   IconButton
        -   ImageUploader
        -   PlanListCard
        -   LocationSelect
        -   create、編集ページのサムネアップロードがおかしい
        -   DateTimePicker
        -   Header
        -   ChildPlan
        -   layouts ディレクトリ
            -   PlanDetail