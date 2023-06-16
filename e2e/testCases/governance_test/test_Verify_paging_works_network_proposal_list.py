import pytest

from e2e.pageObjects.GovernancePage import GovernancePage
from e2e.pageObjects.MainPage import MainPage
from e2e.utilities.Logger import LogGen
from e2e.utilities.ReadProperties import ReadConfig


class TestVerifyPagingWorksNetworkProposalList:
    baseurl = ReadConfig.getBaseUrl()
    logger = LogGen.loggen()

    @pytest.mark.governance
    def test_023_Verify_paging_works_network_proposal_list(self, setup):
        self.driver = setup
        self.driver.get(self.baseurl)
        self.governancePageObj = GovernancePage(self.driver)
        self.logger.info("********Starting test case Test_023_Verify_paging_works_network_proposal_list...*******")
        self.governancePageObj.hover_governance_tab()
        self.governancePageObj.click_on_network_proposal_cta()
        self.governancePageObj.select_counter(counter=5)
        self.governancePageObj.verify_network_list_count(exp_count=5)
        self.governancePageObj.select_counter(counter=10)
        self.governancePageObj.verify_network_list_count(exp_count=10)
        self.logger.info("********Finished execution Test_023_Verify_paging_works_network_proposal_list...*******")
