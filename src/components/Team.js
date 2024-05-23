import React from 'react';
import '../styles/team.css';

const TeamSection = () => {
    return (
        <>
            <section id="team" className="section">
                <div className="container">
                    <div className="row">
                        <h2 className='teams-heading pb-4'>Our Team</h2>
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg>
                            <h2 className="text-names">Fatima Salman</h2>
                            <p className='pg-text'>Good with Frontend!</p>

                        </div>
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg>
                            <h2 className="text-names">Umaima Asad</h2>
                            <p className='pg-text'>Good with Backend!</p>

                        </div>
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)" /></svg>
                            <h2 className="text-names">Sidra</h2>
                            <p className='pg-text'>Good with both!</p>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamSection;
