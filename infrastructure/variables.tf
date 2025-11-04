## ---------------------- 共通 ---------------------- ##
variable "aws_region" {
  description = "AWS region"  # 変数の説明
  type = string               # データ型
  default = "ap-northeast-1"  # デフォルト値
}

variable "aws_access_key" {
  description = "AWS access key"
  type = string
  sensitive = true
}

variable "aws_secret_access_key" {
  description = "AWS secret access key"
  type = string
  sensitive = true
}

## ---------------------- ネットワーク ---------------------- ##
variable "vpc_cidr_block" {
  description = "VPC CIDR block"
  type = string
  default = "172.31.0.0/16"
}

variable "public_subnet_cidr1" {
  description = "Public subnet CIDR block1"
  type = string
  default = "172.31.1.0/24"
}

variable "public_subnet_cidr2" {
  description = "Public subnet CIDR block1"
  type = string
  default = "172.31.2.0/24"
}

variable "private_subnet_cidr1" {
  description = "Private subnet CIDR block1"
  type = string
  default = "172.31.3.0/24"
}

variable "private_subnet_cidr2" {
  description = "Private subnet CIDR block2"
  type = string
  default = "172.31.4.0/24"
}

## ---------------------- Route53 ---------------------- ##
variable "tripia_zone_id" {
  description = "Route53 hosted zone ID"
  type = string
  default = "Z07294792SYRIT4R2PKWH"  
}

variable "tripia_fqdn" {
  description = "Tripia FQDN"
  type = string
  default = "tripia.click"
}


## ---------------------- S3 ---------------------- ##
variable "s3_bucket_name" {
  description = "S3 bucket name"
  type = string
  default = "tripia-bucket"  
}


## ---------------------- RDS ---------------------- ##

variable "db_instance_name" {
  description = "RDS database instance name"
  type = string
  default = "tripia-db"  
}

variable "db_name" {
  description = "RDS database name"
  type = string
  default = "tripia"
}

variable "db_username" {
  description = "RDS master username"
  type = string
  sensitive = true    # terraform plan や terraform apply 時のログに値を出力しない
}

variable "db_password" {
  description = "RDS master password"
  type = string
  sensitive = true
}

variable "db_port" {
  description = "RDS port"
  type = number
  default = 5432  
}



## ---------------------- ECR ---------------------- ##
variable "aws_account_id" {
  description = "AWS account ID"
  type = string
  sensitive = true
}

variable "ecr_repository_frontend_name" {
  description = "ECR repository name for frontend"
  type = string
  default = "tripia/frontend"  
}

variable "ecr_repository_backend_name" {
  description = "ECR repository name for backend"
  type = string
  default = "tripia/backend"  
}

variable "ecr_image_tag_var" {
  description = "ECR image tag version"
  type        = string
  default     = "latest"
}

## ---------------------- ECS ---------------------- ##
variable "ecs_cluster_name" {
  description = "ECS cluster name"
  type = string
  default = "tripia-prod-cluster"  
}

variable "frontend_service_family" {
  description = "ECS frontend service family"
  type = string
  default = "tripia-frontend-prod-task-service"
}

variable "backend_service_family" {
  description = "ECS backend service family"
  type = string
  default = "tripia-backend-prod-task-service"
}

variable "frontend_task_family" {
  description = "ECS frontend task family"
  type = string
  default = "tripia-frontend-prod-task"  
}

variable "backend_task_family" {
  description = "ECS backend task family"
  type = string
  default = "tripia-backend-prod-task"  
}

variable "frontend_container_name" {
  description = "Frontend container name"
  type = string
  default = "tripia-frontend"
}

variable "backend_container_name" {
  description = "Backend container name"
  type = string
  default = "tripia-backend"
}

variable "frontend_container_port" {
  description = "Frontend container port"
  type = number
  default = 3000  
}

variable "backend_container_port" {
  description = "backend container port"
  type = number
  default = 8080  
}

