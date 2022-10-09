resource "aws_sqs_queue" "alpha" {
  name                      = "${lookup(var.global, "name")}-sqs"
  delay_seconds             = lookup(var.sqs, "delay_seconds")
  max_message_size          = lookup(var.sqs, "max_message_size")
  message_retention_seconds = lookup(var.sqs, "message_retention_seconds")
  receive_wait_time_seconds = lookup(var.sqs, "receive_wait_time_seconds")

  tags = {
    Name = lookup(var.global, "name")
  }
}
