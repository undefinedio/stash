<?php

$context['title'] = 'Category: ' . single_cat_title('', false);

$context['posts'] = Timber::get_posts();

Timber::render(['archive.twig', 'index.twig'], $context);