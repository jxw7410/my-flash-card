import React, {useEffect} from 'react';
import Styles from './question_page.module.css';


const QuestionPage = props => {
  useEffect(()=>{
    if (!props.topic.topicId) {
      props.fetchTopic(props.match.params.topicId);
    } else {
      // 
      console.log('to_do')
    }
  }, [])


  return (
    <div className={Styles.questionPageCtn}>
      <section className={Styles.sideNavCtn}>
        <div className={Styles.sideNav}>
          <section className={Styles.sideNavSec1}>
            {props.topic.type}
          </section>
          <section className={`${Styles.sideNavSec1} ${Styles.sideNavSec2}`}>
            {props.topic.name}
          </section>
        </div>
      </section>
      <section>

      </section>
    </div>
  )
}

export default QuestionPage;