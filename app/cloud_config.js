/** Public Supabase configuration shared by Windows and Android. No secrets.
 * Set projectUrl and publishableKey here for a distribution, or in account settings
 * on each device. DNDCloudConfig is read by cloud_sync.js; guest mode needs neither.
 */
window.DNDCloudConfig = {
  projectUrl: 'https://rrjqxbfgwsjhgshajnob.supabase.co',
  publishableKey: 'sb_publishable_tEMVCTm-Pzd7lG6iGUPcjw_yGw9LcsD'
};

// Cloud test distributions receive their own web updates. Production stable
// manifests are never used as a fallback for this channel.
window.DND_UPDATE_MANIFEST_URL = 'https://raw.githubusercontent.com/waitermisanthrope-creator/DnD-VTT/feature/cloud-character-sync/updates/cloud-test.json';
window.DND_UPDATE_CHANNEL = 'beta';
