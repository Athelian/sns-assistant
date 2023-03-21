import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type NextPage } from 'next'
import Link from 'next/link'

const Dashboard: NextPage = () => {
  return (
    <section className="gap-8 w-full justify-around py-7">
      <Link className="w-1/3 min-w-[260px]" href="/facebook">
        <FontAwesomeIcon
          className="text-[#3B5998] hover:text-gray-500"
          icon={faFacebook}
        />
      </Link>
      <FontAwesomeIcon
        className="w-1/3 min-w-[260px] text-gray-500"
        icon={faTwitter}
      />
    </section>
  )
}

export default Dashboard
