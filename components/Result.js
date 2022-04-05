import React from 'react'

function Result({ quizzes }) {



    console.log('Results quizzes', quizzes)
    return(
        <div>
            {
                quizzes.map(quiz => {
                    return(
                        <div key={quizzes.indexOf(quiz)} className={ quiz[3] ? 'correct' : 'incorrect'}>
                            {
                                quiz[3] ?
                                <div className='quizSVG'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='hsl(160, 80%, 50%)'><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg>
                                    <p>You answered: {quiz[2]}</p>
                                </div>
                                :
                                <div className='quizSVG'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill='hsl(0, 80%, 50%'><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.207 12.793-1.414 1.414L12 13.414l-2.793 2.793-1.414-1.414L10.586 12 7.793 9.207l1.414-1.414L12 10.586l2.793-2.793 1.414 1.414L13.414 12l2.793 2.793z"></path></svg>
                                    <p>You answered: {quiz[2]}</p>
                                </div>
                            }
                            <p>{quiz[0]}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Result