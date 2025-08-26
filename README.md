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
### ◯Topページ
- ~~設計から~~
- ~~実装~~

### ◯記事一覧ページ
- ~~フィルター~~
- ~~ソート~~
- ヘッダー
  - 設計（以下はすべてボタンだけ。機能実装はしない）
    - 検索機能
    - お知らせ／通知ボタン
    - ヘルプ／サポート
    - 設定ボタン（⚙️アイコン）



### ◯記事作成ページ
- ~~親プラン~~
  - ~~フロント実装~~
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
  - ~~バックエンド実装~~
- 子プラン
  - ~~手動作成~~
    - ~~フロント実装~~
    - ~~バックエンド実装~~
  - 自動作成
    - 外部API
    - リファクタリング
  

### ◯記事詳細ページ
- ~~親プラン~~
  - ~~フロント実装~~
  - ~~バックエンド実装~~
- ~~子プラン~~
  - ~~フロント実装~~
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
  - ~~バックエンド実装~~
    - ~~削除のAPI実装~~
    - ~~複製のAPI実装~~
    - ~~作成のAPI実装~~



### ◯MyPage
- プロフィール
  - ~~name, image, emailの状態管理と埋め込み~~
  - ~~バックエンドにリクエスト~~
  - サムネ画像（その他の「サムネ画像実装」の後」
- 他
  - ~~表示するものを決める（メアド、名前、プロフ写真など）~~



### ◯認証/ユーザー
- 新規登録
  - ~~通常ログイン~~
    - ~~フロント実装~~
    - ~~バックエンド実装~~
  - Googleログイン（参考になるかも？https://note.com/junglehuman/n/n4530a7a96b4f）
- ログイン
  - ~~通常ログイン~~
  - Googleログイン
- ~~ログアウト~~
- ~~ミドルウェア~~
  - ~~authenticate.ts作成~~
- 非ログイン状態でページ遷移できないように設定
  - フロント実装

### ◯アプリデプロイ（20h）
- ECSデプロイ
- ECRデプロイ



### ◯その他
- ~~サムネ画像実装~~
  - ~~S3デプロイ~~
  - ~~Prismaのモデル修正~~
  - ~~next/imageのsrcにURLが入るよう改修（フロント）~~
  - ~~バックエンド改修~~
- 開始・終了時間のバリデーション（終了時間を開始より早くできないよう設定）
- ログイン時にURLにパスワード等がクエリパラメータとして表示されてしまう


### 続き
- 次（以下どの順からやってもOK）
  - Googleの新規登録
  - Googleのログイン
- 対応済み
  - 子プランも認証ありに変更
  - ヘッダー
    - リンクを増やした（ただし、いくつかのリンクは#にしている）
    - ログイン状態によって表示するリンクを分ける
    - ログイン状態をグローバル状態管理（AuthProvider.tsx）
  - トップページのUI作成
  - AWS IAMユーザー作成
  - AWS S3バケット作成
  - S3関連のコード実装（s3Client, s3Service）
    - プラン詳細ページのUI修正
  - プラン一覧ページのUI修正
  - サムネ画像の実装（AWS S3）
    - ImageUploadService.ts作成
    - ImageUploader.tsx作成
    - PlanDetail.tsx調整
    - plan一覧ページで画像の反映
  - プラン詳細ページのUI修正
  - プラン作成ページのUI修正
  - サムネアップロードの分岐（作成ページ・詳細ページ）
  - ダッシュボードのUI修正
  - ヘッダーのUI修正