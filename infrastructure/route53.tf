# ドメイン取得はコンソールから直接実施済み

# フロントエンドALBへのRoute53エイリアス設定
resource "aws_route53_record" "www" {
    zone_id = var.tripia_zone_id
    name = var.tripia_fqdn
    type = "A"

    alias {
        name = aws_lb.frontend_alb.dns_name
        zone_id = aws_lb.frontend_alb.zone_id
        evaluate_target_health = true
    }
}

# DNS検証用のCNAMEをRoute53に自動作成
resource "aws_route53_record" "cert_validation" {
    # acmで作成した定義が持つ、name, type, value
    for_each = {
        for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
            name = dvo.resource_record_name
            type = dvo.resource_record_type
            value = dvo.resource_record_value
        }
    }
    
    zone_id = var.tripia_zone_id
    allow_overwrite = true        # 既存の同名レコードを上書き
    name = each.value.name
    type = each.value.type
    ttl = 60
    records = [each.value.value]
}