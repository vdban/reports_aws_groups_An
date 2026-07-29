const {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  ListUsersCommand,
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminAddUserToGroupCommand,
  AdminRemoveUserFromGroupCommand,
  AdminListGroupsForUserCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
} = require('@aws-sdk/client-cognito-identity-provider');
const { logToCloudWatch } = require('./logger');

const USER_POOL_ID = process.env.COGNITO_USER_POOL_ID || '';
const CLIENT_ID = process.env.COGNITO_CLIENT_ID || '';
const ENABLED = process.env.COGNITO_ENABLED === 'true' && USER_POOL_ID && CLIENT_ID;

function cognitoRegion() {
  if (process.env.COGNITO_REGION) return process.env.COGNITO_REGION;
  const match = USER_POOL_ID.match(/^([a-z0-9-]+)_/);
  return match ? match[1] : (process.env.AWS_REGION || 'ap-southeast-2');
}

let client = null;

function isEnabled() {
  return ENABLED;
}

function getClient() {
  if (!client) {
    client = new CognitoIdentityProviderClient({ region: cognitoRegion() });
  }
  return client;
}

function mapGroupsToRole(groups = []) {
  return groups.includes('admin') ? 'admin' : 'user';
}

function decodeJwtPayload(token) {
  const part = token.split('.')[1];
  return JSON.parse(Buffer.from(part, 'base64url').toString('utf8'));
}

function userFromIdToken(idToken) {
  const payload = decodeJwtPayload(idToken);
  const groups = payload['cognito:groups'] || [];
  const username = payload['cognito:username'] || payload.username || payload.sub;
  return {
    username,
    displayName: payload.name || username,
    role: mapGroupsToRole(groups),
  };
}

async function login(username, password) {
  const res = await getClient().send(new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: CLIENT_ID,
    AuthParameters: { USERNAME: username, PASSWORD: password },
  }));

  if (res.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
    const err = new Error('Tài khoản cần đổi mật khẩu lần đầu. Liên hệ admin.');
    err.code = 'NEW_PASSWORD_REQUIRED';
    throw err;
  }

  const result = res.AuthenticationResult;
  if (!result?.IdToken) {
    throw new Error('Đăng nhập thất bại');
  }

  return {
    token: result.IdToken,
    refreshToken: result.RefreshToken,
    user: userFromIdToken(result.IdToken),
  };
}

async function getUserGroups(username) {
  const res = await getClient().send(new AdminListGroupsForUserCommand({
    UserPoolId: USER_POOL_ID,
    Username: username,
  }));
  return (res.Groups || []).map((g) => g.GroupName);
}

async function listUsers() {
  const res = await getClient().send(new ListUsersCommand({ UserPoolId: USER_POOL_ID, Limit: 60 }));
  const users = [];
  for (const u of res.Users || []) {
    const uname = u.Username;
    const groups = await getUserGroups(uname);
    const nameAttr = u.Attributes?.find((a) => a.Name === 'name');
    users.push({
      username: uname,
      displayName: nameAttr?.Value || uname,
      role: mapGroupsToRole(groups),
      status: u.UserStatus,
    });
  }
  return users;
}

async function createUser({ username, password, displayName, role }) {
  await getClient().send(new AdminCreateUserCommand({
    UserPoolId: USER_POOL_ID,
    Username: username,
    MessageAction: 'SUPPRESS',
    UserAttributes: [{ Name: 'name', Value: displayName || username }],
  }));
  await getClient().send(new AdminSetUserPasswordCommand({
    UserPoolId: USER_POOL_ID,
    Username: username,
    Password: password,
    Permanent: true,
  }));
  const group = role === 'admin' ? 'admin' : 'user';
  await getClient().send(new AdminAddUserToGroupCommand({
    UserPoolId: USER_POOL_ID,
    Username: username,
    GroupName: group,
  }));
  await logToCloudWatch({ event: 'COGNITO_USER_CREATED', username, role: group });
}

async function deleteUser(username) {
  await getClient().send(new AdminDeleteUserCommand({
    UserPoolId: USER_POOL_ID,
    Username: username,
  }));
  await logToCloudWatch({ event: 'COGNITO_USER_DELETED', username });
}

async function updateUser(username, { displayName, password, role }) {
  if (displayName) {
    await getClient().send(new AdminUpdateUserAttributesCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      UserAttributes: [{ Name: 'name', Value: displayName }],
    }));
  }
  if (password && password.length >= 6) {
    await getClient().send(new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      Password: password,
      Permanent: true,
    }));
  }
  if (role === 'admin' || role === 'user') {
    for (const g of ['admin', 'user']) {
      try {
        await getClient().send(new AdminRemoveUserFromGroupCommand({
          UserPoolId: USER_POOL_ID,
          Username: username,
          GroupName: g,
        }));
      } catch (_) {}
    }
    await getClient().send(new AdminAddUserToGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: username,
      GroupName: role,
    }));
  }
}

async function setAdminPassword(username, password) {
  await getClient().send(new AdminSetUserPasswordCommand({
    UserPoolId: USER_POOL_ID,
    Username: username,
    Password: password,
    Permanent: true,
  }));
}

module.exports = {
  isEnabled,
  login,
  listUsers,
  createUser,
  deleteUser,
  updateUser,
  setAdminPassword,
  getUserGroups,
  mapGroupsToRole,
  userFromIdToken,
  decodeJwtPayload,
  USER_POOL_ID,
  CLIENT_ID,
};
