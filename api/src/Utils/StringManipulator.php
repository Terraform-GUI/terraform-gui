<?php

namespace App\Utils;

class StringManipulator
{
    public static function convertToSnakeCase(string $string): string
    {
        $pattern = '!\b[a-zA-Z0-9]+(?:[a-zA-Z0-9]+)*!';
        preg_match_all($pattern, $string, $matches);
        $ret = $matches[0];
        foreach ($ret as &$match) {
            $match = $match == strtoupper($match) ?
                strtolower($match) :
                lcfirst($match);
        }

        return implode('_', $ret);
    }
}
