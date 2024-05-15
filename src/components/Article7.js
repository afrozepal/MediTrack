import React from 'react'
import Sidebar from './Sidebar';
import '../styles/articles.css'
// import img1 from '../assets/med.jpg'
import searchIcon from '../assets/icons8-search-100.png'

const Article7 = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="search-bar d-flex justify-content-center align-items-center">
                            <input type="text" className="form-control search-input" placeholder="Search..." />
                            <button className="btndesign btn btn-outline-secondary" type="button">
                                <img src={searchIcon} alt="Search" width="20" height="20" />
                            </button>
                        </div>
                        <div className="dropdown">
                            <a href="/" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item" href="/">My Profile</a></li>
                                <li><a className="dropdown-item" href="/">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="/">Sign out</a></li>
                            </ul>
                        </div>
                        <br />
                        <h2 className='Articles-heading'>Articles</h2>

                        {/* Real code starts from here */}
                        <div className="image-container7 p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
                            <h1 class="article display-4 fst-italic">Understanding Anxiety: Symptoms, Triggers, and Coping Strategies</h1>
                        </div>
                        <h1 className="article-subheadings">Understanding Anxiety: Symptoms, Triggers, and Coping Strategies</h1>

                        <p className="article-body">Anxiety is a common and often misunderstood mental health condition that affects millions of people worldwide. It's crucial to recognize the symptoms, understand potential triggers, and learn effective coping strategies to manage anxiety effectively.</p>

                        <h2 className="article-subheadings">Symptoms of Anxiety</h2>

                        <p className="article-body">Anxiety manifests in various ways, both physically and emotionally. Common symptoms include:</p>

                        <ul>
                            <li><strong className="article-subheadings">Excessive Worry:</strong> Persistent, uncontrollable worry about everyday things, often accompanied by feelings of dread.</li>
                            <li><strong className="article-subheadings">Physical Symptoms:</strong> These can include rapid heartbeat, sweating, trembling, shortness of breath, dizziness, and muscle tension.</li>
                            <li><strong className="article-subheadings">Restlessness:</strong> A feeling of being on edge or constantly keyed up.</li>
                            <li><strong className="article-subheadings">Difficulty Concentrating:</strong> Anxiety can make it challenging to focus or make decisions.</li>
                            <li><strong className="article-subheadings">Sleep Problems:</strong> Insomnia or difficulty falling and staying asleep are common in people with anxiety disorders.</li>
                        </ul>

                        <p className="article-body">Recognizing these symptoms is the first step toward seeking help and managing anxiety effectively.</p>

                        <h2 className="article-subheadings">Triggers of Anxiety</h2>

                        <p className="article-body">Anxiety can be triggered by various factors, including:</p>

                        <ul>
                            <li><strong className="article-subheadings">Stressful Events:</strong> Major life changes such as moving, starting a new job, or experiencing a loss can trigger anxiety.</li>
                            <li><strong className="article-subheadings">Trauma:</strong> Past traumatic experiences can contribute to anxiety disorders.</li>
                            <li><strong className="article-subheadings">Genetics:</strong> Family history plays a role in predisposing individuals to anxiety disorders.</li>
                            <li><strong className="article-subheadings">Brain Chemistry:</strong> Imbalances in neurotransmitters like serotonin and dopamine can contribute to anxiety.</li>
                            <li><strong className="article-subheadings">Health Conditions:</strong> Chronic illnesses or other mental health disorders can be linked to anxiety.</li>
                        </ul>

                        <p className="article-body">Understanding your personal triggers can help you develop targeted coping strategies to manage anxiety effectively.</p>

                        <h2 className="article-subheadings">Coping Strategies for Anxiety</h2>

                        <ul className="article-body">
                            <li><strong className="article-subheadings">Mindfulness and Relaxation Techniques:</strong> Practices like deep breathing, meditation, and progressive muscle relaxation can help calm the mind and body.</li>
                            <li><strong className="article-subheadings">Regular Exercise:</strong> Physical activity releases endorphins, which are natural mood lifters and stress reducers.</li>
                            <li><strong className="article-subheadings">Healthy Lifestyle Choices:</strong> Eating a balanced diet, getting enough sleep, and avoiding excessive caffeine and alcohol can support overall mental well-being.</li>
                            <li><strong className="article-subheadings">Cognitive Behavioral Therapy (CBT):</strong> CBT helps identify and change negative thought patterns and behaviors associated with anxiety.</li>
                            <li><strong className="article-subheadings">Social Support:</strong> Talking to trusted friends, family members, or a therapist can provide emotional support and coping strategies.</li>
                            <li><strong className="article-subheadings">Medication:</strong> In some cases, medication prescribed by a healthcare professional may be necessary to manage severe anxiety symptoms.</li>
                        </ul>

                        <p className="article-body">It's essential to find a combination of coping strategies that work best for you. What works for one person may not be as effective for another, so be open to trying different approaches.</p>

                        <h2 className="article-subheadings">Seeking Professional Help</h2>

                        <p className="article-body">If anxiety significantly impacts your daily life or persists despite self-help strategies, it's important to seek professional help. A mental health professional can provide an accurate diagnosis, personalized treatment plan, and ongoing support.</p>

                        <p className="article-body">In conclusion, anxiety is a complex but manageable condition with the right understanding and support. By recognizing symptoms, identifying triggers, and implementing effective coping strategies, individuals can lead fulfilling lives despite anxiety challenges.</p>

                    </div>



                </div>
            </div >
        </>
    );
}

export default Article7; 
