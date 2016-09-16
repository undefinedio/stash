<?php

namespace Undefined\Stash\Custom;

/**
 * Get paths for assets
 */
class Custom
{
    /**
     * Load all files from the inc/post-types/ folder
     */
    public function registerPostTypes()
    {
        foreach (glob(get_template_directory() . "/inc/post-types/*.php") as $filename) {
            include_once $filename;
        }
    }

    /**
     * Load all files from the inc/post-types/ folder
     */
    public function registerTaxonomies()
    {
        foreach (glob(get_template_directory() . "/inc/taxonomies/*.php") as $filename) {
            include_once $filename;
        }
    }
}

add_action('init', function () {
    $custom = new Custom();
    $custom->registerPostTypes();
    $custom->registerTaxonomies();
}, 100);