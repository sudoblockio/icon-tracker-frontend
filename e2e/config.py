import os
from pydantic import BaseSettings


class Config(BaseSettings):
    base_url: str = "https://tracker.icon.community"

    prep_address: str = "hxfba37e91ccc13ec1dab115811f73e429cde44d48"
    prep_address_url: str = f"{base_url}/address/{prep_address}"

    delegations_address: str = "hxb86afed8db896012664b0fa6c874fe0e3001edaf"
    delegations_address_url: str = f"{base_url}/address/{delegations_address}"

    contract_address: str = "cx88fd7df7ddff82f7cc735c871dc519838cb235bb"
    contract_contract_path: str = f"{base_url}/contract/{contract_address}"
    contract_address_path: str = f"{base_url}/address/{contract_address}"

    default_timeout: int = 5
    default_sleep: int = 3
    browser: str = "chrome"
    headless: bool = True

    _metadata: dict = {}

    class Config:
        case_sensitive = False
        env_prefix = 'e2e_'


if os.environ.get("ENV_FILE", False):
    settings = config = Config(_env_file=os.environ.get("ENV_FILE"))
else:
    settings = config = Config()
