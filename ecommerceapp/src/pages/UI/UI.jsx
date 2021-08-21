import { React } from 'react';
import Layout from '../../components/Layout/Layout';
import Products from '../../components/Shop/Product/Products';

const UI = () => {

  return (
    <>
      {
            <Layout>
              <Products />
            </Layout>
      }
    </>
  )
}

export default UI
