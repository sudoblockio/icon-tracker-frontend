import time

import pytest

from e2e.page_objects.ContractPage import ContractPage
from e2e.page_objects.MainPage import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyEventsTabListViewListCount:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_019_Verify_events_tab_list_view_list_count(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_019_Verify_events_tab_list_view_list_count"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_events_tab()

        # this method can be used to click on all token transfer button aswell so reusing the same
        self.contractPageObj.click_all_transaction()

        self.contractPageObj.verify_user_in_transaction_list_view(value="Events")

        self.contractPageObj.verify_total_number_in_events_list_view(count=25)

        self.contractPageObj.change_list_view_total_count(expected_count=10)

        self.contractPageObj.verify_total_number_in_events_list_view(count=10)

        self.contractPageObj.change_list_view_total_count(expected_count=25)

        self.contractPageObj.verify_total_number_in_events_list_view(count=25)

        self.contractPageObj.change_list_view_total_count(expected_count=50)

        self.contractPageObj.verify_total_number_in_events_list_view(count=50)

        self.contractPageObj.change_list_view_total_count(expected_count=100)

        self.contractPageObj.verify_total_number_in_events_list_view(count=100)

        self.logger.info("********Finished test case "
                         "Test_019_Verify_events_tab_list_view_list_count"
                         "...*******")
