import os

from dotenv import load_dotenv

load_dotenv()


class Settings:
    app_name = "Gridiron Analytics AI API"
    supabase_url = os.getenv("SUPABASE_URL", "")
    supabase_service_key = os.getenv("SUPABASE_SERVICE_KEY", "")


settings = Settings()
