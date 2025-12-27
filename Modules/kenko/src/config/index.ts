/**
 * Return all the config from this file only
 */

const nconf = require('nconf'),
  env = process.env.NODE_ENV || 'local';
// env = "prod";

console.log(`NODE_ENV was ===> ${env}`);

nconf
  .argv()
  .env()
  .file({ file: `${__dirname}/config.${env}.json` });

const config: any = {};

//********APP-CONFIG********
config.isProd = (() => {
  if (
    process &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV === 'prod'
  ) {
    return true;
  } else {
    return false;
  }
})();

config.isDev = (() => {
  if (
    process &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV === 'dev'
  ) {
    return true;
  } else {
    return false;
  }
})();

config.isLocal = (() => {
  if (
    process &&
    process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV === 'local'
  ) {
    return true;
  } else {
    return false;
  }
})();

config.appName = (() => {
  return nconf.get('application').name;
})();

config.port = (() => {
  return nconf.get('application').port;
})();

config.backendBaseUrl = (() => {
  return nconf.get('application').base_url;
})();

//********ZOHO-BOOK********
config.zohoRefreshToken = (() => {
  return nconf.get('zoho_book').refresh_token;
})();

config.zohoClientId = (() => {
  return nconf.get('zoho_book').zoho_client_id;
})();

config.zohoClientSecret = (() => {
  return nconf.get('zoho_book').zoho_client_secret;
})();

config.zohoOrgId = (() => {
  return nconf.get('zoho_book').zoho_org_id;
})();

config.zohoBookBaseUrl = (() => {
  return nconf.get('zoho_book').zoho_book_base_url;
})();

// config.dbName = (() => {
//     return nconf.get("database").db_name;
// })();

// ********REDIS-CONFIG********
config.redisHost = (() => {
  return nconf.get('redis').host;
})();

config.redisPort = (() => {
  return nconf.get('redis').port;
})();

//********RABBITMQ********

config.rabbitmqConnString = (() => {
  const rmq = nconf.get('rabbitmq');
  const str = `${rmq.protocol}://${rmq.user_name}:${rmq.password}@${rmq.end_point}`;
  console.info(`rmq connection str=[${str}]`);
  return str;
})();

//********HUSBPOT-CONFIG********
config.hubspotBaseUrl = (() => {
  return nconf.get('hubspot').base_url;
})();

config.hubspotAPIKey = (() => {
  return nconf.get('hubspot').api_key;
})();

config.hubspotTestUserContactId = (() => {
  return nconf.get('hubspot').test_user_contact_id;
})();

config.orgId = (() => {
  return nconf.get('hubspot').org_id;
})();

config.hubspotBaseUrlCrm = (() => {
  return nconf.get('hubspot').base_url_crm;
})();

//********INTERNAL_SERVICE_URLS********
config.mainBackendUrl = (() => {
  return nconf.get('internal_service_urls').main_backend_url;
})();

export const AppConfig = config;
