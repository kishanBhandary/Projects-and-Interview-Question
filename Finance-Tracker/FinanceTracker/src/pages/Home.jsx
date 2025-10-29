import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return(
    <>
    <div className='home'>
      <section className='hero'>
        <h1>Track your Finances, grow your Savings!</h1>
        <p>
          A simple, yet useful Finance Tracker to manage expenses,
          monitor budgets, and keep control of your money.
        </p>
        <div className='cta-buttons'>
          <Link to= '/signup' className='btn primary'>Get Started</Link>
          <Link to= '/login' className='btn secondary'>Login</Link>
        </div>
      </section>
      {/* Features Section  */}
      <section className='features'>
        <div className='feature-card'>
          <h3>Track Expenses</h3>
          <p>Log daily expenses and categorize them to see where your money goes.</p>
        </div>

        <div className='feature-card'>
          <h3>Visualize Data</h3>
          <p>Get clear charts and graphs of your spending habits.</p>
        </div>

        <div className='feature-card'>
          <h3>Secure Login</h3>
          <p>Protect your data with Firebase Authentication and safe access.</p>
        </div>
      </section>
        {/* How it Works Section  */}
      <section className='how-it-works'>
        <h2>How it Works?</h2>
        <div className='steps'>
          <div className='step'>
            <span className='step-number'>1</span>
            <h3>Sign Up</h3>
            <p>Create your free account.</p>
          </div>

          <div className='step'>
            <span className='step-number'>2</span>
            <h3>Add Expenses</h3>
            <p>Log daily expenses, categorize them, and keep track of them.</p>
          </div>

          <div className='step'>
            <span className='step-number'>3</span>
            <h3>View Dashboard</h3>
            <p>Visualize your spending habits with clear charts and insights.</p>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
