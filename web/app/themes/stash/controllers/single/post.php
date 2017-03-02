<?php
use Undefined\Stash\Cache;

Timber::render(array('single-' . $context['post']->ID . '.twig', 'single-' . $context['post']->post_type . '.twig', 'single.twig'), $context, Cache::getTimerTime());
