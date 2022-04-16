import React, { useEffect, useState } from 'react';
import { BsXLg, BsList, BsArrowReturnRight } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { AiFillCheckSquare } from 'react-icons/ai';
import { SERVER_PORT } from '../../config';

import styles from './MasterCategoryModal.module.scss';

const MasterCategoryModal = props => {
  const { isModalVisible, setIsModalVisible, useCategories, setUseCategories } =
    props;
  const [useChecked, setUseChecked] = useState(useCategories);
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch(SERVER_PORT + '/category')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { categories } = data;
        setDatas(categories);
      });
  }, []);

  function handleCancleModal() {
    setIsModalVisible(false);
    handleCloseDetails();
  }

  function handleCloseDetails() {
    const details = document.querySelectorAll('details');
    details.forEach(detail => {
      detail.removeAttribute('open');
    });
  }

  function handleClickLesson(lesson) {
    let checkedId = useChecked.map(checked => checked.id);

    if (checkedId.includes(lesson.id)) {
      let setArr = useChecked.filter(item => {
        return item.id !== lesson.id;
      });
      setUseChecked(setArr);
    } else {
      setUseChecked([...useChecked, lesson]);
    }
  }
  function handleClickInsert() {
    setUseCategories(useChecked);
    setIsModalVisible(false);
    handleCloseDetails();
  }

  return (
    <div
      className={`${styles.modalMain} ${isModalVisible && styles.modalVisible}`}
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
          <BsList size="24px" />
          <h4>서비스 선택</h4>
        </div>
        <div className={styles.modalContent}>
          <div className={styles.modalList}>
            <ul>
              {datas.map(category => {
                return (
                  <li key={category.id}>
                    <details>
                      <summary>
                        <span>{category.name}</span>
                        <IoIosArrowDown size="24px" color="#bfbfbf" />
                      </summary>
                      {category.lessonCategories.map(lesson => {
                        let checkedId = useChecked.map(checked => checked.id);
                        let isChecked = checkedId.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() =>
                              handleClickLesson({
                                id: lesson.id,
                                name: lesson.name,
                              })
                            }
                          >
                            <span>
                              <BsArrowReturnRight color="#796c6c70" />
                              <span>{lesson.name}</span>
                            </span>
                            <AiFillCheckSquare
                              size="20px"
                              color="#796c6c70"
                              className={isChecked ? styles.checkedIcon : ''}
                            />
                          </div>
                        );
                      })}
                    </details>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={styles.ModalFooterBtn} onClick={handleClickInsert}>
          <span>{useChecked.length}개 서비스 추가하기</span>
        </div>
      </div>
    </div>
  );
};

export default MasterCategoryModal;
