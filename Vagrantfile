# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

#:rsync_excludes => ['chef/tmp', 'tmp']
excludes_array = ['.git','_site']
begin
  excludes_array = IO.readlines("./synced_folder/.vagrantignore")
  excludes_array.collect { |x| x.strip! }
rescue
  puts '.vagrantignore does not exist. moving on..'
end
puts "the following files will be ignored by rsync #{excludes_array}"
puts "see https://docs.vagrantup.com/v2/synced-folders/rsync.html for recommended list of ignore items"


Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest: 8080, host: 8080

  config.vm.provider "virtualbox" do |v|
    v.name = 'qa-project'
    v.cpus = 2
  end

  config.vm.provision "shell" do |s|
    s.path = 'provision.sh'
    s.privileged= false
  end
  config.vm.synced_folder "./synced_folder", "/vagrant/", type: "rsync",
      rsync__exclude: excludes_array
end