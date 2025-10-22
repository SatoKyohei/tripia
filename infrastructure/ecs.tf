## -------------------------- クラスタ作成 -------------------------- ##

resource "aws_ecs_cluster" "tripia_prod_cluster" {
    name = var.ecs_cluster_name
}


## -------------------------- サービス作成 -------------------------- ##

# フロントエンド
resource "aws_ecs_service" "frontend" {
  name = var.frontend_service_family
  cluster = aws_ecs_cluster.tripia_prod_cluster.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  desired_count = 1                         # 常に1つのタスク（コンテナ）を起動
  launch_type = "FARGATE"
  enable_execute_command = true             # ECS Execを有効化。コンテナにログインしたい時などに利用

  network_configuration {
    subnets = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    # security_groups = [aws_security_group.frontend_ecs_task.id]  # ECSタスクにアタッチするセキュリティグループ
    security_groups = [aws_security_group.public.id]
    assign_public_ip = true                 # パブリックIP自動割当をしない
  }

  # ECSが標準で用意しているデプロイ方式を使用
  deployment_controller {
    type = "ECS"                            # ローリングデプロイ：少しずつ新タスクを起動→古いタスクを停止
  }

  # 「デプロイ中でもサービスを止めないように安全にタスクを入れ替える」ための設定
  deployment_minimum_healthy_percent = 100  # 新しいタスクを起動する際、既存タスクをいきなり全部止めないで「最低100%は稼働中」を保証
  deployment_maximum_percent = 200          # 一時的に2倍（新旧あわせて2つ）まで同時に起動してもOK
  health_check_grace_period_seconds = 60    # ALBのヘルスチェックが失敗しても、指定秒数は待ってほしいという猶予時間。起動に時間がかかるアプリ対策

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_tg.arn
    container_name = var.frontend_container_name
    container_port = var.frontend_container_port
  }

  # 「ALBリスナーを先に作成してからfrontendサービスを作成」という依存関係の明示。Terraformの独自設定
  depends_on = [aws_lb_listener.frontend]
}

# バックエンド
resource "aws_ecs_service" "backend" {
  name = var.backend_service_family
  cluster = aws_ecs_cluster.tripia_prod_cluster.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  desired_count = 1
  launch_type = "FARGATE"
  enable_execute_command = true

  network_configuration {
    subnets = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    # security_groups = [aws_security_group.backend_ecs_task.id]
    security_groups = [aws_security_group.public.id]
    assign_public_ip = true
  }

  deployment_controller {
    type = "ECS"
  }

  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent = 200

  health_check_grace_period_seconds = 120

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_tg.arn
    container_name = var.backend_container_name
    container_port = var.backend_container_port
  }

  depends_on = [aws_lb_listener.backend]
}


## -------------------------- タスク作成 -------------------------- ##

# フロントエンド
resource "aws_ecs_task_definition" "frontend_task" {
  family = var.frontend_task_family       # タスク名
  network_mode = "awsvpc"                 # ネットワークモード。Fargate では awsvpc を使用
  requires_compatibilities = ["FARGATE"]  # 対応コンピューティング環境（FARGATEを指定）
  cpu = "256"
  memory = "512"                          # MB
  execution_role_arn = "arn:aws:iam::${var.aws_account_id}:role/ecsTaskExecutionRole" # ECS がタスクを実行する際に必要な IAM ロール
  task_role_arn = "arn:aws:iam::${var.aws_account_id}:role/ecsTaskExecutionRole"      # タスクコンテナが他AWSサービスにアクセスするための IAM ロール

  container_definitions = jsonencode([   # jsonencode で JSON 配列としてコンテナ設定を渡す
    {
      name = var.frontend_container_name
      image = "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.ecr_repository_frontend_name}:${var.ecr_image_tag_var}"
      essential = true                   # このコンテナがタスクで必須かどうか
      portMappings = [
        {
          containerPort = var.frontend_container_port
          hostPort      = var.frontend_container_port
          protocol       = "tcp"
        }
      ]

      # ログ設定（CloudWatch Logs に出力）
      logConfiguration = {
        logDriver = "awslogs"                                   # AWS CloudWatch Logs に送る

        # CloudWatch Logs の設定オプション
        options = {
          "awslogs-group" = "/ecs/${var.frontend_task_family}"  # ロググループ名
          "awslogs-region" = var.aws_region
          "awslogs-stream-prefix" = "ecs"                       # ストリームプレフィックス（Cloud Watch独自の定義）
        }
      }
    }
  ])
}


# バックエンド
resource "aws_ecs_task_definition" "backend_task" {
  family = var.backend_task_family
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = "256"
  memory = "512"
  execution_role_arn = "arn:aws:iam::${var.aws_account_id}:role/ecsTaskExecutionRole"
  task_role_arn = "arn:aws:iam::${var.aws_account_id}:role/ecsTaskExecutionRole"

  container_definitions = jsonencode([
    {
      name = var.backend_container_name
      image = "${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.ecr_repository_backend_name}:${var.ecr_image_tag_var}"
      essential = true
      environment = [
        { name = "AWS_REGION", value = var.aws_region },
        { name = "AWS_ACCESS_KEY", value = var.aws_access_key },
        { name = "AWS_SECRET_ACCESS_KEY", value = var.aws_secret_access_key },
        { name = "DATABASE_URL", value = "postgresql://${var.db_username}:${var.db_password}@${aws_db_instance.tripia.endpoint}/${var.db_name}?schema=public" },
        { name = "S3_BUCKET_NAME", value = var.s3_bucket_name },
        { name = "FRONTEND_URL", value = "http://${aws_lb.frontend_alb.dns_name}" }
      ]
      portMappings = [
        {
          containerPort = var.backend_container_port
          hostPort      = var.backend_container_port
          protocol       = "tcp"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group" = "/ecs/${var.backend_task_family}"
          "awslogs-region" = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

