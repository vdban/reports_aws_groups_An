const jwt = require('jsonwebtoken');
const { CognitoJwtVerifier } = require('aws-jwt-verify');
const cognito = require('./cognito');

function buildCognitoVerifier() {
  if (!cognito.isEnabled()) return null;
  return CognitoJwtVerifier.create({
    userPoolId: cognito.USER_POOL_ID,
    tokenUse: 'id',
    clientId: cognito.CLIENT_ID,
  });
}

function userFromCognitoPayload(payload) {
  const groups = payload['cognito:groups'] || [];
  const username = payload['cognito:username'] || payload.username || payload.sub;
  return {
    username,
    displayName: payload.name || username,
    role: cognito.mapGroupsToRole(groups),
  };
}

function createAuthMiddleware(jwtSecret) {
  const cognitoVerifier = buildCognitoVerifier();

  return async function authMiddleware(req, res, next) {
    try {
      const header = req.headers.authorization;
      if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      const token = header.slice(7);

      if (cognitoVerifier) {
        const payload = await cognitoVerifier.verify(token);
        req.user = userFromCognitoPayload(payload);
        return next();
      }

      req.user = jwt.verify(token, jwtSecret);
      return next();
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
}

function createOptionalAuth(jwtSecret) {
  const cognitoVerifier = buildCognitoVerifier();

  return async function optionalAuth(req, _res, next) {
    const header = req.headers.authorization;
    const queryToken = req.query.token;
    const token = header?.startsWith('Bearer ') ? header.slice(7) : queryToken;

    if (token && cognitoVerifier) {
      try {
        const payload = await cognitoVerifier.verify(token);
        req.user = userFromCognitoPayload(payload);
      } catch (_) {}
    } else if (token) {
      try { req.user = jwt.verify(token, jwtSecret); } catch (_) {}
    }
    next();
  };
}

module.exports = { createAuthMiddleware, createOptionalAuth, userFromCognitoPayload };
