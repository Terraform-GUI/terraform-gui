<?php

namespace App\Client;

use DateTimeImmutable;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class Github
{
    public function __construct(protected HttpClientInterface $client)
    {
    }

    public function createState(): string
    {
        $date         = new DateTimeImmutable();
        $expireAt     = $date->modify('+6 minutes')->getTimestamp();      // Add 60 seconds
        $payload      = [
            'iat'  => $date->getTimestamp(),
            'iss'  => $_ENV['DOMAIN'],
            'nbf'  => $date->getTimestamp(),
            'exp'  => $expireAt,
            'data' => [
                'client_id' => $_ENV['GITHUB_CLIENT_ID'],
            ],
        ];

        return JWT::encode($payload, $_ENV['GITHUB_CLIENT_SECRET'], 'HS256');
    }

    public function verifyState(string $state, string $host): bool
    {
        $decoded = JWT::decode($state, new Key($_ENV['GITHUB_CLIENT_SECRET'], 'HS256'));
        $date    = new DateTimeImmutable();

        if ($decoded->exp < $date->getTimestamp()) {
            return false;
        }
        if ($decoded->iss !== $_ENV['DOMAIN'] || $decoded->iss !== $host) {
            return false;
        }
        if ($decoded->nbf > $date->getTimestamp()) {
            return false;
        }
        if ($decoded->data->client_id !== $_ENV['GITHUB_CLIENT_ID']) {
            return false;
        }

        return true;
    }

    public function getCallbackUrl(): string
    {
        $domain = $_ENV['DOMAIN'];

        if ('dev' === $_ENV['APP_ENV']) {
            return "http://{$domain}:8080/login/github/callback";
        }

        return "https://{$domain}/login/github/callback";
    }

    public function getOauthUrl(string $state): string
    {
        $callbackUrl = $this->getCallbackUrl();

        $state = $this->createState();
        $url   = "https://github.com/login/oauth/authorize?client_id={$_ENV['GITHUB_CLIENT_ID']}&redirect_uri={$callbackUrl}&state={$state}&scope=user:email";

        return $url;
    }

    public function getAccessToken(string $code): ?string
    {
        $clientId     = $_ENV['GITHUB_CLIENT_ID'];
        $clientSecret = $_ENV['GITHUB_CLIENT_SECRET'];

        $callbackUrl = $this->getCallbackUrl();

        $url = "https://github.com/login/oauth/access_token?client_id={$clientId}&client_secret={$clientSecret}&code={$code}&redirect_uri={$callbackUrl}";

        $response = $this->client->request('GET', $url, [
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);

        $accessToken = $response->toArray()['access_token'] ?? null;

        return $accessToken;
    }

    public function getEmail(string $accessToken): ?string
    {
        $url      = 'https://api.github.com/user/emails';
        $response = $this->client->request('GET', $url, [
            'headers' => [
                'Accept'        => 'application/json',
                'Authorization' => 'token '.$accessToken,
            ],
        ]);

        $emails = $response->toArray();

        foreach ($emails as $email) {
            if (true === $email['primary']) {
                return $email['email'];
            }
        }

        return null;
    }
}
