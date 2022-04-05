import Head from 'next/head'
import { useState, useRef } from 'react'
import Answer from '../components/Answer'
import Button from '../components/Button'
import styles from '../styles/Home.module.css'

export default function Home({ results }) {

  const [i, setI] = useState(0)
  const [title, setTitle] = useState('Welcome to the Trivia Challenge!')
  const [content, setContent] = useState('You will be presented with 10 True or False questions')
  const [subContent, setSubContent] = useState('Can you score 100% ?')
  const [cta, setCta] = useState('BEGIN')
  const selected = useRef()
  const quizzes = []

  // console.log('results', results)
  // console.log('i', i)
  function handleClick() {
    if(i == results.length - 1) {
      setTitle(results[i].category)
      setContent(results[i].question)
      setSubContent(`${i + 1}/${results.length}`)
      setCta('Get Result')
      setI(i+1)
    } else if(i == results.length) {
      setCta('PLAY AGAIN ?')
      setI(0);
    } else {
      setTitle(results[i].category)
      setContent(results[i].question)
      setSubContent(`${i + 1}/${results.length}`)
      setCta('Next')
      if(selected.current) {
        
        console.log('selected', selected.current.value)
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
          { i === 0 || i === results.length +1 ?
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