# - VPC ---------------------------------------------------------------- #

resource "aws_vpc" "alpha" {
  cidr_block       = lookup(var.vpc, "cidr")
  instance_tenancy = lookup(var.vpc, "tenancy")
  tags = {
    Name = lookup(var.global, "name")

  }
}

# - GATEWAY ------------------------------------------------------------ #

resource "aws_internet_gateway" "alpha" {
  vpc_id = aws_vpc.alpha.id
  tags = {
    Name = lookup(var.global, "name")
  }
}

resource "aws_eip" "alpha" {
  # depends_on  = [aws_vpc.tfgui_vpc]
  vpc = lookup(var.vpc, "eip_vpc")
  tags = {
    Name = lookup(var.global, "name")
  }
}

resource "aws_nat_gateway" "alpha" {
  allocation_id = aws_eip.alpha.id
  subnet_id     = aws_subnet.alpha_pub.id
  tags = {
    Name = lookup(var.global, "name")
  }
}

# - SUBNETS ------------------------------------------------------------ #

resource "aws_subnet" "alpha_pub" {
  vpc_id     = aws_vpc.alpha.id
  cidr_block = lookup(var.vpc, "pub_subnet")
  tags = {
    Name = "${lookup(var.global, "name")}-vpc-pub"
  }
}

resource "aws_subnet" "alpha_prv" {
  vpc_id     = aws_vpc.alpha.id
  cidr_block = lookup(var.vpc, "prv_subnet")
  tags = {
    Name = "${lookup(var.global, "name")}-vpc-prv"
  }
}

# - ROUTE TABLE -------------------------------------------------------- #

resource "aws_route_table" "alpha_pub" {
  vpc_id = aws_vpc.alpha.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.alpha.id
  }
  tags = {
    Name = "${lookup(var.global, "name")}-vpc-pub"
  }
}

resource "aws_route_table" "alpha_prv" {
  vpc_id = aws_vpc.alpha.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.alpha.id
  }
  tags = {
    Name = "${lookup(var.global, "name")}-vpc-prv"
  }
}

resource "aws_route_table_association" "alpha_pub" {
  subnet_id      = aws_subnet.alpha_pub.id
  route_table_id = aws_route_table.alpha_pub.id
}

resource "aws_route_table_association" "alpha_prv" {
  subnet_id      = aws_subnet.alpha_prv.id
  route_table_id = aws_route_table.alpha_prv.id
}
