RSpec.shared_examples_for 'unauthorized get request' do

  context 'when no credentials given' do
    before { get! url, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { get! url, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end

RSpec.shared_examples_for 'unauthorized post request' do

  context 'when no credentials given' do
    before { post! url, {sample: :data}, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { post! url, {sample: :data}, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end

RSpec.shared_examples_for 'unauthorized patch request' do

  context 'when no credentials given' do
    before { patch! url, {sample: :data}, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { patch! url, {sample: :data}, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end

RSpec.shared_examples_for 'unauthorized delete request' do

  context 'when no credentials given' do
    before { delete! url, headers }
    it { expect(response).to have_http_status(401) }
  end

  context 'when bad credentials given' do
    before { delete! url, bad_auth_headers(user) }
    it { expect(response).to have_http_status(401) }
  end

end
