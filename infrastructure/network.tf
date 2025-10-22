## -------------------------- VPC -------------------------- ##

resource "aws_vpc" "main" {
    cidr_block = var.vpc_cidr_block
    enable_dns_hostnames = true              # VPC 内のリソースが DNS 解決を使用できるようにする
    enable_dns_support = true                # VPC 内のEC2インスタンスに パブリックDNSホスト名を割り当てる
    tags = { Name = "terraform-vpc"}
}


## -------------------------- サブネット -------------------------- ##
# ALB1つにつきAZが最低2つ必要なので、public/privateともに2つずつ作成

# パブリックサブネット1
resource "aws_subnet" "public_subnet_1" {
    vpc_id = aws_vpc.main.id                 # 上記で作成したVPCのIDを参照
    cidr_block = var.public_subnet_cidr1
    availability_zone = "${var.aws_region}a" # ap-northeast-1a
    tags = { Name = "terraform-public-subnet1" }
}

# パブリックサブネット2
resource "aws_subnet" "public_subnet_2" {
    vpc_id = aws_vpc.main.id                 # 上記で作成したVPCのIDを参照
    cidr_block = var.public_subnet_cidr2
    availability_zone = "${var.aws_region}c" # ap-northeast-1c
    tags = { Name = "terraform-public-subnet2" }
}

# プライベートサブネット1
# resource "aws_subnet" "private_subnet_1" {
#     vpc_id = aws_vpc.main.id
#     cidr_block = var.private_subnet_cidr1
#     availability_zone = "${var.aws_region}a"
#     tags = { Name = "terraform-private-subnet1" }
# }

# # プライベートサブネット2
# resource "aws_subnet" "private_subnet_2" {
#     vpc_id = aws_vpc.main.id
#     cidr_block = var.private_subnet_cidr2
#     availability_zone = "${var.aws_region}c"
#     tags = { Name = "terraform-private-subnet2" }
# }


## -------------------------- インターネットゲートウェイ -------------------------- ##

resource "aws_internet_gateway" "main" {
    vpc_id = aws_vpc.main.id
    tags = { Name = "terraform-igw" }
}

## -------------------------- NAT Gateway -------------------------- ##

# resource "aws_nat_gateway" "nat" {
#     allocation_id = aws_eip.nat.id
#     subnet_id = aws_subnet.public_subnet_1.id
#     tags = { Name = "tripia-nat-gateway" }
# }


## -------------------------- EIP -------------------------- ##

# resource "aws_eip" "nat" {
#     tags = { Name = "tripia-nat-eip" }
# }


## -------------------------- ルートテーブル -------------------------- ##

# パブリックルートテーブル
resource "aws_route_table" "public" {
    vpc_id = aws_vpc.main.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.main.id
    }
    tags = { Name = "terraform-public-rt" }
}

# プライベートルートテーブル（NAT用）
# resource "aws_route_table" "private" {
#     vpc_id = aws_vpc.main.id
#     tags = { Name = "tripia-private-rt" }
# }

## -------------------------- 静的ルート -------------------------- ##

# resource "aws_route" "private_nat" {
#     route_table_id = aws_route_table.private.id
#     destination_cidr_block = "0.0.0.0/0"
#     nat_gateway_id = aws_nat_gateway.nat.id
# }


## -------------------------- リソースの関連付け -------------------------- ##

# パブリックルートテーブルとサブネットの紐付け
resource "aws_route_table_association" "public_1" {
    subnet_id = aws_subnet.public_subnet_1.id
    route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_2" {
    subnet_id = aws_subnet.public_subnet_2.id
    route_table_id = aws_route_table.public.id
}

# プライベートルートテーブルとサブネットの紐付け
# resource "aws_route_table_association" "private_1" {
#     subnet_id = aws_subnet.private_subnet_1.id
#     route_table_id = aws_route_table.private.id
# }

# resource "aws_route_table_association" "private_2" {
#     subnet_id = aws_subnet.private_subnet_2.id
#     route_table_id = aws_route_table.private.id
# }


## -------------------------- セキュリティグループ -------------------------- ##

resource "aws_security_group" "public" {
    name = "terraform-public-sg"
    description = "Security group for all"
    vpc_id = aws_vpc.main.id

    # インバウンドルール（外部からの通信）：HTTP
    ingress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"] # 全てのIPアドレスからのアクセスを許可
        description = "Allow HTTP"
    }

    # アウトバウンドルール（内部からの通信）：すべて許可
    egress {
        from_port = 0               # from, toが0の場合、すべてのポート
        to_port = 0
        protocol = "-1"             # -1はすべてのプロトコル
        cidr_blocks = ["0.0.0.0/0"] # 全ての宛先へ許可
    }

    tags = { Name = "terraform-public-sg" }
}

# # フロントエンドALB
# resource "aws_security_group" "alb_frontend" {
#     name = "terraform-alb-frontend-sg"
#     description = "Security group for web server"
#     vpc_id = aws_vpc.main.id

#     # インバウンドルール（外部からの通信）：HTTP
#     ingress {
#         from_port = 80              # 開始ポート
#         to_port = 80                # 終了ポート
#         protocol = "tcp"
#         cidr_blocks = ["0.0.0.0/0"] # 全てのIPアドレスからのアクセスを許可
#         description = "Allow HTTP"
#     }

#     # アウトバウンドルール（内部からの通信）：すべて許可
#     egress {
#         from_port = 0               # from, toが0の場合、すべてのポート
#         to_port = 0
#         protocol = "-1"             # -1はすべてのプロトコル
#         cidr_blocks = ["0.0.0.0/0"] # 全ての宛先へ許可
#     }

#     tags = { Name = "terraform-alb-frontend-sg" }
# }


