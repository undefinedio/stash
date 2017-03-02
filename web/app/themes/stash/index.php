<?php
use Undefined\Stash\Controller;

/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

if (!class_exists('Timber')) {
    echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';

    return;
}

if (is_404()) {
    Controller::Instance()->fourOFour();
} elseif (is_page()) {
    Controller::Instance()->page();
} elseif (is_single()) {
    Controller::Instance()->single();
} elseif (is_front_page() && is_home() || is_archive()) {
    Controller::Instance()->archive();
} else {
    Controller::Instance()->archive();
}


