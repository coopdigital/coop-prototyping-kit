if ENV['USERNAME'] && ENV['PASSWORD']
  use Rack::Auth::Basic, "Restricted Area" do |username, password|
    [username, password] == [ENV['USERNAME'], ENV['PASSWORD']]
  end
end

use Rack::Static,
  :urls => [""],
  :root => 'build',
  :index => 'index.html'

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=0'
    },
    File.open('build/index.html', File::RDONLY)
  ]
}
