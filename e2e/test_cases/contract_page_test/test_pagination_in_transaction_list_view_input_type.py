import time

import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyPaginationInTransactionListViewInputType:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_pagination_in_transaction_list_view_input_type(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_013_Verify_pagination_in_transaction_list_view_input_type"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_transaction_tab()

        self.contractPageObj.click_all_transaction()

        self.contractPageObj.change_page_number_from_input(input_count=10)

        self.contractPageObj.verify_page_count_from_url(expected_count=10)

        self.contractPageObj.change_page_number_from_input(input_count=20)

        self.contractPageObj.verify_page_count_from_url(expected_count=20)

        self.contractPageObj.change_page_number_from_input(input_count=300)

        self.contractPageObj.verify_page_count_from_url(expected_count=300)

        self.contractPageObj.change_page_number_from_input(input_count=1000)

        self.contractPageObj.verify_page_count_from_url(expected_count=1000)

        self.logger.info("********Finished test case "
                         "Test_013_Verify_pagination_in_transaction_list_view_input_type"
                         "...*******")
