import { useMemo } from "react";
import { FaUser } from "react-icons/fa";
import countryList from "react-select-country-list";
import Select from "react-select";

import { useUser } from "../../../../hooks/useUser";
import styles from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useEditProfile } from "./hooks/useEditProfile";

export const EditProfile = () => {
  const { profile, user } = useUser();
  const { register, handleSubmit, setValue } = useForm();
  const { editProfileMutation } = useEditProfile();
  const options = useMemo(() => countryList().getData(), []);

  if (!user || !profile) return null;
  const matchingCountryResult = options.find((result) => result.value === profile.country);
  return (
    <div className={styles.EditProfile}>
      <div className={styles.profilePic}>{profile?.avatar ? <img src={profile.avatar} /> : <FaUser color="#718EBF" />}</div>
      <form onSubmit={handleSubmit((data) => editProfileMutation(data))}>
        <div className={styles.inputWrapper}>
          <label htmlFor="business_name">Business Name</label>
          <input type="text" {...register("full_name", { required: true, value: profile.full_name })} />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="phone_number">Phone Number</label>
          <input type="text" {...register("phone_number", { value: profile.phone_number })} />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="business_address">Business Address</label>
          <input type="text" {...register("business_address", { value: profile.business_address })} />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="postal_code">Postal Code</label>
          <input type="number" {...register("postal_code", { value: profile.postal_code })} />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="bio" {...register("bio", { value: profile.bio })}>
            Bio
          </label>
          <textarea {...register("bio", { value: profile.bio })}></textarea>
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email", { required: true, value: user.email })} />
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="city">City</label>
          <input type="text" {...register("city", { value: profile.city })} />
        </div>

        <div className={styles.inputWrapper}>
          <label>Country</label>
          <Select options={options} onChange={(e) => setValue("country", e?.value)} defaultValue={matchingCountryResult} />
        </div>

        <button className={styles.submitBtn}>Submit</button>
      </form>
    </div>
  );
};
