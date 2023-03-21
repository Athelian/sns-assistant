import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type NextPage } from 'next'
import Link from 'next/link'

const Dashboard: NextPage = () => {
  return (
    <section className="flex justify-center">
      <div className="flex gap-8 w-full justify-around px-7 max-w-[980px]">
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
      </div>
    </section>
  )
}

export default Dashboard
