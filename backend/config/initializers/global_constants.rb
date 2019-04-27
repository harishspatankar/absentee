JWT_SECRET = YAML.load_file("#{Rails.root}/config/jwt_secret.yml")
TEXTLOCAL = Rails.application.config_for(:textlocal)
