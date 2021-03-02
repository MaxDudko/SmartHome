export const getCodeURL = 'https://graph.api.smartthings.com/oauth/authorize'
export const getCodeParams = {
  response_type: 'code',
  client_id: process.env.OAuthClientID,
  scope: 'app',
  redirect_uri: `${process.env.NGROK}/smart-api/auth-token`,
}

export const getTokenURL = 'https://graph.api.smartthings.com/oauth/token'
export const getTokenParams = {
  grant_type: 'authorization_code',
  client_id: process.env.OAuthClientID,
  client_secret: process.env.OAuthClientSecret,
  redirect_uri: `${process.env.HOST}:${process.env.PORT}/smart-api/auth-token`,
}
