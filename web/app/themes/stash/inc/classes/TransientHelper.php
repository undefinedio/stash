<?php
namespace Undefined\Stash;

class TransientHelper
{
    /**
     * Delete all transients
     */
    public function deleteAll()
    {
        $transients = $this->getAll();

        foreach ($transients as $result) {
            $site_wide = (strpos($result->option_name, '_site_transient') !== false);
            $name = str_replace($site_wide ? '_site_transient_timeout_' : '_transient_timeout_', '', $result->option_name);
            $name = str_replace("_transient_", "", $name);

            $this->delete_transient($name, $site_wide);
        }
    }

    /**
     * Delete a transient by name
     *
     * @return  bool
     */
    private function delete_transient($transient = '', $site_wide = false)
    {
        if (empty($transient)) {
            return false;
        }

        if (false !== $site_wide) {
            return delete_site_transient($transient);
        } else {

            return delete_transient($transient);
        }
    }

    /**
     * Get all transients from database
     *
     * @return array
     */
    private function getAll($args = array())
    {
        global $wpdb;

        $defaults = array(
            'offset' => 0,
            'number' => 30,
            'search' => ''
        );

        $args = wp_parse_args($args, $defaults);
        $cache_key = md5(serialize($args));
        $transients = wp_cache_get($cache_key);

        if (false === $transients) {

            $sql = "SELECT * FROM $wpdb->options WHERE option_name LIKE '%\_transient\_%' AND option_name NOT LIKE '%\_transient\_timeout%'";

            if (!empty($args['search'])) {

                $search = esc_sql($args['search']);
                $sql .= " AND option_name LIKE '%{$search}%'";
            }

            $offset = absint($args['offset']);
            $number = absint($args['number']);
            $sql .= " ORDER BY option_id DESC LIMIT $offset,$number;";

            $transients = $wpdb->get_results($sql);

            wp_cache_set($cache_key, $transients, '', 3600);
        }

        return $transients;
    }
}