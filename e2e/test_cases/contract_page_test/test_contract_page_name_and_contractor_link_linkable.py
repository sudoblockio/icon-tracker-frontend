import time
import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage
from e2e.utilities.logger import LogGen
from e2e.config import config

class TestVerifyContractPageNameAndContractorLinkLinkable:
    logger = LogGen.loggen()

    contract_address = "cx44250a12074799e26fdeee75648ae47e2cc84219"

    @pytest.mark.contract_page
    def test_contract_page_name_and_contractor_link_linkable(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case Test_010_Verify_contract_page_name_and_contractor_link_linkable"
                         "...*******")
        self.driver.get(config.contract_contract_path)
        time.sleep(config.default_sleep)
        self.contractPageObj.click_name_link()
        self.contractPageObj.verify_user_name_page()
        self.driver.get(config.contract_contract_path)
        time.sleep(config.default_sleep)
        self.contractPageObj.click_creator_link()
        time.sleep(config.default_sleep)
        self.contractPageObj.verify_contract_page(value=self.contract_address)

        self.logger.info("********Finished test case Test_010_Verify_contract_page_name_and_contractor_link_linkable"
                         "...*******")
