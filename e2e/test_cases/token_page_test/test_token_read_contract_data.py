import pytest

from e2e.config import config
from e2e.page_objects.main_page import MainPage
from e2e.page_objects.token_page import TokenPage
from e2e.utilities.logger import LogGen


class TestTokenListPage:
    logger = LogGen.loggen()
    verifyUrl = f"{config.base_url}/token/{config.prep_address}"

    @pytest.mark.token_page
    def test_token_page_contract_read_write(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.tokenPageObj = TokenPage(self.driver)

        self.logger.info("********Starting test case Test_027_Verify_token_page_contract_read/write_contract_page"
                         "...*******")
        self.driver.get(config.token_address_url)

        self.tokenPageObj.click_on_contract()
        self.tokenPageObj.verify_token_page_title(sub_title="Read/Write Contract methods")
        self.tokenPageObj.verify_contract_table()
        self.tokenPageObj.verify_token_page_contract_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_027_Verify_token_page_contract_read/write_contract_page"
                         "...*******")

    @pytest.mark.token_page
    def test_token_page_contract_read(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.tokenPageObj = TokenPage(self.driver)

        self.logger.info("********Starting test case Test_028_Verify_token_page_contract_read_contract_page"
                         "...*******")
        self.driver.get(config.token_address_url)

        self.tokenPageObj.click_on_contract()
        self.tokenPageObj.click_on_read_contract()
        self.tokenPageObj.verify_token_page_title(sub_title="Read contract methods")
        self.tokenPageObj.verify_contract_table()
        self.tokenPageObj.verify_token_page_contract_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_028_Verify_token_page_contract_read_contract_page"
                         "...*******")

    @pytest.mark.token_page
    def test_token_page_contract_write(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.mainPageObj = MainPage(self.driver)
        self.tokenPageObj = TokenPage(self.driver)

        self.logger.info("********Starting test case Test_029_Verify_token_page_contract_write_contract_page"
                         "...*******")
        self.driver.get(config.token_address_url)

        self.tokenPageObj.click_on_contract()
        self.tokenPageObj.click_on_write_contract()
        self.tokenPageObj.verify_token_page_title(sub_title="Write contract methods")
        self.tokenPageObj.verify_contract_table()
        self.tokenPageObj.verify_token_page_contract_url(url=self.verifyUrl)
        self.logger.info("********Finished test case Test_029_Verify_token_page_contract_write_contract_page"
                         "...*******")