# # フロントエンドECSタスク
# resource "aws_security_group" "frontend_ecs_task" {
#     name = "terraform-frontend-sg"
#     description = "Security group for frontend"
#     vpc_id = aws_vpc.main.id

#     # インバウンドルール
#     ingress {
#         from_port = var.frontend_container_port
#         to_port = var.frontend_container_port
#         protocol = "tcp"
#         security_groups = [aws_security_group.alb_frontend.id]
#     }

#     # アウトバウンドルール
#     egress {
#         from_port = 0
#         to_port = 0
#         protocol = "-1"
#         cidr_blocks = ["0.0.0.0/0"]
#     }
    
#     tags = {Name = "terraform-frontend-sg"}
# }

# # バックエンドALB
# resource "aws_security_group" "alb_backend" {
#     name = "terraform-alb-backend-sg"
#     description = "Security group for backend server"
#     vpc_id = aws_vpc.main.id

#     # インバウンドルール（外部からの通信）：HTTP
#     ingress {
#         from_port = 80
#         to_port = 80
#         protocol = "tcp"
#         security_groups = [aws_security_group.frontend_ecs_task.id, aws_security_group.alb_frontend.id]
#         description = "Allow traffic from frontend"
#     }

#     # アウトバウンドルール（内部からの通信）：すべて許可
#     egress {
#         from_port = 0
#         to_port = 0
#         protocol = "-1"
#         cidr_blocks = ["0.0.0.0/0"]
#         description = "Allow all outbound traffic"
#     }

#     tags = {Name = "terraform-alb-backend-sg"}
# }

# # バックエンドECSタスク
# resource "aws_security_group" "backend_ecs_task" {
#     name = "terraform-backend-sg"
#     description = "Security group for backend"
#     vpc_id = aws_vpc.main.id

#     # インバウンドルール
#     ingress {
#         from_port = var.backend_container_port
#         to_port = var.backend_container_port
#         protocol = "tcp"
#         security_groups = [aws_security_group.alb_backend.id]
#     }

#     # アウトバウンドルール
#     egress {
#         from_port = 0
#         to_port = 0
#         protocol = "-1"
#         cidr_blocks = ["0.0.0.0/0"]
#     }
    
#     tags = {Name = "terraform-backend-sg"}
# }

# # DB
# resource "aws_security_group" "rds" {
#     name = "terraform-rds-sg"
#     description = "Security group for DB"
#     vpc_id = aws_vpc.main.id

#     # インバウンドルール（backendサーバからの通信）
#     ingress {
#         from_port = var.db_port
#         to_port = var.db_port
#         protocol = "tcp"
#         security_groups = [aws_security_group.backend_ecs_task.id]
#         description = "Allow traffic from frontend"
#     }

#     # アウトバウンドルール（内部からの通信）：すべて許可
#     egress {
#         from_port = 0
#         to_port = 0
#         protocol = "-1"
#         cidr_blocks = ["0.0.0.0/0"]
#         description = "Allow all outbound traffic"
#     }

#     tags = {Name = "terraform-rds-sg"}
# }


## -------------------------- ALB -------------------------- ##

# フロントエンド用
resource "aws_lb" "frontend_alb" {
    name = "terraform-alb-frontend"
    internal = false                   # インターネット向け
    load_balancer_type = "application" # ALB
    # security_groups = [aws_security_group.alb_frontend.id]
    security_groups = [aws_security_group.public.id]
    subnets = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]

    enable_deletion_protection = false # 削除保護を無効化

    tags = { Name = "terraform-alb-frontend" }
}

# バックエンド用
resource "aws_lb" "backend_alb" {
    name = "terraform-alb-backend"
    internal = false
    load_balancer_type = "application" # ALB
    # security_groups = [aws_security_group.alb_backend.id]
    security_groups = [aws_security_group.public.id]
    subnets = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]

    enable_deletion_protection = false # 削除保護を無効化

    tags = { Name = "terraform-alb-backend" }
}

## -------------------------- ターゲットグループ -------------------------- ##

# フロントエンド用
resource "aws_lb_target_group" "frontend_tg" {
    name = "terraform-frontend-alb-tg"
    port = var.frontend_container_port
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id
    target_type = "ip"  # ECSタスクの awsvpc が Fargate の場合：ターゲットタイプは ip にする必要がある

    # ヘルスチェック
    health_check {
        path = "/"
        interval = 30
        timeout = 5
        healthy_threshold = 3
        unhealthy_threshold = 3
        matcher = "200"
    }

    tags = { Name = "terraform-frontend-alb-tg" }
}

# バックエンド用
resource "aws_lb_target_group" "backend_tg" {
    name = "terraform-backend-alb-tg"
    port = var.backend_container_port
    protocol = "HTTP"
    vpc_id = aws_vpc.main.id
    target_type = "ip"

    # ヘルスチェック
    health_check {
        path = "/"
        interval = 60
        timeout = 30
        healthy_threshold = 3
        unhealthy_threshold = 3
        matcher = "200"
    }

    tags = { Name = "terraform-backend-alb-tg" }
}


## -------------------------- ALBリスナー -------------------------- ##

resource "aws_lb_listener" "frontend" {
    load_balancer_arn = aws_lb.frontend_alb.arn
    port = 80
    protocol = "HTTP"

    default_action {
      type = "forward"
      target_group_arn = aws_lb_target_group.frontend_tg.arn
    }
}

resource "aws_lb_listener" "backend" {
    load_balancer_arn = aws_lb.backend_alb.arn
    port = 80
    protocol = "HTTP"

    default_action {
      type = "forward"
      target_group_arn = aws_lb_target_group.backend_tg.arn
    }
}