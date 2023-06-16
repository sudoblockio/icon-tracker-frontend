import pytest

from e2e.pageObjects.GovernancePage import GovernancePage
from e2e.pageObjects.MainPage import MainPage
from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyPagerCounterValues:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.governance
    def test_024_Verify_pager_counter_values(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.governancePageObj = GovernancePage(self.driver)
        self.logger.info("********Starting test case Test_024_Verify_pager_counter_values...*******")
        self.governancePageObj.hover_governance_tab()
        self.governancePageObj.click_on_network_proposal_cta()
        self.governancePageObj.verify_pager_count(count=1)
        self.governancePageObj.click_on_next_cta()
        self.governancePageObj.verify_pager_count(count=2)
        self.governancePageObj.click_on_next_cta()
        self.governancePageObj.verify_pager_count(count=3)
        self.governancePageObj.click_on_prev_cta()
        self.governancePageObj.verify_pager_count(count=2)

        self.logger.info("********Finished execution Test_024_Verify_pager_counter_values...*******")
