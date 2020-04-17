require 'dotenv'
Dotenv.load

set :stage, :production

$user = ENV['PRODUCTION_USER']
$path = ENV['PRODUCTION_PATH']
server ENV['PRODUCTION_SERVER'], user: $user, roles: %w{web app db}
set :log_level, :debug

set :deploy_to, -> { "#$path/app" }

set :tmp_dir, "/#$path/tmp"
set :branch, :'master'
set :wpcli_backup_db, true

set :wpcli_remote_url,  ENV['ENV_PRODUCTION'].gsub("http://", "").gsub("https://", "")
set :wpcli_local_url, ENV['ENV_DEVELOPMENT'].gsub("http://", "").gsub("https://", "")

fetch(:default_env).merge!(wp_env: :production)
