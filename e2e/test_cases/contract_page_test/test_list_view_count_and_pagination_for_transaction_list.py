import pytest

from e2e.page_objects.contract_page import ContractPage
from e2e.page_objects.main_page import MainPage
from e2e.utilities.logger import LogGen
from e2e.utilities.read_properties import ReadConfig


class TestVerifyListViewCountAndPaginationForTransactionList:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.contract_page
    def test_list_view_count_and_pagination_for_transaction_list(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.contractPageObj = ContractPage(self.driver)

        self.logger.info("********Starting test case "
                         "Test_012_Verify_list_view_count_and_pagination_for_transaction_list"
                         "...*******")
        self.driver.get(ReadConfig.getContractMainUrl())

        self.contractPageObj.click_transaction_tab()

        self.contractPageObj.click_all_transaction()

        self.contractPageObj.verify_user_in_transaction_list_view(value="Transactions")

        self.contractPageObj.verify_total_number_in_transaction_list_view(count=25)

        self.contractPageObj.change_list_view_total_count(expected_count=10)

        self.contractPageObj.verify_total_number_in_transaction_list_view(count=10)

        self.contractPageObj.change_list_view_total_count(expected_count=25)

        self.contractPageObj.verify_total_number_in_transaction_list_view(count=25)

        self.contractPageObj.change_list_view_total_count(expected_count=50)

        self.contractPageObj.verify_total_number_in_transaction_list_view(count=50)

        self.contractPageObj.change_list_view_total_count(expected_count=100)

        self.contractPageObj.verify_total_number_in_transaction_list_view(count=100)

        self.logger.info("********Finished test case "
                         "Test_012_Verify_list_view_count_and_pagination_for_transaction_list"
                         "...*******")
