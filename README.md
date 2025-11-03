# プロジェクト名：TRIPIA
（2025/11/3 追記）本アプリと同名のサービスが存在しますが、当プロジェクトとは一切関係ございません。

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

- プラン作成（AI による自動生成）

### ■ 子プラン管理

- 順番変更

### ■ 画像関連

- サムネ画像アップロード（プロフィール）

### ■ ステータス管理

- 完了済みの管理

### ■ 共有・参照機能

- 複数ユーザーでの旅行計画共有
- 他ユーザーの旅行計画参照
- 「いいね」機能

<br/>
<br/>

## 5. 技術スタック

- フロントエンド: React / Next.js / MUI
- バックエンド: Node.js / Express / TypeScript / Prisma / JWT / Swagger-UI / tsoa
- データベース: PostgreSQL / AWS RDS
- インフラ: Docker / Docker Compose / AWS S3 / AWS ELB / AWS ECR / AWS ECS / terraform
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

<br/>

2. AWS セッティング

- ECR で以下リポジトリ作成
  - tripia/frontend
  - tripia/backend
- 「セキュリティ認証情報」でアクセス／シークレットアクセスキーを作成
- AWS CLIをローカルにインストールしておく
- AWS 認証情報確認と調整
```
# 現在の認証情報を確認
aws sts get-caller-identity

# （AWSの認証情報が未設定の場合）作成したキーで認証情報を設定
vi ~/.aws/credentials

[Default]
aws_access_key_id = AKIAXXXXXXX
aws_secret_access_key = xxxxxxxxxxxxx
```
<br/>

3. 環境変数ファイル作成
```
# プロジェクトトップに移動
cd tripia

# 環境変数ファイル作成
cp -p frontend/.env.sample frontend/.env
cp -p backend/.env.sample backend/.env
cp -p infrastructure/example.tfvars infrastructure/terraform.tfvars
```

<br/>

4. docker, docker-composeを自環境にインストール


### ■ 開発用

1. バックエンドの .env の「開発用」を埋める

- S3 の情報（アクセスキー、シークレットアクセスキー、リージョン名、バケット名）も記述する
- その他 DB の情報なども
- フロントエンド／バックエンドともに「本番用」はコメントアウトでOK

<br/>

2. docker-compose 起動

```
# プロジェクトトップに移動
cd tripia

# docker起動
docker compose up -d

# upしているか確認
docker ps -a
```

<br/>

3. ブラウザで URL を表示：http://localhost:3000

### ■ 本番用

1. AWS デプロイ
```
# terraform ディレクトリトップに移動
cd tripia/infrastructure

# terraform.tfvars の内容を埋める

# 初期化
terraform init

# 記載内容のバリデーション確認
terraform validate

# 実施内容確認
terraform plan

# terraform実行（yesを押下）
terraform apply

# 出力にフロントエンド／バックエンドALBのDNS名が出力されるので控えておく
```

<br/>

2. フロントエンドの .env の「本番環境用」を使う

- 開発用はコメントアウトする
- バックエンド用にデプロイした ALB の DNS 名を http://に含める

<br/>

3. Docker イメージビルド~プッシュ
  - 「アカウントID」と書かれた部分は自身のAWSアカウントIDに差し替えて実行
```
# プロジェクトトップに移動
cd tripia

# イメージビルド
docker buildx build --platform linux/amd64 -t tripia/frontend:latest -f frontend/Dockerfile.prod ./frontend/
docker buildx build --platform linux/amd64 -t tripia/backend:latest -f backend/Dockerfile.prod ./backend/

# タグ
docker tag tripia/frontend:latest アカウントID.dkr.ecr.ap-northeast-1.amazonaws.com/tripia/frontend:latest
docker tag tripia/backend:latest アカウントID.dkr.ecr.ap-northeast-1.amazonaws.com/tripia/backend:latest

# awsログイン
aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin アカウントID.dkr.ecr.ap-northeast-1.amazonaws.com

# ECRにプッシュ
docker push アカウントID.dkr.ecr.ap-northeast-1.amazonaws.com/tripia/frontend:latest
docker push アカウントID.dkr.ecr.ap-northeast-1.amazonaws.com/tripia/backend:latest
```

<br/>

4. AWS ECS をGUIから手動デプロイ

- フロント／バックエンドのタスクの最新リビジョンを作成
  - 先ほどプッシュしたイメージを指定 ⇨ 作成
- フロント／バックエンドのサービスを更新
  - 作成した最新リビジョンを指定 ⇨ 更新
- 起動するまで待つ

<br/>

5. ブラウザで確認

- http://フロント用の ALB の DNS 名

<br/>
<br/>

## 8. 注意点・補足

- デモアカウントは 12 時間で認証の期限が切れます。
- AWS環境は放っておくと課金するので以下で削除できます。ただし、本番稼働中のものにはNG
```
# terraform ディレクトリトップに移動
cd tripia/infrastructure

# AWS全リソース削除
terraform destroy

```

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
