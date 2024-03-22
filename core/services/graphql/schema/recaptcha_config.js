const recaptchaConfig = `
  {
    storeConfig {
      pwa {
        recaptcha_server_key_local
        recaptcha_server_key_dev
        recaptcha_server_key_stage
        recaptcha_server_key_prod
      }
    }
  }
`;

module.exports = { recaptchaConfig };
