import Head from "next/head";
import "./styles/Main.scss";
import Navigation from "./components/navigation/navigation";
import Footer from "./components/footer/footer";

export default () => {
  return (
    <section>
      <Head>
        <title>WeGhana Autotrader</title>
        <meta name="description" content="Ghana auto trading web platform" />
      </Head>
      <Navigation />
      <div className="static">
        <h2>About WeGhana Auto Trader</h2>
        <p>
          Efficiently streamline intermandated metrics after impactful
          deliverables. Quickly scale bricks-and-clicks experiences via
          efficient value. Credibly create empowered web-readiness for backend
          services. Interactively network customized solutions whereas front-end
          quality vectors. Distinctively create next-generation vortals after
          market-driven value.
        </p>
        <p>
          Professionally communicate professional vortals rather than front-end
          models. Credibly facilitate cost effective users and impactful testing
          procedures. Dynamically integrate customer directed strategic theme
          areas with B2B experiences. Efficiently customize 2.0 outsourcing via
          effective mindshare. Continually reconceptualize proactive internal or
          "organic" sources vis-a-vis leading-edge opportunities.
        </p>
        <p>
          Competently orchestrate world-class ideas via 24/7 materials.
          Compellingly impact equity invested strategic theme areas through
          sustainable outsourcing. Collaboratively fashion enabled.
        </p>
      </div>
      <Footer />
    </section>
  );
};
