import os
from pydantic import BaseSettings


class Config(BaseSettings):
    base_url: str = "https://tracker.icon.community"

    address_url: str = f"{base_url}/address/hxb86afed8db896012664b0fa6c874fe0e3001edaf"
    contract_main_url: str = f"{base_url}/contract/cx88fd7df7ddff82f7cc735c871dc519838cb235bb"

    class Config:
        case_sensitive = False


if os.environ.get("ENV_FILE", False):
    settings = config = Config(_env_file=os.environ.get("ENV_FILE"))
else:
    settings = config = Config()
