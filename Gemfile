source "https://rubygems.org"

gem 'rake'
gem 'sinatra'
gem 'sprockets'
gem 'activerecord', require: 'active_record'

gem 'pg'
gem 'mysql2'

# JDW: We're using our fork to fix a catastrophic incompatibility with Azure SQL 2013
gem 'activerecord-sqlserver-adapter',
  github: 'carbonfive/activerecord-sqlserver-adapter',
  branch: 'bugs/product_version_check-247'
gem 'tiny_tds'

group :development, :test do
  gem 'thin'
  gem 'jasmine'
end

