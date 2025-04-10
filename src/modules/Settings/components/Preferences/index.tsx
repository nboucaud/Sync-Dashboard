import timezones from "timezones-list";
import currencyCodes from "currency-codes";
import Select from "react-select";
import styles from "./styles.module.scss";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { useUser } from "../../../../hooks/useUser";
import { Loader } from "../../../../components";
import { usePreferences } from "./hooks/usePreferences";
import { useMemo, useState } from "react";

export interface PreferenceType {
  time_zone: string | null;
  currency: string | null;
  in_person_payments: boolean;
  ai_voice_agent: boolean;
  online_payments: boolean;
}

export const Preferences = () => {
  const { profile, isLoading } = useUser();
  const { mutateAsync, isPending } = usePreferences();

  const [preferences, setPreferences] = useState<PreferenceType>({
    time_zone: profile?.time_zone || null,
    currency: profile?.currency || null,
    in_person_payments: profile?.in_person_payments || false,
    ai_voice_agent: profile?.ai_voice_agent || false,
    online_payments: profile?.online_payments || false,
  });

  const timeZoneDropdownOptions = useMemo(
    () => timezones.map((timezone) => ({ label: timezone.label, value: timezone.tzCode })),
    []
  );

  const currencyDropdownOptions = useMemo(
    () =>
      currencyCodes.data.map((currency) => ({
        label: `${currency.currency} (${currency.code})`,
        value: currency.code,
      })),
    []
  );

  if (isLoading) return <Loader />;
  if (!profile) return null;

  const defaultSelectedCurrency = currencyDropdownOptions.find((option) => option.value === preferences.currency);
  const defaultSelectedTimezone = timeZoneDropdownOptions.find((option) => option.value === preferences.time_zone);

  const handleSavePreference = () => mutateAsync(preferences);
  return (
    <div className={styles.PreferencesContainer}>
      <div className={styles.dropdownContainer}>
        <div>
          <label htmlFor="timezone">Time zone</label>
          <Select
            isDisabled={isPending}
            defaultValue={defaultSelectedTimezone}
            name="timezone"
            options={timeZoneDropdownOptions}
            onChange={(value) => setPreferences((curr) => ({ ...curr, time_zone: value?.value || "" }))}
          />
        </div>

        <div>
          <label htmlFor="currency">Currency</label>
          <Select
            isDisabled={isPending}
            defaultValue={defaultSelectedCurrency}
            options={currencyDropdownOptions}
            onChange={(value) => setPreferences((curr) => ({ ...curr, currency: value?.value || "" }))}
          />
        </div>
      </div>

      <div className={styles.Preferences}>
        <span className={styles.title}>Preferences</span>

        <div className={styles.flex}>
          <div>
            <Toggle
              disabled={isPending}
              icons={false}
              defaultChecked={preferences.in_person_payments}
              onChange={(event) => setPreferences((curr) => ({ ...curr, in_person_payments: event.target.checked }))}
            />
            <span>In-person payments</span>
          </div>

          <div>
            <Toggle
              disabled={isPending}
              icons={false}
              defaultChecked={preferences.online_payments}
              onChange={(event) => setPreferences((curr) => ({ ...curr, online_payments: event.target.checked }))}
            />
            <span>Online payments</span>
          </div>

          <div>
            <Toggle
              disabled={isPending}
              icons={false}
              defaultChecked={preferences.ai_voice_agent}
              onChange={(event) => setPreferences((curr) => ({ ...curr, ai_voice_agent: event.target.checked }))}
            />
            <span>AI voice agent</span>
          </div>
        </div>
      </div>

      <button className={styles.saveBtn} disabled={isPending} onClick={handleSavePreference}>
        {isPending ? "Saving.." : "Save"}
      </button>
    </div>
  );
};
