import { useState } from "react";
import { ActiveTabs, EditProfile, Preferences, Security } from "./components";
import { SETTINGS_TABS } from "./utils";
import styles from "./styles.module.scss";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SETTINGS_TABS>(SETTINGS_TABS.EditProfile);

  const handleSetActiveTab = (tab: SETTINGS_TABS) => setActiveTab(tab);
  return (
    <div className={styles.Settings}>
      <ActiveTabs activeTab={activeTab} onSelectActiveTab={handleSetActiveTab} />
      {activeTab === SETTINGS_TABS.EditProfile && <EditProfile />}
      {activeTab === SETTINGS_TABS.Preferences && <Preferences />}
      {activeTab === SETTINGS_TABS.Security && <Security />}
    </div>
  );
};

export default Settings;
