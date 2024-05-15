// ContactUsSection.js
import React from 'react';

const ContactUsSection = () => {
    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className='services-heading pb-4'>Contact Us</h2>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className='text-design-contactus pb-2'>Get in Touch</h3>
                        <p className='text-design-contactus'>If you have any questions or need support, feel free to reach out to us. Our team is here to help you.</p>
                        <div className="mb-3">
                            <a href="tel:123-456-7890" className="btn btn-custom me-2">Call Helpline</a>
                            <a href="mailto:info@mindmate.com" className="btn btn-custom">Send Email</a>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h3 className='text-design-contactus'>Contact Information</h3>
                        <ul className="text-design-contactus list-unstyled">
                            <li><strong>Helpline:</strong> 123-456-7890</li>
                            <li><strong>Email:</strong> info@mindmate.com</li>
                            <li><strong>Address:</strong> 123 Street, City, Country</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUsSection;
