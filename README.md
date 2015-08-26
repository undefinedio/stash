<img src="https://cdn.rawgit.com/undefinedio/stash/develop/web/app/themes/stash/src/images/STASH-logo.svg" width="250">

=======
# STASH

Badges         | -
-------------  | -------------
Scrutinizer    | [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/undefinedio/stash/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/undefinedio/stash/?branch=master)
Composer       | [![Dependency Status](https://www.versioneye.com/user/projects/55dd7d7f8d9c4b00180009eb/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55dd7d7f8d9c4b00180009eb)
NPM            | [![Dependency Status](https://www.versioneye.com/user/projects/55dd7d628d9c4b001b0009dc/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55dd7d628d9c4b001b0009dc)
Bower          | [![Dependency Status](https://www.versioneye.com/user/projects/55dd7d5a8d9c4b001b0009d9/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55dd7d5a8d9c4b001b0009d9)
Ruby           | [![Dependency Status](https://www.versioneye.com/user/projects/55dd7d5e8d9c4b00180009e4/badge.svg?style=flat)](https://www.versioneye.com/user/projects/55dd7d5e8d9c4b00180009e4)

## Requirements
* PHP >= 5.4
* Composer [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx)
* Ruby >= 1.9 [Install](https://www.ruby-lang.org/en/documentation/installation/)
* Bundler `gem install bundler`
* node & NPM [Install](https://nodejs.org/download/)
* Gulp global `npm install gulp -g`

## Manual Installation
1. Clone the git repo - `git clone https://github.com/undefinedio/stash.git`
2. Run `composer install`
3. Copy `.env.example` to `.env` and update environment variables
4. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)
5. run `npm install`
5. run `gulp`

## Automated installation
1. Clone the git repo - `git clone https://github.com/undefinedio/stash.git`
2. Run `composer install`
2. Run `node ./bin/setup.js`
