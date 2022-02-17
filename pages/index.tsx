import Head from 'next/head'
import MovementForm from '../components/MovementForm'
import BalanceInfo from '../components/BalanceInfo'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <>
      <Head>
        <title>Balance</title>
      </Head>
      <motion.main
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="container mx-auto mt-10 flex
              max-w-5xl flex-col-reverse items-center justify-center gap-3 md:flex-row md:gap-16"
      >
        <MovementForm />
        <BalanceInfo />
      </motion.main>
    </>
  )
}

Home.requireAuth = true
