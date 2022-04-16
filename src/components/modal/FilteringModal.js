import React, { useState, useEffect } from 'react';
import styles from './FilteringModal.module.scss';
import { BsXLg, BsList, BsSearch, BsArrowReturnRight } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { GoLocation } from 'react-icons/go';

import FilteringModalSearch from './FilteringModalSearch';
import { SERVER_PORT } from '../../config';

const FilteringModal = props => {
  const { isModalVisible, setIsModalVisible, setUseFilter, path } = props;
  const [datas, setDatas] = useState([]);
  const [useInputText, setUseInputText] = useState('');
  const isAddressType = isModalVisible.type === 'address';

  useEffect(() => {
    const urlName = isAddressType ? '/address' : '/category';
    fetch(SERVER_PORT + urlName)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (isAddressType) {
          const { address } = data;
          setDatas(address);
        } else {
          const { categories } = data;
          setDatas(categories);
        }
      });
  }, [isAddressType]);

  function handleCancleModal() {
    setIsModalVisible(false);
    handleCloseDetails();
  }

  function handleClickLesson(lesson) {
    if (useInputText !== '') {
      setUseInputText('');
    }
    setUseFilter(lesson);
    setIsModalVisible(false);
    handleCloseDetails();
  }

  function handleChangeInput(e) {
    setUseInputText(e.target.value);
  }

  function handleCilckAddress(address) {
    setUseFilter(address);
    setIsModalVisible(false);
    handleCloseDetails();
  }

  function handleCloseDetails() {
    const details = document.querySelectorAll('details');
    details.forEach(detail => {
      detail.removeAttribute('open');
    });
  }

  return (
    <div
      className={`${styles.modalMain} ${
        isModalVisible.visible && styles.modalVisible
      }`}
    >
      <div className={styles.modalWrapper}>
        <div className={styles.modalCloseBtn}>
          <BsXLg
            color="#bfbfbf"
            size="18px"
            style={{ cursor: 'pointer' }}
            onClick={handleCancleModal}
          />
        </div>
        <div className={styles.modalHeader}>
          {isAddressType ? (
            <>
              <GoLocation size="24px" />
              <h4>지역 선택</h4>
            </>
          ) : (
            <>
              <BsList size="24px" />
              <h4>서비스 선택</h4>
            </>
          )}
        </div>
        <div className={styles.modalContent}>
          {!isAddressType && (
            <div className={styles.modalSearch}>
              <BsSearch />
              <input
                type="text"
                value={useInputText}
                onChange={handleChangeInput}
                placeholder="어떤 분야의 전문가를 찾으시나요?"
              />
            </div>
          )}
          {isAddressType ? (
            <div className={styles.modalList}>
              <ul>
                {!path && (
                  <li onClick={() => handleCilckAddress(null)}>
                    <details>
                      <summary>
                        <span>전국</span>
                      </summary>
                    </details>
                  </li>
                )}
                {datas.map(address => {
                  return (
                    <li key={address.id}>
                      <details>
                        <summary>
                          <span>{address.name}</span>
                          <IoIosArrowDown size="24px" color="#bfbfbf" />
                        </summary>
                        {address.detailAddress.map(detail => {
                          return (
                            <div
                              key={detail.id}
                              onClick={() =>
                                handleCilckAddress({
                                  id: address.id,
                                  name: address.name,
                                  details: { id: detail.id, name: detail.name },
                                })
                              }
                            >
                              <BsArrowReturnRight color="#bfbfbf" />
                              <span>{detail.name}</span>
                            </div>
                          );
                        })}
                      </details>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className={styles.modalList}>
              {useInputText === '' ? (
                <ul>
                  <li onClick={() => handleClickLesson(null)}>
                    <details>
                      <summary>
                        <span>서비스 전체</span>
                      </summary>
                    </details>
                  </li>
                  {datas.map(category => {
                    return (
                      <li key={category.id}>
                        <details>
                          <summary>
                            <span>{category.name}</span>
                            <IoIosArrowDown size="24px" color="#bfbfbf" />
                          </summary>
                          {category.lessonCategories.map(lesson => {
                            return (
                              <div
                                key={lesson.id}
                                onClick={() =>
                                  handleClickLesson({
                                    id: category.id,
                                    name: category.name,
                                    lessons: {
                                      id: lesson.id,
                                      name: lesson.name,
                                    },
                                  })
                                }
                              >
                                <BsArrowReturnRight color="#bfbfbf" />
                                <span>{lesson.name}</span>
                              </div>
                            );
                          })}
                        </details>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <FilteringModalSearch
                  useInputText={useInputText}
                  setUseInputText={setUseInputText}
                  datas={datas}
                  handleClickLesson={handleClickLesson}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteringModal;
