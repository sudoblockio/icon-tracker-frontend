import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyEventsTabListViewListCount:
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_events_tab_list_view_list_count(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_019_Verify_events_tab_list_view_list_count"
                         "...*******")
        self.driver.get(config.contract_contract_path)

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
