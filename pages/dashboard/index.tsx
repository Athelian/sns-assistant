import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type NextPage } from 'next'
import Link from 'next/link'

const Dashboard: NextPage = () => {
  return (
    <section className="gap-8 justify-around">
      <Link className="w-1/3 min-w-[260px]" href="/facebook">
        <FontAwesomeIcon
          className="text-[#3B5998] hover:text-gray-500"
          icon={faFacebook}
          size="10x"
        />
      </Link>
      <FontAwesomeIcon
        className="w-1/3 min-w-[260px] text-gray-500"
        icon={faTwitter}
        size="10x"
      />
    </section>
  )
}

export default Dashboard
