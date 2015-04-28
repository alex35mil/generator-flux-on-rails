class UserSerializer < ActiveModel::Serializer

  attributes :id, :email, :authentication_token

end
