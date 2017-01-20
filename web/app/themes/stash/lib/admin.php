<?php

namespace Undefined\Stash\Admin;

/**
 * Clean up adminpages
 */

function login_redirect($redirect_to, $request, $user)
{
    return admin_url('edit.php?post_type=page');
}

add_filter('login_redirect', __NAMESPACE__ . '\\login_redirect', 10, 3);

function remove_menu()
{
    remove_menu_page('index.php'); //dashboard
    remove_menu_page('edit-comments.php'); //comments
}

add_action('admin_menu', __NAMESPACE__ . '\\remove_menu', 99);

function remove_wp_logo($wp_admin_bar)
{
    $wp_admin_bar->remove_node('wp-logo');
}

add_action('admin_bar_menu', __NAMESPACE__ . '\\remove_wp_logo', 999);

function change_footer_admin()
{
    return '&nbsp;';
}

add_filter('admin_footer_text', __NAMESPACE__ . '\\change_footer_admin', 9999);

function change_footer_version()
{
    return ' ';
}

add_filter('update_footer', __NAMESPACE__ . '\\change_footer_version', 9999);

/*
 * Change the opacity of WordPress Admin Bar
 */
function adminbar_opacity()
{
    $adminbar_opacity = '<style type="text/css">#wpadminbar { filter:alpha(opacity=50); opacity:0.5; }</style>';
    echo $adminbar_opacity;
}

if (!is_admin()) {
    add_action('wp_head', __NAMESPACE__ . '\\adminbar_opacity');
}

/*
 * Redirect Dashboard to pages
 */
function redirect_from_dashboard()
{
    wp_redirect(admin_url('edit.php?post_type=page'));
    exit;
}

add_action('wp_dashboard_setup', __NAMESPACE__ . '\\redirect_from_dashboard');

function admin_menu()
{
    global $menu;
    $url = '/';
    $menu[0] = array(__('STASH'), 'read', '#', 'undefined-logo', 'undefined-logo');
}

add_action('admin_menu', __NAMESPACE__ . '\\admin_menu');

function admin_style()
{
    echo '<link rel="stylesheet" href="' . get_template_directory_uri() . '/dist/css/admin/main.css" type="text/css" media="all" />';
}

add_action('admin_head', __NAMESPACE__ . '\\admin_style');
