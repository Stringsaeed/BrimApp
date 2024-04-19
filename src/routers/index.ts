//   type StaticRoutes = `/` | `/(app)/` | `/(app)` | `/(app)/notes/archived` | `/notes/archived` | `/(app)/notes/trashed` | `/notes/trashed` | `/(app)/user/account-info` | `/user/account-info` | `/(app)/user/preferences` | `/user/preferences` | `/(app)/user/profile` | `/user/profile`;

export enum Routes {
  Login = "/auth/login",
  Verify = "/auth/verify",
  Dashboard = "/(app)",
  Note = "/(app)/notes",
  Archive = "/(app)/notes/archived",
  Trash = "/(app)/notes/trashed",
  Profile = "/(app)/user/profile",
  AccountInfo = "/(app)/user/account-info",
  Preferences = "/(app)/user/preferences",
}
