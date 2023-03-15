from e2e.utilities.AutomationUtils import AutomationUtils
from e2e.utilities.Logger import LogGen

class AddressPage:
    logger = LogGen.loggen()

    address_title = "//p[@class='title']"

    def __init__(self, driver):
        self.driver = driver

    """
        verify_user_in_address_page
        -this method is used to verify user is redirected to address page when searching for appropriate data
        @param - url: expected url for the result
    """
    def verify_user_in_address_page(self, url):
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




