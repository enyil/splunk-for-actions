const axios = require('axios');
/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const FormData = require('form-data');

module.exports = (app) => {

  app.log.info("Yay, the app was loaded!");

  app.on('workflow_run.completed', async (context) => {
    const run_id = context.payload.workflow_run.id;
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;
    const workflow_path = context.payload.workflow_run.path;

    // Use the GitHub REST API to retrieve the logs for the workflow run
    const response = await context.octokit.request(
      `GET /repos/${owner}/${repo}/actions/runs/${run_id}/logs`,
      { headers: { accept: 'application/vnd.github+json' } }
    );

    const logs = response.data;

    // Format the logs for forwarding to Splunk
    const logData = {
      event: 'workflow_run_logs',
      run_id: run_id,
      owner: owner,
      repo: repo,
      workflow_path: workflow_path,
      logs: logs
    };

    // Forward the logs to Splunk using HTTP Event Collector
    const form = new FormData();
    form.append('sourcetype', 'github_workflow_logs');
    form.append('event', JSON.stringify(logData));

    const splunkUrl = process.env.SPLUNK_URL;
    const splunkToken = process.env.SPLUNK_TOKEN;

    const splunkResponse = await axios.post(splunkUrl, form, {
      headers: {
        Authorization: `Splunk ${splunkToken}`,
        ...form.getHeaders(),
      },
    });

    console.log('Logs forwarded to Splunk with status:', splunkResponse.status);
  });
};