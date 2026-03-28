module Api
  class AuthController < ActionController::API

    # POST /api/register
    def register
      user = User.new(user_params)

      if user.save
        render json: {
          user: { id: user.id, email: user.email }
        }, status: :created
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # POST /api/login
    def login
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        render json: {
          user: { id: user.id, email: user.email },
          token: "fake-token-#{user.id}"
        }
      else
        render json: { error: "Invalid email or password" }, status: :unauthorized
      end
    end

    private

    def user_params
      params.permit(:email, :password, :password_confirmation)
    end

  end
end