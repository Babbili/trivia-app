import Head from 'next/head'
import { useState, useRef } from 'react'
import Answer from '../components/Answer'
import Button from '../components/Button'
import Result from '../components/Result'
import styles from '../styles/Home.module.css'

export default function Home({ results }) {

  const [i, setI] = useState(0)
  const [title, setTitle] = useState('Welcome to the Trivia Challenge!')
  const [content, setContent] = useState('You will be presented with 10 True or False questions')
  const [subContent, setSubContent] = useState('Can you score 100% ?')
  const [cta, setCta] = useState('BEGIN')
  const selected = useRef()
  const [quizzes, setQuizzes] = useState([])

  // console.log('results', results)
  // console.log('i', i)
  // console.log('quizzes', quizzes)

  function handleClick() {
    if(i == results.length - 1) {
      setTitle(results[i].category)
      setContent(results[i].question)
      setSubContent(`${i + 1}/${results.length}`)
      setCta('Get Result')
      if(selected.current) {
        selected.current.value == results[i].correct_answer ? 
        setQuizzes(quizzes, quizzes.push([ results[i].question, results[i].correct_answer, selected.current.value, true, 1]))
        :
        setQuizzes( quizzes, quizzes.push([ results[i].question, results[i].correct_answer, selected.current.value, false, 0]))
      }
      setI(i+1)
    } else if(i == results.length) {
      let scoreArray = []
      for(let n=0; n< quizzes.length; n++) {
        scoreArray.push(quizzes[n][4])
      }
      let score = scoreArray.reduce((a,b) => {
        return a+b
      }, 0)
      setTitle(`You Scored ${score}/${results.length}`)
      setContent('')
      setSubContent('')
      setCta('PLAY AGAIN ?')
      setI(i+1);
    } else if(i == results.length +1) {
      console.log('the End')
    } else {
      setTitle(results[i].category)
      setContent(results[i].question)
      setSubContent(`${i + 1}/${results.length}`)
      setCta('Next')
      if(selected.current) {
        selected.current.value == results[i].correct_answer ? 
        setQuizzes(quizzes, quizzes.push([ results[i].question, results[i].correct_answer, selected.current.value, true, 1]))
        :
        setQuizzes( quizzes, quizzes.push([ results[i].question, results[i].correct_answer, selected.current.value, false, 0]))
      }
      setI(i+1)
    }
  }
  

  return (
    <div className={styles.container}>
      <Head>
        <title>My Awesome Trivia App</title>
        <meta name="description" content="Trivia next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} >
        <h1>{title}</h1>
        <div className={styles.quiz}>
          <p className={styles.question}>{content}</p>
          {
            i== results.length +1 ?
            <Result quizzes={quizzes} />
            : <></>
          }
          
          { i=== 0 || i === results.length +1 ?
          <></>
          : <Answer key={i} styles={styles} selected={selected} />
          }
        </div>
        <p>{subContent}</p>
        <Button handleClick={() => handleClick()} cta={cta} />
      </main>

    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
  const data = await res.json()
  const results = data.results

  return {
    props: { results }
  }
}