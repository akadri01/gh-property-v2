import React from "react";

export default () => {
  return (
    <section className="topup email-confirm-link mobile-desktop-frame">
      <h1>Top up</h1>
      <p>
        Your account balance is empty. To top up your balance, please select a
        top up value from the menu bellow and click on payment button.
      </p>
      <form className="topup__form default-redux-form">
        <select>
          <option value="">Select your top up</option>
          <option value="5">1 post 5 gh₵</option>
          <option value="20">5 posts 20 gh₵</option>
          <option value="35">10 posts 35 gh₵</option>
          <option value="65">25 posts 65gh₵</option>
          <option value="100">50 posts 100gh₵</option>
          <option value="150">100 posts 150gh₵</option>
          <option value="200">200 posts 200gh₵</option>
          <option value="300">500 posts 300gh₵</option>
          <option value="500">1000 posts 500gh₵</option>
        </select>
        <button />
      </form>
    </section>
  );
};
