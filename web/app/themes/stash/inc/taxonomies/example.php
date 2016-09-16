<?php
$plural = 'Examples';
$single = 'Example';
$slug = 'example';

$type = array('page');

$labels = array(
    'name'              => _x($plural, 'taxonomy general name', 'stash'),
    'singular_name'     => _x($single, 'taxonomy singular name', 'stash'),
    'search_items'      => __('Search ' . $plural, 'stash'),
    'all_items'         => __('All Genres', 'stash'),
    'parent_item'       => __('Parent ' . $single, 'stash'),
    'parent_item_colon' => __('Parent :' . $single, 'stash'),
    'edit_item'         => __('Edit ' . $single, 'stash'),
    'update_item'       => __('Update ' . $single, 'stash'),
    'add_new_item'      => __('Add New ' . $single, 'stash'),
    'new_item_name'     => __('New ' . $single . ' Name', 'stash'),
    'menu_name'         => __($single, 'stash'),
);

$args = array(
    'hierarchical'      => true,
    'labels'            => $labels,
    'show_ui'           => true,
    'show_admin_column' => true,
    'query_var'         => true,
    'rewrite'           => array('slug' => $slug),
);

#register_taxonomy($slug, $type, $args);