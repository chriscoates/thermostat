require 'sinatra/base'

class Thermostat < Sinatra::Base
  enable :sessions

  set :public_folder, proc{ File.join(root)}

  get "/" do
    File.read('thermostat.html')
  end

  post '/temperature' do
    session[:temperature] = params[:temp]
    session[:city] = params[:city]
  end

  get '/temperature' do
    headers 'Access-Control-Allow-Origin' => '*'
    session[:temperature] || 20
  end

  run! if app_file == $0
end
