# - SECURITY GROUPS ---------------------------------------------------- #

resource "aws_security_group" "alpha_ec2" {
  depends_on  = [aws_vpc.alpha]
  name        = "${lookup(var.global, "name")}-ec2"
  description = "${lookup(var.global, "name")}-ec2"
  vpc_id      = aws_vpc.alpha.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ingress {
  #   from_port   = 80
  #   to_port     = 80
  #   protocol    = "tcp"
  #   cidr_blocks = ["0.0.0.0/0"]
  # }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
  tags = {
    Name = "${lookup(var.global, "name")}-ec2"
  }
}

# - INSTANCE ----------------------------------------------------------- #

resource "aws_instance" "alpha" {
  depends_on                  = [aws_security_group.alpha_ec2]
  ami                         = lookup(var.ec2, "ami")
  instance_type               = lookup(var.ec2, "type")
  associate_public_ip_address = lookup(var.ec2, "public_ip")
  subnet_id                   = aws_subnet.alpha_pub.id

  vpc_security_group_ids = [
    aws_security_group.alpha_ec2.id
  ]
  tags = {
    Name = lookup(var.global, "name")
  }
}
