<?php

namespace Undefined\Stash;

/**
 * Add <body> classes
 * @param $classes
 * @return array
 */
function body_class($classes)
{
    if (!is_archive() && !is_home()) {
        global $post;
        $classes[] = get_post($post)->post_name;
    }

    if (Controller::Instance()->getClass()) {
        $classes[] = Controller::Instance()->getClass();
    }

    // Add page slug if it doesn't exist
    if (is_single() || is_page() && !is_front_page()) {
        if (!in_array(basename(get_permalink()), $classes)) {
            $classes[] = basename(get_permalink());
        }
    }

    return $classes;
}

add_filter('body_class', __NAMESPACE__ . '\\body_class');

/**
 * Clean up the_excerpt()
 */
function excerpt_more()
{
    return ' &hellip; <a href="' . get_permalink() . '">' . __('Continued', 'stash') . '</a>';
}

add_filter('excerpt_more', __NAMESPACE__ . '\\excerpt_more');

function dd($var)
{
    echo '<pre>';
    var_dump($var);
    die();
}