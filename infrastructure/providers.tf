# Terraform のバージョンとプロバイダの指定
# プロバイダ：AWS、GCPなどのクラウドサービスと通信するためのプラグイン
terraform {
  required_version = ">= 1.13.4" # Terraform本体のバージョン
  required_providers {
    aws = {
        source = "hashicorp/aws" # プロバイダの提供元
        version = "~> 5.0"       # プロバイダのバージョン
    }
  }
}

# AWSプロバイダの設定
provider "aws" {
    region = var.aws_region  
}

