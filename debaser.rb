get '/' do
  @connections = connection_names
  erb :index
end

post '/query' do ||
  connection = get_connection(params[:connection])
  @result = connection.select_all(params[:q])
  erb :result
end

def connection_configurations
  @db_configurations ||= YAML.load(ERB.new(File.read('database.yml')).result)
end

def connection_names
  connection_configurations.keys
end

def get_connection(name)
  @pools ||= {}
  if @pools[name].nil?
    config = connection_configurations[name]
    @pools[name] = ActiveRecord::Base.establish_connection(config)
  end
  @pools[name].connection
end
