# - SECURITY GROUPS ---------------------------------------------------- #

resource "aws_security_group" "alpha_rds" {
  depends_on  = [aws_vpc.alpha]
  name        = "${lookup(var.global, "name")}-rds"
  description = "${lookup(var.global, "name")}-rds"
  vpc_id      = aws_vpc.alpha.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${lookup(var.global, "name")}-rds"
  }
}

# - INSTANCE ----------------------------------------------------------- #

resource "aws_db_subnet_group" "alpha" {
  name       = lookup(var.global, "name")
  subnet_ids = [aws_subnet.alpha_pub.id, aws_subnet.alpha_prv.id]

  tags = {
    Name = lookup(var.global, "name")
  }
}

resource "aws_db_parameter_group" "alpha" {
  name   = lookup(var.global, "name")
  family = lookup(var.rds, "family")

  parameter {
    name  = "log_connections"
    value = "1"
  }
  tags = {
    Name = lookup(var.global, "name")
  }
}

resource "aws_db_instance" "alpha" {
  identifier             = lookup(var.global, "name")
  allocated_storage      = 5
  instance_class         = lookup(var.rds, "type")
  engine                 = lookup(var.rds, "engine")
  engine_version         = lookup(var.rds, "version")
  username               = lookup(var.rds, "username")
  password               = lookup(var.rds, "password")
  publicly_accessible    = lookup(var.rds, "publicly_accessible")
  skip_final_snapshot    = lookup(var.rds, "skip_final_snapshot")
  db_subnet_group_name   = aws_db_subnet_group.alpha.name
  parameter_group_name   = aws_db_parameter_group.alpha.name
  vpc_security_group_ids = [aws_security_group.alpha_rds.id]
  tags = {
    Name = lookup(var.global, "name")
  }
}
