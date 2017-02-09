<?php
use Undefined\Stash\Cache;

/**
 * Sample controller
 *
 * The sample page is automaticlly linked to this file.
 * The id is set inside the /lib/setup.php->setControllers()
 */

Timber::render(array('page.twig'), $context, Cache::getTimerTime());