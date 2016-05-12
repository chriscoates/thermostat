require "sinatra"

get "/" do
  headers 'Access-Control-Allow-Origin' => '*'
  "Hello world!"
end