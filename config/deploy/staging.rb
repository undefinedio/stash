set :stage, :staging

$user = 'user'
$url = 'stage.stash.io'

server 'server.stash.io', user: $user, roles: %w{web app db}

set :deploy_to, -> { "/home/#$user/subdomains/stash" }
set :tmp_dir, "/home/#$user/tmp"
set :branch, :'develop'
set :wpcli_backup_db, true

set :wpcli_remote_url, "stage.stash.io"
set :wpcli_local_url, "dev.stash.io"

fetch(:default_env).merge!(wp_env: :staging)