import React from 'react'
import classes from './StepItem.module.css'
import classNames from 'classnames'

const StepItem = ({stepsList, stepsWidth}) => {
    const cx = classNames.bind(classes);

    return (
        stepsList.length > 0 &&
        stepsList.map((step, index) => {
            let className = cx({
                [classes.done]: step.state === 'done',
                [classes.active]: step.state === 'active'
            });
            return (
                <li
                    className={className}
                    key={`${index}_${step.id}`}
                    style={{width: `${stepsWidth}%`}}>
                    <span className={classes.name}>{step.title}</span>
                    <span className={classes.step}>&nbsp;</span>
                </li>
            )
        })
    )
}

export default StepItem
