RSpec.shared_examples_for 'unauthorized GET request' do

  context 'when no credentials given' do
    before { get! url, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { get! url, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end

RSpec.shared_examples_for 'unauthorized POST request' do

  context 'when no credentials given' do
    before { post! url, {sample: :data}, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { post! url, {sample: :data}, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end

RSpec.shared_examples_for 'unauthorized PATCH request' do

  context 'when no credentials given' do
    before { patch! url, {sample: :data}, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { patch! url, {sample: :data}, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end

RSpec.shared_examples_for 'unauthorized DELETE request' do

  context 'when no credentials given' do
    before { delete! url, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { delete! url, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end
