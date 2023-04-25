.PHONY: help

dev:  ## Run the dev environment
	npm run start

test-all: test-unit test-e2e  ## Run all the tests

test-unit: ## Run unit tests
	npm test -- --watchAll=false

test-e2e-browser:  ## Run e2e tests in the browser
	python -m pytest -v -s --html=e2e/reports/report.html --capture=tee-sys e2e/testCases/address_page_test/* --browser chrome

test-e2e: ## Run the e2e tests
	python -m pytest e2e/

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
