  Dir['./spec/support/**/*.rb'].each { |f| require f }

  config.include Requests::JsonHelpers, type: :request
  config.include Requests::RequestHelpers, type: :request
  config.include Requests::URIHelpers

  config.before(:suite) do
    DatabaseCleaner.clean_with :truncation
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end