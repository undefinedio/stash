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

    function display($name)
    {
        return "<img src='" . $this->get($name) . "' />";
    }
}