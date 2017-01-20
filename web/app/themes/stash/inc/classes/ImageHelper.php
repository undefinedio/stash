<?php
namespace Undefined\Stash;

class ImageHelper
{
    /**
     * Returns a absolute url from the image directory
     *
     * @param $name
     * @return string
     */
    function get($name)
    {
        return get_template_directory_uri() . '/dist/images/' . $name;
    }

    /**
     * Returns a relative url from the image directory
     *
     * @param $name
     * @return string
     */
    function fetch($name)
    {
        return get_stylesheet_directory() . '/dist/images/' . $name;
    }

    function display($name)
    {
        return "<img src='" . $this->get($name) . "' />";
    }

    /**
     * Returns svg code for SVG injection in the DOM from the uploads directory
     *
     * @param $imageObject TimberImage Instance
     * @return string
     */
    function embedTimberSVG($imageObject)
    {
        $svgfile = get_attached_file($imageObject->ID, true);

        if (file_exists($svgfile)) {
            $returnFile = file_get_contents($svgfile);
        } else {
            $returnFile = 'IMAGE DOES NOT EXIST';
        }

        return $returnFile;
    }
}