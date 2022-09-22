# - VPC ---------------------------------------------------------------- #

output "vpc_id" {
  description = "ID of VPC"
  value       = aws_vpc.alpha.id
}

# - EC2 ---------------------------------------------------------------- #

output "ec2_id" {
  description = "ID of EC2 instance"
  value       = aws_instance.alpha.id
}
output "ec2_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.alpha.public_ip
}

# - S3 ----------------------------------------------------------------- #

output "s3_id" {
  description = "ID of Bucket S3"
  value       = aws_s3_bucket.alpha.id
}

# - EC2 ---------------------------------------------------------------- #

output "rds_hostname" {
  description = "RDS instance hostname"
  value       = aws_db_instance.alpha.address
  sensitive   = true
}
output "rds_port" {
  description = "RDS instance port"
  value       = aws_db_instance.alpha.port
  sensitive   = true
}

output "rds_username" {
  description = "RDS instance root username"
  value       = aws_db_instance.alpha.username
  sensitive   = true
}

# - SQS ---------------------------------------------------------------- #

output "sqs_id" {
  description = "ID of SQS"
  value       = aws_sqs_queue.alpha.id
}