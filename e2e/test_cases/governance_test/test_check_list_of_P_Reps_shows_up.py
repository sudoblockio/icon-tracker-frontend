import time

import pytest

from e2e.page_objects.governance_page import GovernancePage
from e2e.utilities.logger import LogGen
from e2e.config import config


class TestVerifyCheckListOfPRepsShowsUp:
    logger = LogGen.loggen()

    @pytest.mark.governance
    def test_check_list_of_P_Reps_shows_up(self, setup):
        self.driver = setup
        self.driver.get(config.base_url)
        self.governancePageObj = GovernancePage(self.driver)
        self.logger.info("********Starting test case Test_022_Verify_check_list_of_P_Reps_shows_up...*******")
        self.governancePageObj.hover_governance_tab()
        self.governancePageObj.click_on_p_rep_cta()
        time.sleep(config.default_sleep + 2)
        self.governancePageObj.verify_p_rep_table_exist()
        self.logger.info("********Finished execution Test_022_Verify_check_list_of_P_Reps_shows_up...*******")
