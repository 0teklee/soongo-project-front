import styles from './ThemaCategoryStep.module.scss';

const Step = ({ question, onChange, questNum }) => {
  const quest = question;
  if (quest === undefined) return true;
  return (
    <div className={styles.step1_container}>
      <div className={styles.small_headline}>{quest.description}</div>
      {quest.choiceQuestions.map((choice, index) => {
        return (
          <div
            className={styles.radio_div}
            key={index + Number(quest.question_number) * 10}
          >
            <input
              type="radio"
              name={quest.question_number}
              value={choice.id}
              onChange={e => onChange(e)}
              defaultChecked={
                choice.id === Number(questNum[quest.question_number])
              }
            />
            <label htmlFor="label">{choice.description}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Step;
