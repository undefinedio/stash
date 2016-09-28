set :stage, :production

$user = 'stash'
$url = 'stash.io'

server 'server.stash.io', user: $user, roles: %w{web app db}

set :deploy_to, -> { "/home/#$user/app" }
set :tmp_dir, "/home/#$user/tmp"
set :branch, :'master'
set :wpcli_backup_db, true

set :wpcli_remote_url, "#$url"
set :wpcli_local_url, "dev.#$url"

fetch(:default_env).merge!(wp_env: :production)