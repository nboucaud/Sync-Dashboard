import { useSecurity } from "./hooks/useSecurity";

export const Security = () => {
  useSecurity();
  return (
    <div>
      <span>Change Password</span>

      <div>
        <label htmlFor="current_password">Current password</label>
        <input type="password" />
      </div>

      <div>
        <label htmlFor="new_password">New Password</label>
        <input type="password" />
      </div>

      <button>Save</button>
    </div>
  );
};
