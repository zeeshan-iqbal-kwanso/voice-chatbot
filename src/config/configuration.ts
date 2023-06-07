export default () => ({
  env: process.env.PORT || 'prod',
  port: parseInt(process.env.PORT, 10) || 3200,
  credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS || '',
  twilio_account_sid: process.env.TWILIO_ACCOUNT_SID || '',
  twilio_auth_token: process.env.TWILIO_AUTH_TOKEN || '',
  twilio_webhook: process.env.TWILIO_WEBHOOK || '',
  twilio_phone: process.env.TWILIO_PHONE || '',
  dialogflow_project_id: process.env.DIALOGFLOW_PROJECT_ID || '',
  dialogflow_starting_event_name:
    process.env.DIALOGFLOW_STARTING_EVENT_NAME || '',
  dialogflow_eof_url: process.env.END_OF_INTERACTION_URL || '',
});
