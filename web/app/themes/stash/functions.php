<?php
/**
 * Stash includes
 *
 * The $stash_includes array determines the code library included in your theme.
 * Add or remove files to the array as needed. Supports child theme overrides.
 */
$stash_includes = [
    'lib/timber.php',     // Twig magic
    'lib/assets.php',     // Scripts and stylesheets
    'lib/extras.php',     // Custom functions
    'lib/setup.php',      // Theme setup
    'lib/images.php',     // Helper for retrieving Images
    'lib/custom.php',     // Load custom post types and taxonomies
    'lib/acf.php',        // Functions related to ACF
    'lib/transients.php', // Clear all transients on database changes
];

foreach ($stash_includes as $file) {
    if (!$filepath = locate_template($file)) {
        trigger_error(sprintf(__('Error locating %s for inclusion', 'stash'), $file), E_USER_ERROR);
    }

    require_once $filepath;
}
unset($file, $filepath);
