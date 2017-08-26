<img src="https://cdn.rawgit.com/undefinedio/stash/develop/web/app/themes/stash/src/images/STASH-logo.svg" width="250">

=======
# STASH

[![Greenkeeper badge](https://badges.greenkeeper.io/undefinedio/stash.svg)](https://greenkeeper.io/)

Badges         | -
-------------  | -------------
Scrutinizer    | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/undefinedio/stash/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/undefinedio/stash/?branch=master)
Dependencies   | [![Dependency Status](https://www.versioneye.com/user/projects/57dbb14a500a3100425c95ce/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57dbb14a500a3100425c95ce)

## Requirements
* PHP >= 5.5
* Composer [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
* Ruby >= 1.9 [Install](https://www.ruby-lang.org/en/documentation/installation/)
* Bundler `gem install bundler`
* node & yarn [Install](https://nodejs.org/download/)
* Gulp global `npm install gulp -g`

## Manual Installation
1. Clone the git repo - `git clone https://github.com/undefinedio/stash.git`
2. Run `composer install`
3. Copy `.env.example` to `.env` and update environment variables
4. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)
5. run `yarn install`
5. run `gulp`

## Controllers

Automatic linking of pages with controller. It is aware of multi language page ids, so just use the default language id.
It also adds an new class to the body: 'page-' + controller name
Controllers work as the following:

1. create a page in the backend
2. note the page id (main language page id)
3. add the page id and a name for the controller in ```web/app/themes/stash/lib/setup.php```
4. create a file inside the controller map with controller name + '.php'
5. Relax, take a break. Enjoy life