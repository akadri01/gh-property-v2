
import createFooterLink from '../../helpers/client/createFooterLink';
const towns = ['Accra', 'Kumasi', 'Sekondi', 'Sunyani', 'Tamale', 'Takoradi', 'Obuasi', 'Tema', 'Ashaiman', 'Cape Coast' ];

export default () => {
  return (
    <section className="footer mobile-desktop-frame">
      <h1>View properties by location in Ghana</h1>
      <div className="footer__top">
        {towns.map(link => {
          return createFooterLink(link)
        })}
      </div>
      <div className="footer__middle"></div>
      <div className="footer__bottom"></div>
    </section>
  )
}