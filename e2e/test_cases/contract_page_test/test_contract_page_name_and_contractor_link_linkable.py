import time

import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyContractPageNameAndContractorLinkLinkable:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    contractorValue = "cx44250a12074799e26fdeee75648ae47e2cc84219"

    @pytest.mark.contract_page
    def test_contract_page_name_and_contractor_link_linkable(self, setup):
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
