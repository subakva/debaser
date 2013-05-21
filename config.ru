require 'rubygems'
require 'bundler'
Bundler.require

map '/assets' do
  environment = Sprockets::Environment.new
  environment.append_path 'assets/javascripts'
  environment.append_path 'assets/stylesheets'
  environment.append_path 'assets/images'
  environment.append_path 'vendor/components'
  run environment
end

require './debaser'
map '/' do
  run Sinatra::Application
end

