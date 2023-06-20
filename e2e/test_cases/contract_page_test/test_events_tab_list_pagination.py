import time

import pytest

from e2e.page_objects.ContractPage import ContractPage
from e2e.page_objects.MainPage import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyEventsTabListPagination:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_events_tab_list_pagination(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "test_020_Verify_events_tab_list_pagination"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_events_tab()

        # this method can be used to click on all token transfer button aswell so reusing the same
        self.contractPageObj.click_all_transaction()

        self.contractPageObj.verify_user_in_transaction_list_view(value="Events")

        self.contractPageObj.change_page_number_from_input(input_count=10)

        self.contractPageObj.verify_page_count_from_url(expected_count=10)

        self.contractPageObj.change_page_number_from_input(input_count=20)

        self.contractPageObj.verify_page_count_from_url(expected_count=20)

        self.contractPageObj.change_page_number_from_input(input_count=300)

        self.contractPageObj.verify_page_count_from_url(expected_count=300)

        self.contractPageObj.change_page_number_from_input(input_count=1000)

        self.contractPageObj.verify_page_count_from_url(expected_count=1000)

        self.logger.info("********Finished test case "
                         "test_020_Verify_events_tab_list_pagination"
                         "...*******")
