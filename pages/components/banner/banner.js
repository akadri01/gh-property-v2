import {Component} from 'react';
import { Picture } from "react-responsive-picture";
import Link from "next/link";
import {ALGOLIA_API_KEY,ALGOLIA_APP_ID} from '../../../config.js';
import {InstantSearch, SearchBox, Hits, Highlight,Stats} from 'react-instantsearch/dom';

const Hit = ({hit}) => {
  return (
    <div className="searched">
      <Link href={`/properties/latest?${hit.type}=${hit.value}&advert_type=sale`}>
        <a>
          <Highlight attribute="text" hit={hit}/>  
          <small>For Sale</small>
        </a>
      </Link>
      <Link href={`/properties/latest?${hit.type}=${hit.value}&advert_type=rent`}>
        <a>
          <Highlight attribute="text" hit={hit}/>  
          <small>To Rent</small>
        </a>
      </Link>
    </div>
  )
}

export default class Angolia extends Component {
  componentDidMount() {
    function guideToSearchResults() {
      console.log('before')
      // setTimeout(()=>{
      //   console.log('after')
      // },5000)
    }
    document.querySelector('.ais-SearchBox-input').addEventListener('focus', ()=> document.querySelector('.ais-Hits').style.display = 'block');
    document.querySelector('.ais-SearchBox-submit').addEventListener('click', function() {
      if (!this.classList.contains('active-button-msg')) {
        this.classList.add('active-button-msg');
      }
    })

  }
  render(){ 
    return(
      <section className="banner">
        <Picture
          sources={[
            {
              srcSet: "/static/images/photos/banner-tablet.jpg",
              media: "(max-width: 890px)"
            },
            {
              srcSet: "/static/images/photos/banner-desktop.jpg",
              type: "image/jpg"
            }
          ]}
          style={{ width: "100%" }}
          alt="Search for property in Ghana"
        />
        <div className="banner__overlay">
          <InstantSearch
            apiKey={ALGOLIA_API_KEY}
            appId={ALGOLIA_APP_ID}
            indexName="towns-regions"
          >
           <h2>Search for property in Ghana</h2>
           <SearchBox translations={{placeholder: 'Search for location...'}}/>
           <Stats/>
           <Hits hitComponent={Hit}/>
           <style>{`
            .searched em {
              font-weight: 900;
            }
            `}</style>
          </InstantSearch>
        </div>
      </section>
    )
  }
} 

