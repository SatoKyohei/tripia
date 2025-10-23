output "frontend_alb_dns" {
  description = "Frontend ALB DNS name"
  value       = aws_lb.frontend_alb.dns_name
}

output "backend_alb_dns" {
  description = "Backend ALB DNS name"
  value       = aws_lb.backend_alb.dns_name
}