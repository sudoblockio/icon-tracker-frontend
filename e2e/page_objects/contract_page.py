import time

from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

from e2e.utilities.automation_utils import AutomationUtils
from e2e.utilities.logger import LogGen
from e2e.config import config


class ContractPage:
    logger = LogGen.loggen()

    contract_name_link = "//a[contains(text(),'Balanced Dollar')]"
    contact_creator_link = "//a[contains(text(),'cx44250a12074799e26fdeee75648ae47e2cc84219')]"
    contract_name_page_header = "//p[contains(text(),'Balanced Dollar')]"
    contract_creator_text = "//*[contains(text(),'%s')]"
    contract_transaction_tab_cta = "//li[contains(text(),'Transactions')][1]"
    contract_total_transaction_button = "//*[@class='mint']"
    contract_transaction_list = "//a//*[@class='ellipsis']"
    title_xpath = "//p[@class='title']"
    list_view_page_dropdown = "//div[@class='sort-holder']"
    list_view_page_dropdown_items = "//div[@class='sort-holder']//ul//li[%s]//span"
    list_view_page_number_input = "//input[@type='text']"
    list_view_page_next_cta = "//span[@name='next']"
    list_view_total_item_count = "//a//*[@class='ellipsis']"
    contract_token_transfer_cta = "//li[contains(text(),'Token Transfers')][1]"
    contract_token_transfer_list = "//td[contains(@class, ' on')]//a//*[@class='ellipsis']"
    contract_code_tab_cta = "//li[contains(text(),'Code')][1]"
    contract_code_block = "//*[contains(@class, 'code-box api')]"
    contract_read_contract_tab_cta = "//li[contains(text(),'Read Contract')][1]"
    contract_read_contract_list = "//ul[@class='list']"
    contract_events_tab_cta = "//li[contains(text(),'Events')][1]"
    contract_events_list_view = "//td[contains(@class, 'on')]//span[@class='ellipsis']"


    def __init__(self, driver):
        self.driver = driver

    def click_name_link(self):
        """
            click_name_link
            -this method is used to click on name link in contract page
        """
        self.logger.info(">>waiting for name link to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.contract_name_link)
        self.driver.find_element("xpath", self.contract_name_link).click()

    def click_creator_link(self):
        """Click on creator link in contract page."""
        self.logger.info(">>waiting for creator link to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.contact_creator_link)
        self.driver.find_element("xpath", self.contact_creator_link).click()

    def verify_user_name_page(self):
        """Verify if user is in name page."""
        self.logger.info(">>waiting for name page header to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.contract_name_page_header)

        if self.driver.find_element("xpath", self.contract_name_page_header).is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'did not navigate to name details page'
                                      , 'not_navigated_to_name_page.png')
            assert False

    def verify_contract_page(self, value):
        """Verify if user is redirected to correct contractor page."""
        self.logger.info(">>waiting for creator link to be visible")
        if self.driver.find_element("xpath", self.contract_creator_text % value):
            assert True
        else:
            AutomationUtils.log_error(self, 'did not navigate to contractor details page'
                                      , 'not_navigated_to_contractor_page.png')
            assert False

    def click_transaction_tab(self):
        self.logger.info(">>clicking on transaction tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_transaction_tab_cta)
        self.driver.find_element("xpath", self.contract_transaction_tab_cta).click()

    def verify_all_links_in_transaction_tab(self, count):
        self.logger.info(">>verifying all links in transaction tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_transaction_list)
        elements = self.driver.find_elements("xpath", self.contract_transaction_list)
        var = elements[count].text
        self.logger.info(">>checking transaction " + var)
        elements[count].click()
        time.sleep(2)
        if var in self.driver.current_url:
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected url is not as expected'
                                      , 'redirected_url_is_not_as_expected_transaction_contractor_page.png')
            assert False

    def click_all_transaction(self):
        self.logger.info(">>clicking on all transactions cta")
        AutomationUtils.wait_for_element_to_load(self, self.contract_total_transaction_button)
        self.driver.find_element("xpath", self.contract_total_transaction_button).click()

    def verify_user_in_transaction_list_view(self, value):
        self.logger.info(">>verifying the user is in transaction list view")
        AutomationUtils.wait_for_element_to_load(self, self.title_xpath)
        element = self.driver.find_element('xpath', self.title_xpath)
        print(element.text)
        if value in element.text:
            assert True
        else:
            AutomationUtils.log_error(self, 'user not in transaction list view'
                                      , 'user_not_present_in_transaction_list.png')
            assert False

    def verify_total_number_in_transaction_list_view(self, count):
        self.logger.info(">>verifying the total number of transactions in list view")
        time.sleep(5)
        AutomationUtils.wait_for_element_to_load(self, self.list_view_total_item_count)
        elements = self.driver.find_elements('xpath', self.list_view_total_item_count)
        self.logger.info(">>length of list is +=" + str(len(elements)))
        if count == len(elements):
            assert True
        else:
            AutomationUtils.log_error(self, 'total number of items in list view is not as expected'
                                      , 'total_number_of_items_are_not_as_expected.png')
            assert False

    def change_list_view_total_count(self, expected_count):
        self.logger.info(">>changing the count of transaction displayed in list view")
        AutomationUtils.wait_for_element_to_load(self, self.list_view_page_dropdown)
        self.driver.find_element('xpath', self.list_view_page_dropdown).click()
        time.sleep(3)
        if expected_count == 10:
            print("xpath expected is ------------------" + self.list_view_page_dropdown_items % str(1))
            self.driver.find_element('xpath', self.list_view_page_dropdown_items % str(1)).click()
        elif expected_count == 25:
            print("xpath expected is ------------------" + self.list_view_page_dropdown_items % str(2))
            self.driver.find_element('xpath', self.list_view_page_dropdown_items % str(2)).click()
        elif expected_count == 50:
            print("xpath expected is ------------------" + self.list_view_page_dropdown_items % str(3))
            self.driver.find_element('xpath', self.list_view_page_dropdown_items % str(3)).click()
        elif expected_count == 100:
            print("xpath expected is ------------------" + self.list_view_page_dropdown_items % str(4))
            self.driver.find_element('xpath', self.list_view_page_dropdown_items % str(4)).click()

    def change_page_number_from_input(self, input_count):
        self.logger.info(">>checking the pagination for transaction count")
        AutomationUtils.wait_for_element_to_load(self, self.list_view_page_number_input)
        self.driver.find_element('xpath', self.list_view_page_number_input).clear()
        self.driver.find_element('xpath', self.list_view_page_number_input).send_keys(input_count)
        actions = ActionChains(self.driver)
        actions.send_keys(Keys.ENTER)
        actions.perform()
        self.logger.info(">>pagination initiated")

    def verify_page_count_from_url(self, expected_count):
        self.logger.info(">>verifying the page count from the URL")
        time.sleep(3)
        if str(expected_count) in self.driver.current_url:
            assert True
        else:
            AutomationUtils.log_error(self, 'expected number not found in URL'
                                      , 'expected_number_not_found_in_URL.png')
            assert False

    def click_token_transfer_tab(self):
        self.logger.info(">>clicking on token_transfer tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_token_transfer_cta)
        self.driver.find_element("xpath", self.contract_token_transfer_cta).click()

    def verify_all_links_in_token_transfer_tab(self, count):
        self.logger.info(">>verifying all links in token transfer tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_token_transfer_list)
        elements = self.driver.find_elements("xpath", self.contract_token_transfer_list)
        var = elements[count].text
        self.logger.info(">>checking token transfer " + var)
        elements[count].click()
        time.sleep(2)
        if var in self.driver.current_url:
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected url is not as expected'
                                      , 'redirected_url_is_not_as_expected_token_transfer_contractor_page.png')
            assert False

    def verify_total_number_in_token_transfer_list_view(self, count):
        self.logger.info(">>verifying the total number of token transfer in list view")
        time.sleep(5)
        AutomationUtils.wait_for_element_to_load(self, self.contract_token_transfer_list)
        elements = self.driver.find_elements('xpath', self.contract_token_transfer_list)
        self.logger.info(">>length of list is +=" + str(len(elements)))
        if count == len(elements):
            assert True
        else:
            AutomationUtils.log_error(self, 'total number of items in list view is not as expected'
                                      , 'total_number_of_items_are_not_as_expected.png')
            assert False

    def click_code_tab(self):
        self.logger.info(">>clicking on code tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_code_tab_cta)
        self.driver.find_element("xpath", self.contract_code_tab_cta).click()

    def verify_code_block_visible(self):
        self.logger.info(">>verifying the code block exists")
        time.sleep(config.default_sleep)
        if self.driver.find_element('xpath', self.contract_code_block):
            assert True
        else:
            AutomationUtils.log_error(self, 'code block not visible'
                                      , 'code_block_not_visible.png')
            assert False

    def click_read_contract_tab(self):
        self.logger.info(">>clicking on read contract tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_read_contract_tab_cta)
        self.driver.find_element("xpath", self.contract_read_contract_tab_cta).click()

    def verify_list_present_in_read_contract_tab(self):
        self.logger.info(">>verifying read contract list exist")
        AutomationUtils.wait_for_element_to_load(self, self.contract_read_contract_list)
        element = self.driver.find_element('xpath', self.contract_read_contract_list)
        items = element.find_elements(By.TAG_NAME, 'li')
        if len(items) > 0:
            assert True
        else:
            AutomationUtils.log_error(self, 'items in list could not be verified'
                                      , 'items_in_list_could_not_be_verified.png')
            assert False

    def click_events_tab(self):
        self.logger.info(">>clicking on events tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_events_tab_cta)
        self.driver.find_element("xpath", self.contract_events_tab_cta).click()

    def verify_total_number_in_events_list_view(self, count):
        self.logger.info(">>verifying the total number of events in list view")
        time.sleep(config.default_sleep)
        AutomationUtils.wait_for_element_to_load(self, self.contract_events_list_view)
        elements = self.driver.find_elements('xpath', self.contract_events_list_view)
        self.logger.info(">>length of list is +=" + str(len(elements)))
        if count == len(elements):
            assert True
        else:
            AutomationUtils.log_error(self, 'total number of items in list view is not as expected'
                                      , 'total_number_of_items_are_not_as_expected.png')
            assert False

    def verify_all_links_in_events_tab(self, count):
        self.logger.info(">>verifying all links in events tab")
        AutomationUtils.wait_for_element_to_load(self, self.contract_events_list_view)
        elements = self.driver.find_elements("xpath", self.contract_events_list_view)
        var = elements[count].text
        self.logger.info(">>checking events " + var)
        elements[count].click()
        time.sleep(2)
        if var in self.driver.current_url:
            assert True
        else:
            AutomationUtils.log_error(self, 'redirected url is not as expected'
                                      , 'redirected_url_is_not_as_expected_events_page.png')
            assert False