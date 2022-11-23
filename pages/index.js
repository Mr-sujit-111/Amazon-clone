import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import ProductList from '../components/ProductList'
import { motion } from "framer-motion"

export default function Home({ allProduct }) {
  return (
    <div className="bg-gray-200">
      <Head>
        <title>Amazon-clone</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="sticky top-0 z-40">
        <Header />
      </header>
      <motion.div
        exit={{ opacity: 0 }}
      >
        <main className="max-w-screen-2x1 mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Banner />

          </motion.div>

          <ProductList products={allProduct} />
        </main>
      </motion.div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const allProduct = await fetch('https://fakestoreapi.com/products')
    .then(response => response.json());
  return {
    props: {
      allProduct
    },
  }
}
