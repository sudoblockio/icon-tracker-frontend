from e2e.pageObjects.MainPage import MainPage
from e2e.pageObjects.AddressPage import AddressPage

from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class Test_003_Verify_address_page_transaction_table:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()
    verifyUrl = "https://tracker.icon.community/addresstx/hx0b047c751658f7ce1b2595da34d57a0e7dad357d"

    def test_003_Verify_address_page_transaction_table(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.mainPageObj = MainPage(self.driver)
        self.addressPageObj = AddressPage(self.driver)

        self.logger.info("********Starting test case Test_003_Verify_address_page_transaction_table...*******")
        self.driver.get(ReadConfig.getExpectedUrl(1))

        self.addressPageObj.verify_no_rows_in_transaction(count=30)

        self.addressPageObj.click_total_transaction_count()

        self.addressPageObj.verify_transaction_detail_page(title="Transactions")

        self.addressPageObj.verify_transaction_detail_page_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_003_Verify_address_page_transaction_table...*******")

