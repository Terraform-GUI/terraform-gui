variable "global" {
  type = map(string)
  default = {
    # WARN: need to be alpha-lowercase with comma: NO spaces or Uppercase
    name   = "tfgui-alpha"
    region = "us-east-1"
  }
}

variable "vpc" {
  type = map(string)
  default = {
    # WARN: need to be 'default'
    tenancy    = "default"
    cidr       = "10.0.0.0/24"
    pub_subnet = "10.0.0.128/26"
    prv_subnet = "10.0.0.192/26"
    # to be added respectively in public and private
    pub_availability_zone = "us-east-1a"
    prv_availability_zone = "us-east-1b"
    eip_vpc               = true
  }
}

variable "ec2" {
  type = map(string)
  default = {
    # WARN: need to be specific IDs (maybe use select form)
    ami       = "ami-052efd3df9dad4825"
    type      = "t2.micro"
    public_ip = true
  }
}

variable "s3" {
  type = map(string)
  default = {
    acl = "private"
  }
}

variable "rds" {
  type = map(string)
  default = {
    type                = "db.t3.micro"
    engine              = "postgres"
    version             = "13"
    family              = "postgres13"
    username            = "alpha"
    # WARN: need to be > 8 characters
    password            = "alphaalphaalpha"
    publicly_accessible = false
    skip_final_snapshot = true
  }
}

variable "sqs" {
  type = map(string)
  default = {
    delay_seconds             = 90
    max_message_size          = 2048
    message_retention_seconds = 86400
    receive_wait_time_seconds = 10
  }
}

