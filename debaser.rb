get '/' do
  @connections = connection_names
  erb :index
end

post '/query' do
  begin
    connection = get_connection(params[:connection])
    # @result = connection.select_all(params[:q])
    rows = connection.select_all(params[:q])
    @result = {
      success: true,
      columnNames: rows[0].keys,
      rows: rows.map { |row| row.map { |(k,v)| v } },
    }
    status 200
    erb :result
  rescue ActiveRecord::StatementInvalid => e
    # TODO: log the full backtrace
    status 400
    @result = {
      success: false,
      message: e.message,
    }
    erb :result
  end
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
