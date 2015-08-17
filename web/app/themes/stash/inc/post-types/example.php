<?php

$plural = 'Examples';
$single = 'Example';
$slug = 'example';

$type = 'post'; // post | page

$menuIcon = 'dashicons-format-aside'; // https://developer.wordpress.org/resource/dashicons/
$menuPosition = 5;

$support = ['title', 'editor', 'thumbnail'];
$taxonomies = ['category', 'post_tag'];

$args = [
    'label'               => __($single, 'stash'),
    'description'         => __($single, 'stash'),
    'labels'              => [
        'name'               => _x($plural, 'Post Type General Name', 'stash'),
        'singular_name'      => _x($single, 'Post Type Singular Name', 'stash'),
        'menu_name'          => __($plural, 'stash'),
        'parent_item_colon'  => __('Parent ' . $single . ':', 'stash'),
        'all_items'          => __('All ' . $plural, 'stash'),
        'view_item'          => __('View ' . $single, 'stash'),
        'add_new_item'       => __('Add New ' . $single, 'stash'),
        'add_new'            => __('Add New', 'stash'),
        'edit_item'          => __('Edit ' . $single, 'stash'),
        'update_item'        => __('Update ' . $single, 'stash'),
        'search_items'       => __('Search ' . $single, 'stash'),
        'not_found'          => __('Not found', 'stash'),
        'not_found_in_trash' => __('Not found in Trash', 'stash'),
    ],
    'supports'            => $support,
    'taxonomies'          => $taxonomies,
    'hierarchical'        => false,
    'public'              => true,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'show_in_nav_menus'   => true,
    'show_in_admin_bar'   => true,
    'menu_position'       => $menuPosition,
    'menu_icon'           => $menuIcon,
    'can_export'          => true,
    'has_archive'         => true,
    'exclude_from_search' => false,
    'publicly_queryable'  => true,
    'capability_type'     => $type
];

#register_post_type($slug, $args);