# SSL証明書のリクエスト
resource "aws_acm_certificate" "cert" {
    domain_name       = "tripia.click"
    validation_method = "DNS"

    tags = {
      Environment = "tripia-production"
    }

    # Terraform のライフサイクル設定。既存リソースを消す前に新しいものを先に作る。証明書更新でダウンタイムを避けたい場合に有効（ただし ACM は ARN が変わる等で注意が必要）。
    lifecycle {
      create_before_destroy = true
    }
}

# ACM の検証リソース。これにより Terraform は「DNS レコードが反映されたか」を待ち、ACM 側の検証を完了させる。
resource "aws_acm_certificate_validation" "cert_validation" {

    # 検証する対象の証明書の ARN
    certificate_arn = aws_acm_certificate.cert.arn
    # 検証に使う DNS レコードの FQDN
    validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}
