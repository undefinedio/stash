<img src="https://cdn.rawgit.com/undefinedio/stash/develop/web/app/themes/stash/src/images/STASH-logo.svg" width="250">

=======
# STASH

## Requirements
* PHP >= 7.1
* Composer [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
* Ruby >= 1.9 [Install](https://www.ruby-lang.org/en/documentation/installation/)
* Bundler `gem install bundler`
* node & yarn [Install](https://nodejs.org/download/)
* Gulp global `npm install gulp -g`

## Initial setup
1. Clone the git repo - `git clone https://github.com/undefinedio/stash.git` 
2. Remove git repo - `rm -rf .git` 
3. Run `composer install`
4. Copy `.env.example` to `.env` and update environment variables
5. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)
6. run `yarn install`
7. run `gulp`

## Controllers

Automatic linking of pages with controller. It is aware of multi language page ids, so just use the default language id.
It also adds an new class to the body: 'page-' + controller name

Controllers work as the following:

1. create a page in the backend
2. note the page id (main language page id)
3. add the page id and a name for the controller in ```web/app/themes/stash/lib/setup.php```
4. create a file inside the controller map with controller name + '.php'
5. Relax, take a break. Enjoy life

It is also possible to use one single controller for all children of the same parent. Set the parent Id and the name of controller in the function `setParentPages`

## Twig filters

Custom twig filters that you can use in the twig templates

#### Wpautop

Automatically add p tags around wordpress content. ([wpautop function](https://codex.wordpress.org/Function_Reference/wpautop))

Usage:  `{{ post.content | p }}`