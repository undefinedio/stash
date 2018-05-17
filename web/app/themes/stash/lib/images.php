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
        $stream_opts = [
           "ssl" => [
               "verify_peer"      => false,
               "verify_peer_name" => false,
           ]
       ];
        
        $imageUrl = $this->get($name);

        //check if is an svg, if so embed svg code else display image element
        if (strpos($imageUrl, '.svg') !== false) {
            return file_get_contents($imageUrl, false, stream_context_create($stream_opts));
        } else {
            return "<img src='" . $this->get($name) . "' />";
        }
    }
}
