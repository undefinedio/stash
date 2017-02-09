<?php
namespace Undefined\Stash;

class Cache
{
    /**
     * Returns the time in seconds how long timber should cache its rendring
     *
     * @return int
     */
    static function getTimerTime()
    {
        if ($_ENV['WP_ENV'] != "production") {
            return 2;
        } else {
            return 6000;
        }
    }
}