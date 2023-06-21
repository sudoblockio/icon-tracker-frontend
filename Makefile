.PHONY: help

dev:  ## Run the dev environment
	npm run start

test-all: test-unit test-e2e  ## Run all the tests

test-unit: ## Run unit tests
	npm test -- --watchAll=false

test-e2e-browser:  ## Run e2e tests showing the browser
	E2E_BASE_URL=http://localhost:3000 E2E_HEADLESS=false PYTHONPATH=`pwd` pytest -v -s --html=e2e/reports/report.html --capture=tee-sys e2e/test_cases/

test-e2e: ## Run the e2e tests
	PYTHONPATH=`pwd` E2E_BASE_URL=http://localhost:3000 pytest -v -s --html=e2e/reports/report.html --capture=tee-sys e2e/test_cases/

kill-bg-npm:  # Kill the background npm process on 3000
	@sudo fuser -k 3000/tcp

#python -m pytest -v -s --html=e2e/reports/report.html --capture=tee-sys --browser chrome

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-16s\033[0m %s\n", $$1, $$2}'
