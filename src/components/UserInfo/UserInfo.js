import React from "react";
import styles from "./UserInfo.module.css";

function UserInfo({ data }) {
  return (
    <div className={styles.userInfoWrapper}>
      <div>
        Выбран пользователь <b>{`${data.firstName} ${data.lastName}`}</b>
      </div>
      {data?.description ? (
        <>
          <div>Описание</div>
          <div>
            <textarea readOnly className={styles.userInfoTextarea} value={data.description}></textarea>
          </div>{" "}
        </>
      ) : null}
      {data?.address ? (
        <>
          <div>
            Адрес проживания: <b>{data.address.streetAddress}</b>
          </div>
          <div>
            Город: <b>{data.address.city}</b>
          </div>
          <div>
            Провинция/штат: <b>{data.address.state}</b>
          </div>
          <div>
            Индекс: <b>{data.address.zip}</b>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default UserInfo;
