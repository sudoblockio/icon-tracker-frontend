import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

from config import config

@pytest.fixture()
def setup(browser):
    if browser == 'firefox':
        driver = webdriver.Firefox()
        print("Launching firefox browser.........")
    else:
        options = Options()
        options.headless = config.headless
        driver = webdriver.Chrome(options=options)
        print("Launching chrome browser.........")
    return driver


def pytest_addoption(parser):  # This will get the value from CLI /hooks
    parser.addoption("--browser")


@pytest.fixture()
def browser(request):  # This will return the Browser value to setup method
    return request.config.getoption("--browser")


########### pytest HTML Report ################


# It is hook for Adding Environment info to HTML Report
def pytest_configure():
    config.metadata['Project Name'] = 'Icontracker'
    config.metadata['Module Name'] = 'Testing'
    config.metadata['Tester'] = 'Hari'


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
