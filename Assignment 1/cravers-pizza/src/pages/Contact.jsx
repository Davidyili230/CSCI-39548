import React from 'react';

const Contact = () => {
  return (
    <>
      <main>
        <div className="contact-section">
          <div className="new-section left">
            <section id="location">
              <h2><center>We are located at</center></h2>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.735596139716!2d-73.96710402419527!3d40.767839771385304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1749629229961!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            </section>
          </div>

          <div className="new-section right">
            <section id="contact">
              <h2>Contact Us</h2>
              <form className="contact-form" action="#" method="post" onSubmit={e => e.preventDefault()}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>

                <button type="submit">Send Message</button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
