<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use Gesdinet\JWTRefreshTokenBundle\Document\RefreshToken as BaseRefreshToken;

#[MongoDB\Document(collection: 'refresh_tokens')]
class RefreshToken extends BaseRefreshToken
{
}
