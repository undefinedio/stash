<?php

namespace Undefined\Stash;

use Timber\Timber;
use Timber\Post as TimberPost;

final class Controller
{
    private $parentPages;
    private $found;
    private $pages;

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
     * Set all pages from within the functions.php->setControllers()
     *
     * @param $pages
     */
    public function setParentPages($pages)
    {
        $this->parentPages = $pages;
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

    /**
     * Find the correct controller for the single post object
     *
     * If none controller is found, fallback on teh default post
     */
    public function single()
    {
        $this->setContext();

        $context = $this->context;

        $file = get_template_directory() . '/controllers/single/' . strtolower($this->context['post']->post_type) . '.php';

        if (file_exists($file)) {
            /**
             * Set context for included file
             */
            include($file);
        } else {
            Timber::render(array('single-' . $context['post']->ID . '.twig', 'single-' . $context['post']->post_type . '.twig', 'single.twig'), $context, Cache::getTimerTime());
        }
    }

    public function search()
    {
        $this->setContext();

        $context = $this->context;

        Timber::render(array('search.twig', 'archive.twig'), $context, Cache::getTimerTime());
    }

    public function fourOFour()
    {
        include(get_template_directory() . '/controllers/404.php');
    }

    public function archive()
    {
        $this->setContext();

        $context = $this->context;

        if (is_category()) {
            $file = get_template_directory() . '/controllers/archive/category.php';
        } else if (is_tax()) {
            $file = get_template_directory() . '/controllers/archive/tax.php';
        } else {
            $file = get_template_directory() . '/controllers/archive/' . strtolower($this->context['post']->title) . '.php';
        }

        if (file_exists($file)) {
            /**
             * Set context for included file
             */
            include($file);
        } else {
            Timber::render(array('single-' . $context['post']->ID . '.twig', 'single-' . $context['post']->post_type . '.twig', 'single.twig'), $context, Cache::getTimerTime());
        }
    }

    public function page()
    {
        $pageId = get_the_ID();
        $parentId = wp_get_post_parent_id($pageId);

        /**
         * Loop though set pages in functions.php->setControllers()
         */
        foreach ($this->parentPages as $key => $page) {
            if ($parentId == $this->returnId($key)) {
                /**
                 * See if controller excists else fall back to default
                 */
                $file = get_template_directory() . '/controllers/pages/' . $page . '.php';
                $this->found = $page;
            }
        }

        /**
         * Loop though set pages in functions.php->setControllers()
         */
        foreach ($this->pages as $key => $page) {
            if ($pageId == $this->returnId($key)) {
                /**
                 * See if controller excists else fall back to default
                 */
                $file = get_template_directory() . '/controllers/pages/' . $page . '.php';
                $this->found = $page;
            }
        }

        if ($file && file_exists($file)) {


            $this->setContext();
            /**
             * Set context for included file
             */
            $context = $this->context;

            include($file);
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
        Timber::render(['page-' . strtolower($this->context['post']->post_name) . '.twig', 'page.twig'], $this->context, Cache::getTimerTime());
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