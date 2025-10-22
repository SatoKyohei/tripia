## -------------------------- S3バケット作成 -------------------------- ##

resource "aws_s3_bucket" "tripia" {
  bucket = var.s3_bucket_name
  force_destroy = true  # 手動削除許可
  tags = { Name = "tripia-s3-bucket" }
}



## -------------------------- バージョニング設定 -------------------------- ##

resource "aws_s3_bucket_versioning" "tripia" {
  bucket = aws_s3_bucket.tripia.id

  versioning_configuration {
    status = "Suspended"    # バージョニング無効化
  }
}


## -------------------------- サーバーサイド暗号化 -------------------------- ##

resource "aws_s3_bucket_server_side_encryption_configuration" "tripia" {
  bucket = aws_s3_bucket.tripia.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"   # AES256で暗号化
    }
    bucket_key_enabled = true
  }
}


## -------------------------- パブリックアクセスブロック設定 -------------------------- ##

resource "aws_s3_bucket_public_access_block" "tripia" {
  bucket = aws_s3_bucket.tripia.id

  block_public_acls = false
  block_public_policy = false
  ignore_public_acls = false
  restrict_public_buckets = false
}

## -------------------------- バケットポリシー -------------------------- ##

resource "aws_s3_bucket_policy" "tripia" {
  bucket = aws_s3_bucket.tripia.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid = "PublicReadForGetBucketObjects"
        Effect = "Allow"
        Principal = "*"
        Action = "s3:GetObject"
        Resource = "arn:aws:s3:::${var.s3_bucket_name}/*"
      }
    ]
  })
  depends_on = [ aws_s3_bucket_public_access_block.tripia ]
}

## -------------------------- 初期オブジェクト の作成 -------------------------- ##

resource "aws_s3_object" "uploads_and_testData_dir" {
  for_each = toset(["uploads/", "testData/"])  # 複数ディレクトリを作成するためのループ
  
  bucket = aws_s3_bucket.tripia.id
  key = "${each.value}" # keyにスラッシュを入れることでディレクトリとして作成される
  content = ""
}

resource "aws_s3_object" "planThumbnails_for_seedData" {
  for_each = fileset("${path.module}/testData/", "*")

  bucket = aws_s3_bucket.tripia.id
  key = "testData/${each.value}"
  source = "${path.module}/testData/${each.value}"
  content_type = "image/jpeg"
}
