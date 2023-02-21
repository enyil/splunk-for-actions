# Probot Application for Forwarding GitHub Workflow Logs to Splunk
This is a Probot application that listens for a workflow_run event in a GitHub repository, downloads the logs for the workflow run using the GitHub REST API, and forwards the logs to a Splunk HTTP Event Collector. The Splunk URL and token are retrieved from environment variables, so they can be easily configured for different environments. This program can be deployed as an Azure Function to automatically monitor and forward logs from GitHub workflows to Splunk for further analysis.
### Requirements
To use this Probot application, you’ll need the following:
* A  [GitHub account](https://github.com/)  and repository
* A  [Splunk](https://www.splunk.com/)  account and HTTP Event Collector token
* A development environment with  [Node.js](https://nodejs.org/)  installed
### Installation
To install this Probot application, follow these steps:
1 Clone this repository to your development environment.
2 Install dependencies by running npm install in the root directory of the repository.
3 Create a .env file in the root directory of the repository with the following content:
makefile

Copy code
APP_ID=<your GitHub App ID> WEBHOOK_SECRET=<your GitHub App webhook secret> SPLUNK_URL=<your Splunk HTTP Event Collector URL> SPLUNK_TOKEN=<your Splunk HTTP Event Collector token>
Replace the values in angle brackets with your own values. You can obtain your GitHub App ID and webhook secret by  [creating a new GitHub App](https://docs.github.com/en/developers/apps/creating-a-github-app) , and your Splunk HTTP Event Collector token by  [creating a new HTTP Event Collector token](https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/UsetheHTTPEventCollector) .
4. Build the application by running npm run build.
5 Deploy the application to Azure Functions by running npm run deploy (make sure you have the  [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)  installed).
### Usage
Once the Probot application is installed and deployed, it will automatically listen for workflow_run events in your GitHub repository. Whenever a new workflow run is triggered, the application will download the logs for the run using the GitHub REST API, format the logs for forwarding to Splunk, and forward the logs to your Splunk HTTP Event Collector using an HTTP POST request. You can view the forwarded logs in your Splunk environment by searching for events with the sourcetype github_workflow_logs.
### Contributing
If you find a bug or have a feature request, please  [create a new issue](https://github.com/enyil/splunk-for-actions/issues)  in this repository. We welcome pull requests with bug fixes or new features as well. We welcome pull requests.