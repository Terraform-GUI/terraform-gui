# - BUCKET ------------------------------------------------------------- #

resource "aws_s3_bucket" "alpha" {
  bucket = lookup(var.global, "name")

  tags = {
    Name = lookup(var.global, "name")
  }
}

resource "aws_s3_bucket_acl" "alpha" {
  bucket = aws_s3_bucket.alpha.id
  acl    = lookup(var.s3, "acl")
}
