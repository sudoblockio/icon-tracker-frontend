import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

from e2e.utilities.AutomationUtils import AutomationUtils
from e2e.utilities.Logger import LogGen
from selenium.webdriver.support import expected_conditions as EC

from e2e.utilities.ReadProperties import ReadConfig


class AddressPage:
    logger = LogGen.loggen()

    address_title = "//p[@class='title']"
    address_voters_list = "//*[@class='on']//span"
    address_transaction_table_count = "//*[@class='ellipsis']"
    address_total_transaction_cta = "(//*[@class='mint'])[2]"
    address_token_transfer_cta = "//li[contains(text(),'Token Transfers')]"
    address_token_transfer_table = '//table[@class="table-typeC token"]'
    address_voters_cta = "//li[contains(text(),'Voters')]"

    def __init__(self, driver):
        self.driver = driver

    def verify_user_in_address_page(self, url):
        """
                verify_user_in_address_page
                -this method is used to verify user is redirected to address page when searching for appropriate data
                @param - url: expected url for the result
        """
        try:
            self.logger.info(">>waiting for address title to be visible")
            AutomationUtils.wait_for_element_to_load(self, self.address_title)

            if url == self.driver.current_url:
                self.logger.info(">>redirected to expected URL")
                assert True
            else:
                AutomationUtils.log_error(self, 'redirected to wrong URL'
                                          , 'redirected_wrong_URL.png')
                assert False
        except:
            AutomationUtils.log_error(self, 'address title is not visible'
                                      , 'address_title_not_visible.png')
            assert False

    def verify_no_rows_in_transaction(self, count):
        """
                verify_no_rows_in_transaction
                -this method is used to verify the row count in transaction table
                @param count : number of items expected
        """
        try:
            self.logger.info(">>trying to verify if number of columns in transaction table is as expected")
            AutomationUtils.wait_for_element_to_load(self, self.address_transaction_table_count)

            column_count = len(self.driver.find_elements("xpath", self.address_transaction_table_count))
            if column_count == count:
                self.logger.info(">>count verified as expected")
                assert True
            else:
                AutomationUtils.log_error(self, 'number of columns could not be verified'
                                          , 'number_of_column_could_not_be_verified.png')
                assert False

        except:
            AutomationUtils.log_error(self, 'number of columns could not be verified'
                                      , 'number_of_column_could_not_be_verified.png')
            assert False

    def click_total_transaction_count(self):
        """
               click_total_transaction_count
               -this method is used to click on total transaction cta in address page table
        """
        try:
            self.logger.info(">>trying to click on total transaction count cta")
            AutomationUtils.wait_for_element_to_load(self, self.address_total_transaction_cta)
            self.driver.find_element("xpath", self.address_total_transaction_cta).click()

        except:
            AutomationUtils.log_error(self, 'number of columns could not be verified'
                                      , 'number_of_column_could_not_be_verified.png')
            assert False

    def verify_transaction_detail_page(self, title):
        """
                verify_transaction_detail_page
                -this method is used to verify we successfully redirected to transaction detail page
        """
        try:
            self.logger.info(">>trying to verify transaction detail page")
            time.sleep(5)
            var = self.driver.find_element("xpath", self.address_title).text
            if title in var:
                self.logger.info(">>transaction detail page verified")
                assert True
            else:
                AutomationUtils.log_error(self, 'could not verify title of transaction in transaction detail page'
                                          , 'transaction title could not be verified.png')
                assert False

        except:
            AutomationUtils.log_error(self, 'could not verify title of transaction in transaction detail page'
                                      , 'transaction title could not be verified.png')
            assert False

    def verify_transaction_detail_page_url(self, url):
        """
                verify_transaction_detail_page_url
                -this method is used to verify user is redirected to transaction detail page
                @param - url: expected url for the result
        """
        if url == self.driver.current_url:
            self.logger.info(">>redirected to expected URL")
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected to wrong URL'
                                      , 'redirected_wrong_URL.png')
            assert False

    def click_on_token_transfer(self):
        """
            click_on_token_transfer
            -this method is used to click on token transfer button
        """
        self.logger.info(">>trying to click on token transfer")
        AutomationUtils.wait_for_element_to_load(self, self.address_token_transfer_cta)
        self.driver.find_element("xpath", self.address_token_transfer_cta).click()
        self.logger.info(">>clicked on token transfer")

    def verify_token_transfer_table(self):
        """
            verify_token_transfer_table
            -this method is used to verify if the table with data is present or not in token tranfer
        """
        self.logger.info(">>trying to verify table in token transfer")
        AutomationUtils.wait_for_element_to_load(self, self.address_token_transfer_table)
        var = self.driver.find_element("xpath", self.address_token_transfer_table)
        if var.is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'table could not be verified'
                                      , 'token_transfer_table.png')
            assert False
        self.logger.info(">>verified table")

    def click_on_voters_tab(self):
        """
            click_on_voters_tab
            -this method is used to click on the voters tab
        """
        self.logger.info(">>trying to click on voters tab")
        AutomationUtils.wait_for_element_to_load(self, self.address_voters_cta)
        self.driver.find_element("xpath", self.address_voters_cta).click()
        self.logger.info(">>clicked on voters tab")

    def verify_all_links_in_voters_tab_works(self, count):
        """
            verify_all_links_in_voters_tab_works
            -this method is used to verify all the links present in voters tab is working as expected
        """
        try:
            self.logger.info(">>verifying all the links in voters tab")
            AutomationUtils.wait_for_element_to_load(self, self.address_voters_list)
            items = self.driver.find_elements("xpath", self.address_voters_list)
            var = items[count].text
            self.logger.info(">>voter value "+var)
            items[count].click()

            if var in self.driver.current_url:
                assert True
            else:
                AutomationUtils.log_error(self, 'redirected url is not as expected'
                                          , 'redirected_url_is_different.png')
                assert False
        finally:
            self.driver.get(ReadConfig.getExpectedUrl(1))
            self.click_on_voters_tab()


