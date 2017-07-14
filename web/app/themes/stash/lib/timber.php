<?php
use Undefined\Stash\ImageHelper;

/**
 * Check if Timber is activated
 */

if (!class_exists('Timber')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
    });

    return;
}

/**
 * Timber
 */
class TwigStashTheme extends TimberSite
{
    function __construct()
    {
        add_filter('timber_context', array($this, 'add_to_context'));
        add_filter('get_twig', [$this, 'addToTwig']);

        parent::__construct();
    }

    public function add_to_context($context)
    {
        /* Menu */
        $context['menu'] = new TimberMenu('primary_navigation');

        /* Site info */
        $context['site'] = $this;

        /* Boolean if is homepage */
        $context['is_home'] = is_front_page() ? "true" : "false";

        /* homepage url */
        $context['home_url'] = get_home_url();

        /* if multilang is enabled return current language */
        if (function_exists("pll_current_language")) {
            $context['current_lang'] = pll_current_language();
        }

        return $context;
    }

    /**
     * This is where you can add your own functions to twig
     * @param $twig
     * @return mixed
     */
    public function addToTwig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addGlobal('image', new ImageHelper());
        
         $filter = new Twig_SimpleFilter("translate", function ($string) {
            pll_register_string($string, $string, "stash");

            return pll__($string);
        });

        $twig->addFilter($filter);

        return $twig;
    }
}

new TwigStashTheme();
