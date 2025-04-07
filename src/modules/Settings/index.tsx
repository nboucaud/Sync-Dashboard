import { useState } from "react";
import { ActiveTabs, EditProfile } from "./components";
import { SETTINGS_TABS } from "./utils";
import styles from "./styles.module.scss";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<SETTINGS_TABS>(SETTINGS_TABS.EditProfile);

  const handleSetActiveTab = (tab: SETTINGS_TABS) => setActiveTab(tab);
  return (
    <div className={styles.Settings}>
      <ActiveTabs activeTab={activeTab} onSelectActiveTab={handleSetActiveTab} />
      {activeTab === SETTINGS_TABS.EditProfile && <EditProfile />}
    </div>
  );
};

export default Settings;
