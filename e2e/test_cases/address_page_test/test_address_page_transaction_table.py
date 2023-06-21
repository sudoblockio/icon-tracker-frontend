import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyAddressPageTransactionTable:
    logger = LogGen.loggen()
    verifyUrl = f"{config.base_url}/addresstx/{config.prep_address}"

    @pytest.mark.address_page
    def test_address_page_transaction_table(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_003_Verify_address_page_transaction_table...*******")
        self.driver.get(config.prep_address_url)

        # self.addressPageObj.verify_no_rows_in_transaction(count=30)

        self.addressPageObj.click_total_transaction_count()

        self.addressPageObj.verify_transaction_detail_page(title="Transactions")

        self.addressPageObj.verify_transaction_detail_page_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_003_Verify_address_page_transaction_table...*******")

