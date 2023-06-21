import pytest

from e2e.page_objects.main_page import MainPage
from e2e.page_objects.address_page import AddressPage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyAddressPageTokenTransfer:
    logger = LogGen.loggen()
    verifyUrl = f"{config.base_url}/addresstokentx/{config.prep_address}"

    @pytest.mark.address_page
    def test_address_page_token_transfer(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_004_Verify_address_page_token_transfer...*******")
        self.driver.get(config.prep_address_url)

        self.addressPageObj.click_on_token_transfer()

        self.addressPageObj.verify_token_transfer_table()

        self.addressPageObj.click_total_transaction_count()

        self.addressPageObj.verify_transaction_detail_page(title="Token Transfers")

        self.addressPageObj.verify_transaction_detail_page_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_004_Verify_address_page_token_transfer...*******")
