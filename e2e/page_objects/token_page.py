import time

from e2e.config import config
from e2e.utilities.automation_utils import AutomationUtils
from e2e.utilities.logger import LogGen


class TokenPage:
    logger = LogGen.loggen()
    contract_tab = "//li[contains(text(),'Contract')]"
    contract_title = "//span[@class='ContractComponent_titleItem__ev5E6']"
    contract_method_table = "//div[@class='MiscContractComponents_writeMethodTitle__eIK1t']"
    read_contract_tab = "//button[contains(text(),'Read Contract')]"
    write_contract_tab = "//button[contains(text(),'Write Contract')]"

    def __init__(self, driver):
        self.driver = driver

    def click_on_contract(self):
        """Click on contract tab on token page"""
        try:
            self.logger.info(">>trying to click on contracts tab")
            AutomationUtils.wait_for_element_to_load(self, self.contract_tab)
            self.driver.find_element("xpath", self.contract_tab).click()

        except:
            AutomationUtils.log_error(self, 'contract tab not found or not able to click on ocntract tab'
                                      , 'token_contract_tab.png')
            assert False

    def verify_token_page_title(self, sub_title):
        """Verify we successfully redirected to contract tab."""
        try:
            self.logger.info(">>trying to verify transaction detail page")
            time.sleep(config.default_sleep)
            AutomationUtils.wait_for_element_to_load(self, self.contract_title)
            var = self.driver.find_element("xpath", self.contract_title).text
            if sub_title in var:
                self.logger.info(">>contract page verified")
                assert True
            else:
                AutomationUtils.log_error(self, 'could not verify title of contract in token detail page'
                                          , 'contract title could not be verified.png')
                assert False

        except:
            AutomationUtils.log_error(self, 'could not verify title of transaction in transaction detail page'
                                      , 'transaction title could not be verified.png')
            assert False

    def verify_contract_table(self):
        self.logger.info(">>trying to verify table in token transfer")
        AutomationUtils.wait_for_element_to_load(self, self.contract_method_table)
        var = self.driver.find_element("xpath", self.contract_method_table)
        if var.is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'methods could not be verified'
                                      , 'contract_method_table.png')
            assert False
        self.logger.info(">>verified contract methods")

    def verify_token_page_contract_url(self, url):
        """Verify user is redirected to token contract page."""
        if url in self.driver.current_url:
            self.logger.info(">>redirected to expected URL")
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected to wrong URL'
                                      , 'redirected_wrong_URL.png')
            assert False

    def click_on_read_contract(self):
        """Click on read contract under contract tab on token page"""
        try:
            self.logger.info(">>trying to click on read contract tab")
            AutomationUtils.wait_for_element_to_load(self, self.read_contract_tab)
            self.driver.find_element("xpath", self.read_contract_tab).click()

        except:
            AutomationUtils.log_error(self, 'contract tab not found or not able to click on ocntract tab'
                                      , 'token_contract_tab.png')
            assert False

    def click_on_write_contract(self):
        """Click on write contract under contract tab on token page"""
        try:
            self.logger.info(">>trying to click on read contract tab")
            AutomationUtils.wait_for_element_to_load(self, self.write_contract_tab)
            self.driver.find_element("xpath", self.write_contract_tab).click()

        except:
            AutomationUtils.log_error(self, 'contract tab not found or not able to click on ocntract tab'
                                      , 'token_contract_tab.png')
            assert False
