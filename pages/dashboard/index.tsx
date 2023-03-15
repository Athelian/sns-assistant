import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type NextPage } from 'next'
import Link from 'next/link'

const Dashboard: NextPage = () => {
  return (
    <div className="flex justify-center gap-64">
      <Link href="/facebook">
        <FontAwesomeIcon color="#3B5998" icon={faFacebook} size="10x" />
      </Link>
      <FontAwesomeIcon color="gray" icon={faTwitter} size="10x" />
    </div>
  )
}

export default Dashboard
