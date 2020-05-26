require 'dotenv'
Dotenv.load

set :stage, :production

$user = ENV['STAGING_USER']
server ENV['STAGING_SERVER'], user: $user, roles: %w{web app db}
$path= ENV['STAGING_PATH']
set :log_level, :debug

set :deploy_to, -> { "/var/www/vhosts/#$path/app" }
set :tmp_dir, "/var/www/vhosts/#$path/tmp"

set :branch, :'develop'
set :wpcli_backup_db, true

set :wpcli_remote_url,  ENV['ENV_STAGING'].gsub("http://", "").gsub("https://", "")
set :wpcli_local_url, ENV['ENV_DEVELOPMENT'].gsub("http://", "").gsub("https://", "")

fetch(:default_env).merge!(wp_env: :staging)
