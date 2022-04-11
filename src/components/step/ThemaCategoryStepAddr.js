import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './ThemaCategoryStep.module.scss';

const StepAddr = ({ onChange, questNum }) => {
  const [addrData, setAddrData] = useState([]);
  const [firstOption, setFirstOption] = useState(0);
  const [secondOption, setSecondOption] = useState(0);

  useEffect(() => {
    //fetch('http://localhost:3000/data/hwseol/address.json', {
    fetch('/address', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setAddrData(data);
      });
  }, []);

  useEffect(() => {
    if (questNum.address2) {
      setFirstOption(Number(questNum.address1));
    }
  }, [questNum.address1, questNum.address2]);

  const onChangeOption = e => {
    setFirstOption(e.target.value);
  };
  const onChangeOption2 = e => {
    setSecondOption(e.target.value);
  };
  return (
    <div className={styles.step1_container}>
      <div className={styles.small_headline}>레슨 희망지역을 선택해 주세요</div>
      <div className={styles.select_div} onChange={onChange}>
        <select
          name="address1"
          onChange={onChangeOption}
          className={styles.select_box}
          value={questNum.address1 ? Number(questNum.address1) : 0}
        >
          <option value={0}>시/도</option>
          {addrData.length !== 0
            ? addrData.address.map((addr, index) => (
                <option value={addr.id} key={index}>
                  {addr.name}
                </option>
              ))
            : null}
        </select>
        <select
          name="address2"
          className={styles.select_box}
          onChange={onChangeOption2}
          value={questNum.address2 ? Number(questNum.address2) : 0}
        >
          <option value={0}>시/군/구</option>
          {addrData.length !== 0 && Number(firstOption) !== 0
            ? addrData.address[firstOption - 1].detailAddress.map(
                (addr, index) => (
                  <option value={addr.id} key={index}>
                    {addr.name}
                  </option>
                )
              )
            : null}
        </select>
      </div>
    </div>
  );
};

export default StepAddr;
