import Link from "next/link";

export default () => {
  return (
    <section className="trioTabs">
      <Link href="#">
        <a className="trioTabs__tab">
          <h2>Create your advert</h2>
          <p>Post an add to sell or rent your property!</p>
        </a>
      </Link>
      <Link href="#">
        <a className="trioTabs__tab">
          <h2>Properties for sale</h2>
          <p>View all the properties listed for sale!</p>
        </a>
      </Link>
      <Link href="#">
        <a className="trioTabs__tab">
          <h2>Rental Properties</h2>
          <p>View all the rental properties listed!</p>
        </a>
      </Link>
    </section>
  );
};
