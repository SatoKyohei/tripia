## -------------------------- DBインスタンス作成 -------------------------- ##

resource "aws_db_instance" "tripia" {
  identifier = var.db_instance_name
  engine = "postgres"
  engine_version = "17.2"
  instance_class = "db.t3.micro"          # 無料利用枠対応のインスタンスタイプ
  allocated_storage = 20
  storage_type = "gp3"

  username = var.db_username
  password = var.db_password

  db_subnet_group_name = aws_db_subnet_group.tripia.name
  # vpc_security_group_ids = [aws_security_group.rds.id]
  vpc_security_group_ids = [aws_security_group.public.id]
  publicly_accessible = false             # 外部からの直接アクセスを無効化
  availability_zone = "${var.aws_region}a"

  skip_final_snapshot = true              # 削除時のスナップショット作成をスキップ
  backup_retention_period = 0             # 自動バックアップを無効化
  delete_automated_backups = true         # 自動バックアップを削除

  performance_insights_enabled = false    # Performance Insightsを無効化
  monitoring_interval = 0                 # 拡張モニタリングを無効化

  tags = { Name = "tripia-rds-instance" }
}


## -------------------------- DBサブネットグループ作成 -------------------------- ##

resource "aws_db_subnet_group" "tripia" {
  name = "tripia-db-subnet-group"

  # network.tf の private サブネットを指定。AZは最低2つ以上必須なので、サブネットも最低2つ以上指定。
  subnet_ids = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]

  tags = { Name = "tripia-db-subnet-group" }
}


