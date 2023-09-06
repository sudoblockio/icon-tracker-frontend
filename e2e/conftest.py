import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from config import config

@pytest.fixture
def setup(browser):
    if browser == 'firefox':
        driver = webdriver.Firefox()
        print("Launching firefox browser.........")
    else:
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.binary_location = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        driver = webdriver.Chrome(executable_path='e2e/driver/chromedriver', chrome_options=chrome_options)

        # options = Options()
        # options.headless = config.headless
        # driver = webdriver.Chrome(options=options)
        print("Launching chrome browser.........")
    return driver


def pytest_addoption(parser):  # This will get the value from CLI /hooks
    parser.addoption("--browser")


@pytest.fixture()
def browser(request):  # This will return the Browser value to setup method
    return request.config.getoption("--browser")


########### pytest HTML Report ################


# It is hook for Adding Environment info to HTML Report
def pytest_configure(config):
    config._metadata['Project Name'] = 'Icontracker'
    config._metadata['Module Name'] = 'Testing'
    config._metadata['Tester'] = 'Hari'


# It is hook for delete/Modify Environment info to HTML Report
@pytest.hookimpl(optionalhook=True)
def pytest_metadata(metadata):
    metadata.pop("JAVA_HOME", None)
    metadata.pop("Plugins", None)


@pytest.fixture()
def setup_custom_network():
    """Fixture for running on a custom network."""
    os.environ["REACT_APP_RPC_ENDPOINT"] = "localhost:9000"
    os.environ["REACT_APP_NID"] = "3"
    yield

    del os.environ["REACT_APP_RPC_ENDPOINT"]
    del os.environ["REACT_APP_NID"]
