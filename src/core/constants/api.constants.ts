export class ApiConstants {
  static DEBUG = process.env.DEBUG === 'true';
  // static DEBUG = false;

  static MONGOOSETLSCERT = !(process.env.MONGOOSETLSCERT === 'false');

  static hosts = {
    idemia: process.env.IDEMIA_HOST,
    plaid: process.env.PLAID_HOST,
    onfido: process.env.ONFIDO_HOST + '/v3.2'
  };

  static endpoints = {
    idemia: {
      gipsrs: {
        healthcheck: '/gips/healthcheck',
        identities: '/gips/v1/identities',
        consent: '/gips/v1/identities/:identityId/consents'
      },
      gipsua: {
        healthcheck: '/gips/healthcheck',
        identities: '/gips/v1/identities'
      },
      webbio: {
        initLivenessSession: '/video-server/init-liveness-session',
        bioSessions: '/bioserver-app/v2/bio-sessions',
        livenessResult: '/liveness-challenge-result'
      }
    },
    plaid: {
      linkToken: '/link/token/create',
      tokenExchange: '/item/public_token/exchange',
      identities: '/identity/get'
    },
    onfido: {
      applicants: '/applicants',
      documents: '/documents',
      selfies: '/live_photos',
      checks: '/checks',
      reports: '/reports'
    }
  };

  static apiKeys = {
    idemia: {
      gipsrs: process.env.GIPSRS,
      gipsua: process.env.GIPSUA,
      webbio: process.env.WEBBIO
    },
    plaid: {
      clientId: process.env.PLAID_CLIENTID,
      secret: process.env.PLAID_SECRET
    },
    onfido: {
      token: process.env.ONFIDO_TOKEN
    }
  };

  static host(key) {
    return ApiConstants.hosts[key];
  }
}
