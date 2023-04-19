import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'

const useTimeDifference = (givenDateTimeString: string) => {
  const [timeDiff, setTimeDiff] = useState('')

  useEffect(() => {
    // calculating the difference between the time a job was created and the current time
    const updateTimer = setInterval(() => {
      const givenDateTime = DateTime.fromISO(givenDateTimeString)
      const now = DateTime.local()

      const diff = now.diff(givenDateTime, ['days', 'hours', 'minutes'])

      const formattedDiff = () => {
        if (diff.days >= 1) {
          return `${Math.floor(diff.days)} day(s)`
        } else if (diff.hours >= 1) {
          return `${Math.floor(diff.hours)} hour(s)`
        } else {
          return `${Math.floor(diff.minutes)} minute(s)`
        }
      }

      setTimeDiff(formattedDiff())
    }, 1000)

    return () => clearInterval(updateTimer)
  }, [givenDateTimeString])

  return timeDiff
}

export default useTimeDifference
