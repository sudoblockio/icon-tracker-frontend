import pytest

from e2e.pageObjects.GovernancePage import GovernancePage
from e2e.pageObjects.MainPage import MainPage
from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class Test_025_Verify_network_proposal_list_clicking_and_redirection:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.governance
    @pytest.mark.standalone
    def test_025_Verify_network_proposal_list_clicking_and_redirection(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.governancePageObj = GovernancePage(self.driver)
        self.logger.info("********Starting test case Test_025_Verify_network_proposal_list_clicking_and_redirection...*******")
        self.governancePageObj.hover_governance_tab()
        self.governancePageObj.click_on_network_proposal_cta()

        for i in range(1, 11, 1):
            self.governancePageObj.click_applied_cta_in_network_proposal(count=i)
            self.governancePageObj.verify_network_proposal_detail_page()

        self.logger.info("********Finished execution Test_025_Verify_network_proposal_list_clicking_and_redirection...*******")
