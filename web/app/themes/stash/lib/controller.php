<?php
namespace Undefined\Stash;

use Timber\Timber;
use Timber\Post as TimberPost;

final class Controller
{
    /**
     * Controller constructor.
     *
     * Set context and fetch post id
     */
    function __construct()
    {
        $this->found = false;
    }

    /**
     * make singleton
     *
     * @return null|Controller
     */
    public static function Instance()
    {
        static $inst = null;
        if ($inst === null) {
            $inst = new Controller();
        }

        return $inst;
    }

    /**
     * Set all pages from within the functions.php->setControllers()
     *
     * @param $pages
     */
    public function setPages($pages)
    {
        $this->pages = $pages;
    }

    /**
     * Set context for the page
     */
    private function setContext()
    {
        $this->postId = get_the_ID();
        $this->context = Timber::get_context();
        $this->context['post'] = new TimberPost();
    }

    private function returnId($key)
    {
        if (function_exists('pll_get_post')) {
            return pll_get_post($key);
        } else {
            return $key;
        }
    }

    public function page()
    {
        /**
         * Loop though set pages in functions.php->setControllers()
         */
        foreach ($this->pages as $key => $page) {

            if (get_the_ID() == $this->returnId($key)) {
                /**
                 * See if controller excists else fall back to default
                 */
                $file = get_template_directory() . '/controllers/' . $page . '.php';
                if (file_exists($file)) {
                    $this->found = $page;

                    $this->setContext();
                    /**
                     * Set context for included file
                     */
                    $context = $this->context;

                    include($file);
                }
            }
        }

        if (!$this->found) {
            $this->found = 'default';
            $this->returnDefault();
        }
    }

    /**
     * Fallback when no controller found or controller file isn't present
     */
    private function returnDefault()
    {
        $this->setContext();
        $context = $this->context;
        Timber::render(['page-' . $this->context['post']->post_name . '.twig', 'page.twig'], $this->context, Cache::getTimerTime());
    }

    /**
     * Return name of the body class
     *
     * @return bool|string
     */
    public function getClass()
    {
        if ($this->found) {
            return 'page-' . $this->found;
        } else {
            return false;
        }
    }
}