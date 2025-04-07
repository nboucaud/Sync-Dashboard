import { SETTINGS_TABS } from "../../utils";
import styles from "./styles.module.scss";

type ActiveTabsProps = {
  activeTab: SETTINGS_TABS;
  onSelectActiveTab: (value: SETTINGS_TABS) => void;
};

export const ActiveTabs = ({ activeTab, onSelectActiveTab }: ActiveTabsProps) => {
  return (
    <div className={styles.tabsContainer}>
      <div
        className={activeTab === SETTINGS_TABS.EditProfile ? styles.activeTab : ""}
        onClick={() => onSelectActiveTab(SETTINGS_TABS.EditProfile)}
      >
        Edit Profile
      </div>
      <div
        className={activeTab === SETTINGS_TABS.Preferences ? styles.activeTab : ""}
        onClick={() => onSelectActiveTab(SETTINGS_TABS.Preferences)}
      >
        Preferences
      </div>
      <div
        className={activeTab === SETTINGS_TABS.Security ? styles.activeTab : ""}
        onClick={() => onSelectActiveTab(SETTINGS_TABS.Security)}
      >
        Security
      </div>
    </div>
  );
};
