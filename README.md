# プロジェクト名：TRIPIA

<br/>
<br/>

## 1. デモ情報

- URL：http://tripia-frontend-alb-363224005.ap-northeast-1.elb.amazonaws.com
- デモアカウント
  - Email：user1@example.com
  - PW：user1

<br/>
<br/>

## 2. 概要／要件定義

旅行プランを自動生成するアプリ。TRIP + IA（=AI を逆に）で「TRIPIA」

### ■ 目的・コンセプト

旅行計画を自動生成し、準備〜出発までのハードルを下げるアプリ。

### ■ ターゲット

20〜60 代の幅広い層。

### ■ 解決したい課題

都道府県や観光地は決まっていても、詳細なルートや宿・交通・時間管理が面倒。
大まかな入力だけで旅行計画を生成し、手動で微調整可能にする。

### ■ 利用シーン

- 旅行計画作成時
- 旅行中のガイド（しおり）

### ■ 最低限機能

- ユーザー認証（ログイン／ログアウト、ユーザー作成）
- 旅行計画作成（出発地・目的地・日程・コンセプト・他）

<br/>
<br/>

## 3. 機能一覧（実装済み）

### ■ ユーザー管理

- 新規登録、ログイン、ログアウト

### ■ プラン管理

- プラン作成（手動作成）
- プラン編集・複製・削除
- プラン一覧表示、フィルター・ソート機能
- プラン詳細表示（子プラン含む）

### ■ 子プラン管理

- 目的地ごとのチェックイン／アウト、メモ
- 追加・複製・削除

### ■ 画像関連

- サムネ画像アップロード（プラン）

### ■ ステータス管理

- 下書き、公開済みの管理

<br/>
<br/>

## 4. 機能一覧（実装予定）

### ■ ユーザー管理

- Google ログイン対応
- プロフィール編集（ユーザー名・サムネ画像・パスワード変更）

### ■ プラン管理

- プラン作成（自動生成）

### ■ 子プラン管理

- 順番変更

### ■ 旅行計画生成

- 簡易プランの自動生成（AI）

### ■ 画像関連

- サムネ画像アップロード（プロフィール）

### ■ ステータス管理

- 完了済みの管理

### ■ 共有・参照機能（あれば）

- 複数ユーザーでの旅行計画共有
- 他ユーザーの旅行計画参照

<br/>
<br/>

## 5. 技術スタック

- フロントエンド: React / Next.js / MUI
- バックエンド: Node.js / Express / TypeScript / Prisma / JWT / Swagger-UI / tsoa
- データベース: PostgreSQL / AWS RDS
- インフラ: Docker / Docker Compose / AWS S3 / AWS ELB / AWS ECR / AWS ECS
- その他：Git / GitHub / ESLint / Prettier

<br/>
<br/>

## 6. 外部 API

- S3: 画像アップロード

<br/>
<br/>

## 7. 環境構築方法

### ■ 共通

1. リポジトリをクローン

```
git clone <repo-url>
```

2. AWS セッティング

- S3 をデプロイ

3. .env.sample をコピーして.env にリネーム

### ■ 開発用

1. フロント／バックエンドの .env の「開発用」を埋める

- S3 の情報（アクセスキー、シークレットアクセスキー、リージョン名、バケット名）も記述する
- その他 DB の情報なども

2. docker-compose 起動

```
# プロジェクトトップに移動
cd tripia

# docker起動
docker compose up -d

# upしているか確認
docker ps -a
```

2. ブラウザで以下 URL を表示
   http://localhost:3000

### ■ 本番用

1. AWS ELB をデプロイ

- EC2 でロードバランサー・ターゲットグループをデプロイ
- フロントとバックエンド用に ALB を 2 つデプロイする
- ターゲットグループも 2 つ。フロントは 3000 向け、バックエンドは 8080 向けに設定

2. フロントの .env の「本番環境用」を使う

- 開発用はコメントアウトする
- フロント用にデプロイした ALB の DNS 名を http://に含める

3. Docker イメージビルド

```
# プロジェクトトップに移動
cd tripia

# イメージビルド
docker buildx build --platform linux/amd64 -t tripia/frontend:v1.0 -f frontend/Dockerfile.prod ./frontend/

docker buildx build --platform linux/amd64 -t tripia/backend:v1.0 -f backend/Dockerfile.prod ./backend/
```

4. AWS RDS をデプロイ

- 無料期間枠がおすすめ
- postgreSQL を選択（Aurora は不要）
- 初期データベース欄を tripia に指定
- 初期 PW 欄に任意のパスワードを指定

5. AWS ECR をデプロイ

- リポジトリ（フロント・バックエンド各 1 つずつ）作成
- ECR の「プッシュコマンドを表示」を参考に、手順 3.でデプロイしたイメージをプッシュする

6. AWS ECS をデプロイ

- フロント／バックエンドのタスクを 1 つずつ作成
  - .env の内容と AWS RDS の内容をもとに、環境変数を指定（バックエンドのみ）
- フロント／バックエンドのサービスを 1 つずつ作成

7. ブラウザで確認

- http://フロント用の ALB の DNS 名

<br/>
<br/>

## 8. 注意点・補足

- デモアカウントは 12 時間で認証の期限が切れます。

<br/>
<br/>

## 9. 備忘録（後ほど削除します）

### ■ 実行コマンド

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
  - Express 環境構築
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

### ■ 課題

- 開始・終了時間のバリデーション（終了時間を開始より早くできないよう設定）
- ログイン時に URL にパスワード等がクエリパラメータとして表示されてしまう

### ■ 他

- Dockerfile にビルドコマンドがない
- Mac で開発しているため、イメージが arm になっている。docker build ではなく、docker buildx build --platform linux/amd64 -t ~~ とする必要がある
- node_modules 内のパッケージが Mac 仕様になっている可能性があるため、PC に置いてある node_modules は docker イメージに含めない ⇨ .dockerignore
- ビルド時の lint エラー：package.json で next build --no-lint
- デプロイ参考：https://zenn.dev/program_panda/articles/d6fc8b147d7739#%E3%82%B5%E3%83%96%E3%83%8D%E3%83%83%E3%83%88(1a%2C-1c)%E4%BD%9C%E6%88%90