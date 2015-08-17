<?php

if (!class_exists('Timber')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
    });

    return;
}

/* Include global functions */
include_once 'inc/functions/dd.php';

/* Include classes */
include_once 'inc/classes/ImageHelper.php';

class Stash extends TimberSite
{
    function __construct()
    {
        add_theme_support('post-formats');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');

        add_filter('timber_context', [$this, 'addToContext']);
        add_filter('get_twig', [$this, 'addToTwig']);
        add_filter('body_class', [$this, 'addPageClass']);

        add_action('init', [$this, 'registerPostTypes']);
        add_action('init', [$this, 'registerTaxonomies']);

        add_action('wp_enqueue_scripts', [$this, 'themeAssets']);

        parent::__construct();
    }

    /**
     * Load all files from the inc/post-types/ folder
     */
    function registerPostTypes()
    {
        foreach (glob(__DIR__ . "/inc/post-types/*.php") as $filename) {
            include_once $filename;
        }
    }

    function registerTaxonomies()
    {
        //this is where you can register custom taxonomies
    }

    /**
     * Add things to the context for every twig template
     * @param $context
     * @return mixed
     */
    function addToContext($context)
    {
        $context['menu'] = new TimberMenu();
        $context['site'] = $this;

        $context['is_home'] = is_front_page() ? "true" : "false";
        $context['home_url'] = get_home_url();

        if(function_exists("pll_current_language")) {
            $context['current_lang'] = pll_current_language();
        }

        return $context;
    }

    /**
     * This is where you can add your own fuctions to twig
     * @param $twig
     * @return mixed
     */
    function addToTwig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addGlobal('image', new ImageHelper());

        return $twig;
    }

    /**
     * Enqueue assets if files exist
     */
    function themeAssets()
    {
        if (file_exists(get_template_directory() . '/dist/js/vendor.js')) {
            wp_enqueue_script('stashVendor', get_template_directory_uri() . '/dist/js/vendor.js', ['jquery'], '1.0.0', true);
        }

        if (file_exists(get_template_directory() . '/dist/js/main.js')) {
            wp_enqueue_script('stashMain', get_template_directory_uri() . '/dist/js/main.js', ['jquery', 'stashVendor'], '1.0.0', true);
        }

        if (file_exists(get_template_directory() . '/dist/css/vendor.css')) {
            wp_enqueue_style('stashVendor', get_template_directory_uri() . '/dist/css/vendor.css', [], '1.0.0', 'all');
        }
    }

    /**
     * Add the object slug name as class to the body classes
     *
     * @param $classes
     * @return array
     */
    function addPageClass($classes)
    {
        if (!is_archive() && !is_home()) {
            global $post;
            $classes[] = get_post($post)->post_name;
        }

        return $classes;
    }
}

new Stash();
