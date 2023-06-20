import time

import pytest

from e2e.page_objects.ContractPage import ContractPage
from e2e.page_objects.MainPage import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyContractPageNameAndContractorLinkLinkable:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    contractorValue = "hxf8f2d8f12abbbd4e70ae6e89d31b4f8301b56caf"

    @pytest.mark.contract_page
    def test_010_Verify_contract_page_name_and_contractor_link_linkable(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case Test_010_Verify_contract_page_name_and_contractor_link_linkable"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())
        time.sleep(3)
        self.contractPageObj.click_name_link()
        self.contractPageObj.verify_user_name_page()
        self.driver.get(ReadConfig.getContractMainUrl())
        time.sleep(3)
        self.contractPageObj.click_creator_link()
        time.sleep(3)
        self.contractPageObj.verify_contractor_page(value=self.contractorValue)

        self.logger.info("********Finished test case Test_010_Verify_contract_page_name_and_contractor_link_linkable"
                         "...*******")
