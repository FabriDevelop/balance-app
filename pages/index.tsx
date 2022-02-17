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
        className="container -m-24 mx-auto flex h-screen max-w-5xl flex-col 
              items-center justify-center gap-16 md:flex-row"
      >
        <MovementForm />
        <BalanceInfo />
      </motion.main>
    </>
  )
}

Home.requireAuth = true
