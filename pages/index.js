import React,{Component} from "react";
import Head from "next/head";
import "./styles/Main.scss";
import { connect } from 'react-redux'
import Counter from './components/counter'

// Components
import Navigation from './components/navigation/navigation';
import Banner from './components/banner/banner';
import TownNavigation from './components/town-nav/town-nav';
import Footer from './components/footer/footer';

class Index extends Component {
  render() {
    return (
      <section>
        <Head>
          <title>WeGhana Real Estate</title>
          <meta name="description" content="Ghana realt estate web platform" />
        </Head>
        <Navigation/>
        <Banner/>
        <TownNavigation/>
        <Footer/>
        <Counter/>
      </section>
    );
  }
}


export default connect()(Index);
