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
     *
     *
     * @param $name
     * @return string
     */
    function display($name)
    {
        $imageUrl = $this->get($name);

        //check if is an svg, if so embed svg code else display image element
        if (strpos($imageUrl, '.svg') !== false) {
            return file_get_contents($imageUrl);
        } else {
            return "<img src='" . $this->get($name) . "' />";
        }
    }
}