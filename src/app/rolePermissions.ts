/* eslint-disable import/prefer-default-export */

export const rolePermissions = {
  'super-admin': {
    editProfileSettings: true,
    editGeneralSettings: true,
    editPrivacyPolicySettings: true,
    editTermsSettings: true,
    editFAQSettings: true,
    editContactInfoSettings: true,
    editScreenAppSettings: true,
    resetUserPassword: true,
    screenAppIntegration: true,
  },
  admin: {
    editProfileSettings: true,
    editGeneralSettings: false,
    editPrivacyPolicySettings: false,
    editTermsSettings: false,
    editFAQSettings: false,
    editContactInfoSettings: false,
    editScreenAppSettings: false,
    resetUserPassword: false,
    screenAppIntegration: false,
  },
  participant: {
    editProfileSettings: true,
    editGeneralSettings: false,
    editPrivacyPolicySettings: false,
    editTermsSettings: false,
    editFAQSettings: false,
    editContactInfoSettings: false,
    editScreenAppSettings: false,
    resetUserPassword: false,
    screenAppIntegration: false,
  },
};
