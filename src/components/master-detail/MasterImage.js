import React, { useState } from 'react';
import styles from './MasterImage.module.scss';

function MasterImage(props) {
  const { master, masterMedia, master_post } = props;

  return (
    <div>
      <h2 ref={masterMedia}>사진/동영상</h2>
      <div className={styles.masterImage}>
        {!master_post
          ? null
          : master_post.map((image, i) => {
              return (
                <div className={styles.imageContainer} key={i}>
                  <div className={styles.imageWrapper}>
                    <img src={image} alt={master.name} />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default MasterImage;
