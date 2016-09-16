<?php

namespace Undefined\Stash\Assets;

/**
 * Get paths for assets
 */
class Assets
{
    /**
     * Enqueue assets if files exist
     */
    public function load()
    {
        $vendorJsExists = file_exists(get_template_directory() . '/dist/js/vendor.js');
        $mainJsExists = file_exists(get_template_directory() . '/dist/js/main.js');
        $mainJsDependencies = [];

        $mainCssExists = file_exists(get_template_directory() . '/dist/css/main.css');
        $vendorCssExists = file_exists(get_template_directory() . '/dist/css/vendor.css');
        $mainCssDependencies = [];

        if ($vendorJsExists) {
            wp_enqueue_script('stashVendorJs', get_template_directory_uri() . '/dist/js/vendor.js', [], filemtime(get_stylesheet_directory() . '/dist/js/vendor.js'), true);
            array_push($mainJsDependencies, 'stashVendorJs');
        }

        if ($mainJsExists) {
            wp_enqueue_script('stashMainJs', get_template_directory_uri() . '/dist/js/main.js', $mainJsDependencies, filemtime(get_stylesheet_directory() . '/dist/js/main.js'), true);
        }

        if ($vendorCssExists) {
            wp_enqueue_style('stashVendorCss', get_template_directory_uri() . '/dist/css/vendor.css', [], filemtime(get_stylesheet_directory() . '/dist/css/vendor.css'));
            array_push($mainCssDependencies, 'stashVendorCss');
        }

        if ($mainCssExists) {
            wp_enqueue_style('stashMainCss', get_template_directory_uri() . '/dist/css/main.css', $mainCssDependencies, filemtime(get_stylesheet_directory() . '/dist/css/main.css'));
        }
    }
}

add_action('wp_enqueue_scripts', function () {
    $assets = new Assets();
    $assets->load();
}, 100);