variable "global" {
  type = map(string)
  default = {
    name   = "tfgui-alpha"
    region = "us-east-1"
  }
}

variable "vpc" {
  type = map(string)
  default = {
    tenancy    = "default"
    cidr       = "10.0.0.0/24"
    pub_subnet = "10.0.0.128/26"
    prv_subnet = "10.0.0.192/26"
    eip_vpc    = true
  }
}

variable "ec2" {
  type = map(string)
  default = {
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
    password            = "alphaalphaalpha"
    publicly_accessible = false
    skip_final_snapshot = true
  }
}
 
