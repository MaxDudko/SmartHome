export const getCodeEndpoint = '/oauth/authorize'
export const getCodeParams = {
  response_type: 'code',
  client_id: process.env.OAuthClientID,
  scope: 'app',
  redirect_uri: `${process.env.NGROK}/api/v1/smart-api/auth-token`,
}

export const getTokenEndpoint = '/oauth/token'
export const getTokenParams = {
  grant_type: 'authorization_code',
  client_id: process.env.OAuthClientID,
  client_secret: process.env.OAuthClientSecret,
  redirect_uri: `${process.env.NGROK}/api/v1/smart-api/auth-token`,
}
