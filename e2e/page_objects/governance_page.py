import time
from selenium.webdriver import ActionChains

from e2e.utilities.automation_utils import AutomationUtils
from e2e.utilities.logger import LogGen


class GovernancePage:
    logger = LogGen.loggen()

    governance_tab_cta = "(//span[contains(text(),'Governance')])[1]"
    governance_p_rep_cta = "(//span[contains(text(),'P-Rep List')])[1]"
    governance_p_rep_table = "//td[@class='bonded']"
    governance_network_cta = "(//span[contains(text(),'Network Proposal')])[1]"
    network_count_cta = "//div[@class='sort-holder']"
    network_list_count_5 = "//div[@class='sort-holder']//ul//li[1]"
    network_list_count_10 = "//div[@class='sort-holder']//ul//li[2]"
    network_total_list_count = "//span[contains(@class, 'proposal-status')]"
    network_page_next_cta = "//span[@name='next']"
    network_page_prev_cta = "//span[@class='prev']"
    network_pages_count = "//input[@value='%s']"
    network_proposal_applied_cta = "//*[contains(@class, 'proposal-status applied')]"
    network_proposal_detail_title = "//p[@class='title']"
    network_proposal_detail_total_voters = "//div[contains(@class, 'tab-holder')]//ul//li"
    network_detail_total_voters_list = "//table[contains(@class, 'table-typeC proposal')]//tbody//tr"
    network_detail_table_data_value = "//td[contains(text(),'%d')]"

    def __init__(self, driver):
        self.driver = driver

    def hover_governance_tab(self):
        a = ActionChains(self.driver)
        self.logger.info(">>waiting for governance tab to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.governance_tab_cta)
        m = self.driver.find_element('xpath', self.governance_tab_cta)
        a.move_to_element(m).perform()

    def click_on_p_rep_cta(self):
        self.logger.info(">>waiting for p-rep to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.governance_p_rep_cta)
        self.driver.find_element('xpath', self.governance_p_rep_cta).click()

    def click_on_network_proposal_cta(self):
        self.logger.info(">>waiting for network proposal to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.governance_network_cta)
        self.driver.find_element('xpath', self.governance_network_cta).click()

    def verify_p_rep_table_exist(self):
        self.logger.info(">>waiting for table to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.governance_p_rep_table)
        elements = self.driver.find_elements("xpath", self.governance_p_rep_table)
        if len(elements) > 0:
            assert True
        else:
            AutomationUtils.log_error(self, 'P-rep table list did not load'
                                      , 'p_rep_list_did_not_load.png')
            assert False

    def select_counter(self, counter):
        self.logger.info(">>waiting for network proposal counter to be visible")
        a = ActionChains(self.driver)
        AutomationUtils.wait_for_element_to_load(self, self.network_count_cta)
        m = self.driver.find_element('xpath', self.network_count_cta)
        a.move_to_element(m).perform()
        if counter == 5:
            self.driver.find_element('xpath', self.network_list_count_5).click()
        else:
            self.driver.find_element('xpath', self.network_list_count_10).click()

    def verify_network_list_count(self, exp_count):
        self.logger.info(">>waiting for network list to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.network_total_list_count)
        elements = self.driver.find_elements('xpath', self.network_total_list_count)
        if len(elements) == exp_count:
            assert True
        else:
            AutomationUtils.log_error(self, 'network table list did not load'
                                      , 'network_list_did_not_load.png')
            assert False

    def click_on_next_cta(self):
        self.logger.info(">>waiting for next to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.network_page_next_cta)
        self.driver.find_element('xpath', self.network_page_next_cta).click()
        time.sleep(1)

    def click_on_prev_cta(self):
        self.logger.info(">>waiting for prev to be visible")
        AutomationUtils.wait_for_element_to_load(self, self.network_page_prev_cta)
        self.driver.find_element('xpath', self.network_page_prev_cta).click()
        time.sleep(1)

    def verify_pager_count(self, count):
        self.logger.info(">>verifying the pager count")
        if self.driver.find_element("xpath", self.network_pages_count % count).is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'network page count verified'
                                      , 'network_page_count_error.png')
            assert False

    def click_applied_cta_in_network_proposal(self, count):
        self.logger.info(">>clicking on applied cta in network proposal item in list")
        AutomationUtils.wait_for_element_to_load(self, self.network_proposal_applied_cta)
        elements = self.driver.find_elements("xpath", self.network_proposal_applied_cta)
        for i in range(0, len(elements), 1):
            if i == count:
                elements[i].click()

    def verify_network_proposal_detail_page(self):
        self.logger.info(">>verifying network proposal detail page")
        AutomationUtils.wait_for_element_to_load(self, self.network_proposal_detail_title)
        element = self.driver.find_element("xpath", self.network_proposal_detail_title)
        if element.is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'network proposal detail page not verified'
                                      , 'network_proposal_detail_page_not_verified.png')
            assert False

    def select_total_voters(self):
        self.logger.info(">>clicking on total voters page")
        AutomationUtils.wait_for_element_to_load(self, self.network_proposal_detail_total_voters)
        element = self.driver.find_elements('xpath', self.network_proposal_detail_total_voters)[0]
        element.click()

    def select_total_token_votes(self):
        self.logger.info(">>clicking on total token votes page")
        AutomationUtils.wait_for_element_to_load(self, self.network_proposal_detail_total_voters)
        element = self.driver.find_elements('xpath', self.network_proposal_detail_total_voters)[1]
        element.click()

    def verify_items_in_network_proposal_detail(self, value):
        self.logger.info(">>verifying expected value from network proposal detail page")
        element = self.driver.find_element('xpath', self.network_detail_table_data_value % value)
        if element.is_displayed():
            assert True
        else:
            AutomationUtils.log_error(self, 'Items not coming as expected in the value'
                                      , 'items_not_coming_as_expected_in_network_proposal.png')
            assert False

    def verify_total_voters_count(self):
        self.logger.info(">>verifying count for total voters in network proposal detail page")
        AutomationUtils.wait_for_element_to_load(self, self.network_detail_total_voters_list)
        element = self.driver.find_element("xpath", self.network_detail_total_voters_list)
        if len(element) == 25:
            assert True
        else:
            AutomationUtils.log_error(self, 'verified list count in total voters'
                                      , 'verified_list_count_in_total_voters.png')
            assert False
