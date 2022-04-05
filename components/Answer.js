import React from 'react'

function Answer({ styles, selected }) {

    // const selected = useRef()

    return(
        <select className={styles.answer} ref={selected} required>
            <option value=''>Choose an answer</option>
            <option value='True'>True</option>
            <option value='False'>False</option>
        </select>
    )
}
export default Answer