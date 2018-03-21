require 'dotenv'
Dotenv.load

set :default_environment, {
  'LANG' => 'en_US.UTF-8'
}

# Force terminal to use php7
SSHKit.config.command_map[:bash] = "/usr/bin/bash"
SSHKit.config.command_map[:composer] = "/usr/local/php71/bin/php71 /usr/local/bin/composer"
SSHKit.config.command_map[:php] = "/usr/local/php71/bin/php71"

set :application, 'stash'
set :repo_url, ENV['REPO']
set :theme_name, 'stash'

#Prompts for the branch name (defaults to current branch)
ask :branch, -> { `git rev-parse --abbrev-ref HEAD`.chomp }

# Use :debug for more verbose output when troubleshooting
set :log_level, :info

# Linked files & Dirs
set :linked_files, fetch(:linked_files, []).push('.env')
set :linked_dirs, fetch(:linked_dirs, []).push('web/app/uploads')

#################
# assets upload #
#################

namespace :deploy do
 
  # Theme path
  set :theme_path, Pathname.new('web/app/themes').join(fetch(:theme_name))
 
  # Local Paths
  set :local_theme_path, Pathname.new(File.dirname(__FILE__)).join('../').join(fetch(:theme_path))
  set :local_dist_path, fetch(:local_theme_path).join('dist')
 
  task :build do
    run_locally do
      within fetch(:local_theme_path) do
         execute "export LC_ALL=\"en_US.UTF-8\""
         execute "./node_modules/.bin/gulp build --production"
      end
    end
  end
 
  task :copy do
    on roles(:web) do
      # Remote Paths (Lazy-load until actual deploy)
      set :remote_dist_path, -> { release_path.join(fetch(:theme_path)) }
 
      info " Your local distribution path: #{fetch(:local_dist_path)} "
      info " Your remote distribution path: #{fetch(:remote_dist_path)} "
      info " Uploading files to remote "
      upload! fetch(:local_dist_path).to_s, fetch(:remote_dist_path).to_s, recursive: true
    end
  end
 
  task assets: %w(build copy)
end

after 'deploy:updated', 'deploy:assets'
