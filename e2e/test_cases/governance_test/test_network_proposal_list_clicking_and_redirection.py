import pytest

from e2e.page_objects.governance_page import GovernancePage
from e2e.utilities.logger import LogGen
from e2e.utilities.read_properties import ReadConfig
from e2e.config import config


class TestVerifyNetworkProposalListClickingAndRedirection:
    logger = LogGen.loggen()

    @pytest.mark.governance
    def test_Verify_network_proposal_list_clicking_and_redirection(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.governancePageObj = GovernancePage(self.driver)
        self.logger.info("********Starting test case Test_025_Verify_network_proposal_list_clicking_and_redirection...*******")
        self.governancePageObj.hover_governance_tab()
        self.governancePageObj.click_on_network_proposal_cta()

        for i in range(1, 11, 1):
            self.governancePageObj.click_applied_cta_in_network_proposal(count=i)
            self.governancePageObj.verify_network_proposal_detail_page()

        self.logger.info("********Finished execution Test_025_Verify_network_proposal_list_clicking_and_redirection...*******")
